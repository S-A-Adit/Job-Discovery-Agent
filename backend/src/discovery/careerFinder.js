/**
 * Career Finder — Orchestrates the 4-phase career page discovery pipeline.
 *
 * Phase 1: Known URL patterns + subdomains
 * Phase 2: robots.txt extraction
 * Phase 3: Homepage link crawling
 * Phase 4: Tavily Search fallback (only if all deterministic methods fail)
 */

const prisma = require('../db');
const { crawlHomepageForCareerLink } = require('./homepageCrawler');
const { searchCareerPage } = require('./tavilySearch');

const PATTERN_PATHS = [
  '/careers',
  '/jobs',
  '/join-us',
  '/students',
  '/university',
  '/work-with-us',
  '/careers/jobs',
  '/careers/openings',
  '/about/careers'
];

/**
 * Extracts the root domain from a URL string.
 * e.g. "https://www.figma.com" → "figma.com"
 */
function extractDomain(website) {
  try {
    return new URL(website).hostname.replace(/^www\./, '');
  } catch (_) {
    return website.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
  }
}

/**
 * Persists the discovered career URL to the Company record and CareerPage log.
 */
async function saveDiscovery(companyId, url, confidence, method) {
  await prisma.company.update({
    where: { id: companyId },
    data: { careerPageUrl: url, lastChecked: new Date() }
  });

  await prisma.careerPage.create({
    data: { companyId, careerUrl: url, confidence, foundBy: method, date: new Date() }
  });
}

/**
 * Probes a URL and returns true if the response contains career-related content.
 */
async function probeUrl(url) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JobDiscoveryBot/1.0)' },
      signal: AbortSignal.timeout(8000)
    });
    if (res.status !== 200) return false;
    const text = await res.text();
    const lower = text.toLowerCase();
    return lower.includes('job') || lower.includes('career') || lower.includes('intern');
  } catch (_) {
    return false;
  }
}

/**
 * Main orchestrator — finds the career page for a given company ID.
 *
 * @param {string} companyId - Prisma company record ID
 * @returns {Promise<{success: boolean, url?: string, method?: string, confidence?: number, error?: string}>}
 */
async function findCareerPage(companyId) {
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company) {
    return { success: false, error: 'Company not found' };
  }

  // If website exists, we run the deterministic phases (1, 2, 3)
  if (company.website) {
    const website = company.website.endsWith('/')
      ? company.website.slice(0, -1)
      : company.website;
    const domain = extractDomain(website);

    console.log(`[Career Finder] Discovering career page for ${company.name} (${website})...`);

    // ── Phase 1: Known URL patterns + subdomains ──────────────────────────────
    const patternUrls = [
      ...PATTERN_PATHS.map(p => `${website}${p}`),
      `https://careers.${domain}`,
      `https://jobs.${domain}`
    ];

    for (const url of patternUrls) {
      if (await probeUrl(url)) {
        console.log(`  [Phase 1 – Pattern] Found: ${url} (Confidence: 0.95)`);
        await saveDiscovery(company.id, url, 0.95, 'pattern');
        return { success: true, url, method: 'pattern', confidence: 0.95 };
      }
    }

    // ── Phase 2: robots.txt ───────────────────────────────────────────────────
    try {
      const res = await fetch(`${website}/robots.txt`, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(6000)
      });
      if (res.ok) {
        const text = await res.text();
        for (const line of text.split('\n')) {
          const lower = line.toLowerCase();
          if (lower.includes('career') || lower.includes('job') || lower.includes('intern')) {
            const parts = line.split(':');
            if (parts.length > 1) {
              const path = parts[1].trim();
              if (path.startsWith('/')) {
                const url = `${website}${path}`;
                console.log(`  [Phase 2 – robots.txt] Found: ${url} (Confidence: 0.8)`);
                await saveDiscovery(company.id, url, 0.8, 'robots');
                return { success: true, url, method: 'robots', confidence: 0.8 };
              }
            }
          }
        }
      }
    } catch (_) {}

    // ── Phase 3: Homepage crawl ───────────────────────────────────────────────
    const homepageLink = await crawlHomepageForCareerLink(website);
    if (homepageLink) {
      console.log(`  [Phase 3 – Homepage] Found: ${homepageLink} (Confidence: 0.85)`);
      await saveDiscovery(company.id, homepageLink, 0.85, 'footer');
      return { success: true, url: homepageLink, method: 'footer', confidence: 0.85 };
    }

    // ── Phase 4: Tavily Search fallback (with domain context) ──────────────────
    const tavilyResult = await searchCareerPage(company.name, domain);
    if (tavilyResult) {
      console.log(`  [Phase 4 – Tavily] Found: ${tavilyResult.url} (Confidence: ${tavilyResult.confidence})`);
      await saveDiscovery(company.id, tavilyResult.url, tavilyResult.confidence, 'search');
      return { success: true, url: tavilyResult.url, method: 'search', confidence: tavilyResult.confidence };
    }

    // ── Fallback: use homepage ────────────────────────────────────────────────
    console.log(`  [Fallback] No career page found for ${company.name}. Using homepage.`);
    await saveDiscovery(company.id, website, 0.3, 'pattern');
    return { success: true, url: website, method: 'fallback', confidence: 0.3 };
  }

  // If website does NOT exist, we fall back to generic Tavily Search fallback using only company name
  console.log(`[Career Finder] Discovering career page for ${company.name} (no website listed)...`);
  const tavilyResult = await searchCareerPage(company.name, null);
  if (tavilyResult) {
    console.log(`  [Phase 4 – Tavily (Generic)] Found: ${tavilyResult.url} (Confidence: ${tavilyResult.confidence})`);
    // Try to extract website/domain from discovered URL to self-heal the company record
    let extractedWebsite = null;
    try {
      const parsed = new URL(tavilyResult.url);
      extractedWebsite = `${parsed.protocol}//${parsed.hostname}`;
    } catch (_) {}

    await prisma.company.update({
      where: { id: company.id },
      data: {
        careerPageUrl: tavilyResult.url,
        website: extractedWebsite || undefined,
        lastChecked: new Date()
      }
    });

    await prisma.careerPage.create({
      data: {
        companyId: company.id,
        careerUrl: tavilyResult.url,
        confidence: tavilyResult.confidence,
        foundBy: 'search',
        date: new Date()
      }
    });

    return { success: true, url: tavilyResult.url, method: 'search', confidence: tavilyResult.confidence };
  }

  return { success: false, error: 'No career site discovered via Tavily fallback' };
}

module.exports = { findCareerPage };
