/**
 * discovery-engine.js — Backward-Compatibility Shim
 *
 * The discovery pipeline has been refactored into:
 *   src/discovery/careerFinder.js    — Phases 1-4 orchestrator
 *   src/discovery/homepageCrawler.js — Phase 3 homepage link crawl
 *   src/discovery/tavilySearch.js    — Phase 4 Tavily fallback
 *
 * This file re-exports the new implementations under the old names so
 * existing callers (server.js, tests) continue to work without changes.
 */

const { findCareerPage } = require('../discovery/careerFinder');
const prisma = require('../db');


// Known URL patterns
const CAREER_PATTERNS = [
  '/careers',
  '/jobs',
  '/careers/jobs',
  '/work-with-us',
  '/join-us',
  '/careers/openings',
  '/about/careers'
];

/**
 * Stage 3 - Career Page Discovery Engine
 */
function getOfficialCareerSiteConfidence(urlStr, domain) {
  let url;
  try {
    url = new URL(urlStr);
  } catch (_) {
    return 0;
  }

  const hostname = url.hostname.toLowerCase();
  const path = url.pathname.toLowerCase();

  // Reject third-party / blog lists / platforms
  const rejects = [
    'linkedin.com', 'indeed.com', 'ziprecruiter.com', 'glassdoor.com', 'monster.com',
    'simplyhired.com', 'careerbuilder.com', 'handshake', 'joinhandshake.com',
    'medium.com', 'substack.com', 'youtube.com', 'facebook.com', 'twitter.com',
    'instagram.com', 'crunchbase.com', 'ycombinator.com', 'github.com', 'reddit.com',
    'levels.fyi', 'levels-fyi', 'builtin', 'wellfound.com', 'angel.co', 'upwork.com',
    'fiverr.com', 'toptal.com', 'freelancer.com'
  ];

  if (rejects.some(reject => hostname.includes(reject) || path.includes(reject))) {
    return 0;
  }

  // Check if it belongs to company's domain
  const isCompanyDomain = hostname === domain || hostname.endsWith(`.${domain}`);

  // Check ATS providers
  const isAts = hostname.includes('greenhouse.io') ||
                hostname.includes('lever.co') ||
                hostname.includes('ashbyhq.com') ||
                hostname.includes('smartrecruiters.com') ||
                hostname.includes('myworkdayjobs.com');

  if (isCompanyDomain) {
    // company.com/careers -> 1.0
    if (path.includes('/careers') || path.includes('/jobs') || path.includes('/careers/')) {
      return 1.0;
    }
    // careers.company.com or jobs.company.com -> 0.95
    if (hostname.startsWith('careers.') || hostname.startsWith('jobs.')) {
      return 0.95;
    }
    // Otherwise fallback if it has careers/jobs keyword anywhere in the URL
    if (urlStr.toLowerCase().includes('career') || urlStr.toLowerCase().includes('job')) {
      return 0.9;
    }
  } else if (isAts) {
    // boards.greenhouse.io/company -> 0.95
    return 0.95;
  }

  // Not verified as company domain or direct ATS
  return 0;
}

/**
 * Stage 3 - Career Page Discovery Engine
 */
async function discoverCareerPage(companyId) {
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company || !company.website) {
    return { success: false, error: 'No website listed for company' };
  }

  const website = company.website.endsWith('/') ? company.website.slice(0, -1) : company.website;

  console.log(`[Discovery Engine] Finding career page for ${company.name} (${website})...`);

  let domain = '';
  try {
    domain = new URL(website).hostname.replace(/^www\./, '');
  } catch (_) {
    domain = website.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
  }

  // Phase 1: Patterns (including subdomains)
  const patternUrls = [
    `${website}/careers`,
    `${website}/jobs`,
    `https://careers.${domain}`,
    `https://jobs.${domain}`,
    `${website}/join-us`,
    `${website}/students`,
    `${website}/university`
  ];

  for (const url of patternUrls) {
    try {
      const res = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.status === 200) {
        const text = await res.text();
        if (text.toLowerCase().includes('job') || text.toLowerCase().includes('career') || text.toLowerCase().includes('intern')) {
          console.log(`  [Pattern Check] Found career page at ${url} (Confidence: 0.95)`);
          await saveDiscovery(company.id, url, 0.95, 'pattern');
          return { success: true, url, method: 'pattern', confidence: 0.95 };
        }
      }
    } catch (_) {}
  }

  // Phase 2: robots.txt
  try {
    const robotsUrl = `${website}/robots.txt`;
    const res = await fetch(robotsUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (res.status === 200) {
      const text = await res.text();
      const lines = text.split('\n');
      for (const line of lines) {
        if (line.toLowerCase().includes('career') || line.toLowerCase().includes('job') || line.toLowerCase().includes('intern')) {
          const parts = line.split(':');
          if (parts.length > 1) {
            const path = parts[1].trim();
            if (path.startsWith('/')) {
              const url = `${website}${path}`;
              console.log(`  [robots.txt] Found path: ${url} (Confidence: 0.8)`);
              await saveDiscovery(company.id, url, 0.8, 'robots');
              return { success: true, url, method: 'robots', confidence: 0.8 };
            }
          }
        }
      }
    }
  } catch (_) {}

  // Phase 3: Homepage Navigation Crawling
  try {
    const res = await fetch(website, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (res.status === 200) {
      const html = await res.text();
      const $ = cheerio.load(html);
      let foundUrl = null;

      $('a').each((_, el) => {
        const href = $(el).attr('href') || '';
        const text = $(el).text().toLowerCase();

        if (
          href &&
          (text.includes('career') || 
           text.includes('job') || 
           text.includes('work with us') || 
           text.includes('join us') || 
           text.includes('join') ||
           text.includes('students') ||
           text.includes('internships') ||
           text.includes('university'))
        ) {
          try {
            foundUrl = new URL(href, website).toString();
          } catch (_) {
            foundUrl = `${website}${href.startsWith('/') ? '' : '/'}${href}`;
          }
          return false; // Break loop
        }
      });

      if (foundUrl) {
        console.log(`  [Homepage Link] Found link: ${foundUrl} (Confidence: 0.85)`);
        await saveDiscovery(company.id, foundUrl, 0.85, 'footer');
        return { success: true, url: foundUrl, method: 'footer', confidence: 0.85 };
      }
    }
  } catch (_) {}

  // Phase 4: Tavily Fallback
  if (process.env.TAVILY_API_KEY) {
    try {
      console.log(`  [Tavily] Running fallback search queries for ${company.name}...`);
      const { tavily } = require('tavily');
      const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY });

      const queries = [
        `${company.name} careers`,
        `${company.name} jobs`,
        `${company.name} internships`,
        `${company.name} university recruiting`,
        `site:${domain} careers`,
        `site:${domain} jobs`
      ];

      for (const query of queries) {
        console.log(`    [Tavily] Query: "${query}"`);
        const searchResult = await tavilyClient.search(query, {
          maxResults: 5
        });

        if (searchResult && searchResult.results) {
          for (const result of searchResult.results) {
            const url = result.url;
            const confidence = getOfficialCareerSiteConfidence(url, domain);
            if (confidence > 0) {
              console.log(`  [Tavily Search] Found official career site at ${url} (Confidence: ${confidence})`);
              await saveDiscovery(company.id, url, confidence, 'search');
              return { success: true, url, method: 'search', confidence };
            }
          }
        }
      }
    } catch (e) {
      console.error(`  [Tavily Search] Failed:`, e.message);
    }
  }

  // Fallback: If nothing else succeeds, just return the home page as a low confidence fallback
  console.log(`  [Fallback] No specific career page found. Using home page.`);
  await saveDiscovery(company.id, website, 0.3, 'pattern');
  return { success: true, url: website, method: 'fallback', confidence: 0.3 };
}

async function saveDiscovery(companyId, url, confidence, method) {
  // Update company career page url
  await prisma.company.update({
    where: { id: companyId },
    data: {
      careerPageUrl: url,
      lastChecked: new Date()
    }
  });

  // Save to CareerPage logs
  await prisma.careerPage.create({
    data: {
      companyId,
      careerUrl: url,
      confidence,
      foundBy: method,
      date: new Date()
    }
  });
}

/**
 * Stage 4 - ATS Detection Engine
 */
async function detectAts(companyId) {
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company || !company.careerPageUrl) {
    return { success: false, error: 'No career page URL registered' };
  }

  const url = company.careerPageUrl;
  console.log(`[ATS Detection] Scanning ${url} for ATS fingerprints...`);

  let detectedAts = null;
  let apiEndpoint = null;
  let sourceFingerprint = null;

  // 1. Check URL patterns directly
  if (url.includes('greenhouse.io')) {
    detectedAts = 'Greenhouse';
    const match = url.match(/greenhouse\.io\/([^/]+)/);
    sourceFingerprint = match ? match[1] : company.name.toLowerCase();
  } else if (url.includes('lever.co')) {
    detectedAts = 'Lever';
    const match = url.match(/lever\.co\/([^/]+)/);
    sourceFingerprint = match ? match[1] : company.name.toLowerCase();
  } else if (url.includes('ashbyhq.com')) {
    detectedAts = 'Ashby';
    const match = url.match(/ashbyhq\.com\/([^/]+)/);
    sourceFingerprint = match ? match[1] : company.name.toLowerCase();
  } else if (url.includes('myworkdayjobs.com')) {
    detectedAts = 'Workday';
    // Format: https://company.myworkdayjobs.com/wday/cxs/company/External/jobs
    const match = url.match(/([a-zA-Z0-9\-]+)\.myworkdayjobs\.com/);
    if (match) {
      sourceFingerprint = match[1];
      apiEndpoint = `https://${match[0]}/wday/cxs/${match[1]}/External/jobs`;
    }
  } else if (url.includes('smartrecruiters.com')) {
    detectedAts = 'SmartRecruiters';
    const match = url.match(/smartrecruiters\.com\/([^/]+)/);
    sourceFingerprint = match ? match[1] : company.name.toLowerCase();
  } else if (url.includes('icims.com')) {
    detectedAts = 'iCIMS';
  } else if (url.includes('taleo.net')) {
    detectedAts = 'Taleo';
  } else if (url.includes('netflix.com') || company.name.toLowerCase() === 'netflix') {
    detectedAts = 'Netflix';
  } else if (url.includes('google.com') || company.name.toLowerCase() === 'google') {
    detectedAts = 'Google';
  }

  // 2. Fetch HTML to check meta/scripts if not detected by url structure
  if (!detectedAts) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.status === 200) {
        const html = await res.text();
        
        if (html.includes('greenhouse') || html.includes('boards.greenhouse.io')) {
          detectedAts = 'Greenhouse';
        } else if (html.includes('lever.co') || html.includes('jobs.lever.co')) {
          detectedAts = 'Lever';
        } else if (html.includes('ashbyhq') || html.includes('jobs.ashbyhq.com')) {
          detectedAts = 'Ashby';
        } else if (html.includes('myworkdayjobs')) {
          detectedAts = 'Workday';
        } else if (html.includes('smartrecruiters')) {
          detectedAts = 'SmartRecruiters';
        } else if (html.includes('icims')) {
          detectedAts = 'iCIMS';
        } else if (html.includes('taleo') || html.includes('oracle Recruiting')) {
          detectedAts = 'Oracle';
        }
      }
    } catch (_) {}
  }

  if (detectedAts) {
    console.log(`  [ATS Detected] ${detectedAts} (Fingerprint: ${sourceFingerprint || 'unknown'})`);
    
    // Set API endpoint default format if not set and provider is Greenhouse/Lever/Ashby/SmartRecruiters
    const slug = sourceFingerprint || company.name.toLowerCase().replace(/\s+/g, '');
    if (!apiEndpoint) {
      if (detectedAts === 'Greenhouse') {
        apiEndpoint = `https://boards-api.greenhouse.io/v1/boards/${slug}/jobs?content=true`;
      } else if (detectedAts === 'Lever') {
        apiEndpoint = `https://api.lever.co/v0/postings/${slug}?group=team`;
      } else if (detectedAts === 'Ashby') {
        apiEndpoint = `https://api.ashbyhq.com/draft/public-api/job-board/${slug}`;
      } else if (detectedAts === 'SmartRecruiters') {
        apiEndpoint = `https://api.smartrecruiters.com/v1/companies/${slug}/postings?limit=100`;
      }
    }

    await prisma.company.update({
      where: { id: companyId },
      data: {
        sourceType: 'ATS',
        atsProvider: detectedAts,
        apiEndpoint: apiEndpoint || company.apiEndpoint,
        sourceFingerprint: slug
      }
    });

    return { success: true, atsProvider: detectedAts, apiEndpoint, sourceFingerprint: slug };
  }

  console.log(`  [ATS Detection] Could not identify specific ATS provider. Using fallback crawler.`);
  return { success: true, atsProvider: 'Fallback', apiEndpoint: null };
}

module.exports = {
  // Primary names (new module)
  findCareerPage,
  // Legacy aliases for backward compatibility
  discoverCareerPage: findCareerPage,
  detectAts
};
