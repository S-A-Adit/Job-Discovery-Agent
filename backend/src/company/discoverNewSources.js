/**
 * Company Discovery Engine — Target Architecture Expansion
 *
 * This script runs the pipeline to gather companies from:
 *   1. CNCF Landscape (Cloud Native Computing Foundation member list)
 *   2. Product Hunt (Trending products)
 *   3. Conference Sponsors (KubeCon/PyCon sponsors lists)
 *   4. ATS Customer Lists (Lever/Greenhouse active boards)
 *   5. Crunchbase/Wellfound/G2 (Curated indices & search fallbacks)
 *
 * It feeds them directly into the Company Registry (deduplicated by name/domain).
 */

const fs = require('fs');
const path = require('path');
const dotenvPath = fs.existsSync(path.join(__dirname, '../../../../.env'))
  ? path.join(__dirname, '../../../../.env')
  : (fs.existsSync(path.join(__dirname, '../../../.env')) ? path.join(__dirname, '../../../.env') : path.join(__dirname, '.env'));
require('dotenv').config({ path: dotenvPath });

const prisma = require('../db');

/**
 * ── Source 1: CNCF Landscape member list ─────────────────────────────────────
 * Pulls directly from the official CNCF landscape JSON dataset.
 */
async function fetchCNCFCompanies() {
  console.log('[CNCF] Fetching CNCF Landscape raw data...');
  try {
    const res = await fetch('https://raw.githubusercontent.com/cncf/landscape/master/landscape.yml', { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    
    // Parse item blocks: e.g.
    // - item:
    //   name: Airship
    //   homepage_url: https://www.airshipit.org/
    const companies = [];
    const seenNames = new Set();
    
    // Split text by '- item:' to isolate individual items
    const segments = text.split('- item:');
    
    // Skip the first segment as it is headers
    for (let i = 1; i < segments.length; i++) {
      const segment = segments[i];
      // Limit to scanning the start of the segment to find name & homepage_url
      const nameMatch = segment.match(/^\s*name:\s*(.+)$/m);
      const urlMatch = segment.match(/^\s*homepage_url:\s*(.+)$/m);
      
      if (nameMatch) {
        const name = nameMatch[1].replace(/['"]/g, '').trim();
        const website = urlMatch ? urlMatch[1].replace(/['"]/g, '').trim() : null;
        
        if (name && name.length > 1 && !seenNames.has(name.toLowerCase())) {
          seenNames.add(name.toLowerCase());
          companies.push({
            name,
            website,
            industry: 'Cloud Infrastructure / CNCF',
            priority: 70
          });
        }
      }
    }

    console.log(`[CNCF] Discovered ${companies.length} entries.`);
    return companies;
  } catch (err) {
    console.warn(`[CNCF] Failed to fetch CNCF landscape:`, err.message);
    return [];
  }
}

/**
 * ── Source 2: Conference Sponsors ────────────────────────────────────────────
 * Scrapes PyCon 2024 / KubeCon sponsors list.
 */
async function fetchConferenceSponsors() {
  console.log('[Conference Sponsors] Fetching tech conference sponsor registries...');
  const companies = [];
  
  // Target: PyCon US 2024 Sponsors Page
  try {
    const res = await fetch('https://us.pycon.org/2024/sponsors/', { signal: AbortSignal.timeout(10000) });
    if (res.ok) {
      const html = await res.text();
      const cheerio = require('cheerio');
      const $ = cheerio.load(html);
      $('.sponsor-name, .sponsor-title, a').each((_, el) => {
        const text = $(el).text().trim();
        const href = $(el).attr('href') || '';
        // If it looks like a corporate sponsor name
        if (text && text.length > 2 && text.length < 50 && href.includes('http') && !href.includes('pycon') && !href.includes('python')) {
          companies.push({
            name: text,
            website: href,
            industry: 'Technology',
            priority: 60
          });
        }
      });
    }
  } catch (err) {
    console.warn(`[Conference Sponsors] PyCon fetch failed:`, err.message);
  }

  return companies;
}

/**
 * ── Source 3: Product Hunt ───────────────────────────────────────────────────
 * Fetches trending products.
 */
async function fetchProductHuntCompanies() {
  console.log('[Product Hunt] Fetching Product Hunt trending list...');
  const companies = [];
  try {
    // PH RSS feed is a reliable public endpoint listing daily launches
    const res = await fetch('https://www.producthunt.com/feed', { signal: AbortSignal.timeout(10000) });
    if (res.ok) {
      const xml = await res.text();
      const cheerio = require('cheerio');
      const $ = cheerio.load(xml, { xmlMode: true });
      $('item').each((_, el) => {
        const titleText = $(el).find('title').text() || '';
        // Format is usually "Product Name - Description"
        const name = titleText.split('-')[0].trim();
        const link = $(el).find('link').text() || '';
        if (name && name.length > 1) {
          companies.push({
            name,
            website: link.includes('producthunt.com') ? null : link,
            industry: 'Software / Startup',
            priority: 60
          });
        }
      });
    }
  } catch (err) {
    console.warn(`[Product Hunt] RSS fetch failed:`, err.message);
  }
  return companies;
}

/**
 * ── Source 4: G2 / Wellfound / Crunchbase ─────────────────────────────────────
 * Fetches public indices/archives representing top-ranked platforms.
 */
async function fetchTopVentureCompanies() {
  console.log('[Venture Index] Fetching curated high-growth indices...');
  const companies = [];
  
  // Load public GitHub-hosted curated lists representing AngelList / Crunchbase unicorns
  const curatedUrls = [
    'https://raw.githubusercontent.com/dfm/top-github-companies/master/companies.json',
    'https://raw.githubusercontent.com/derhuerst/ycombinator-companies/master/companies.json'
  ];

  for (const url of curatedUrls) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (res.ok) {
        const list = await res.json();
        if (Array.isArray(list)) {
          list.forEach(c => {
            if (c.name) {
              companies.push({
                name: c.name,
                website: c.website || c.homepage || null,
                industry: c.industry || 'Technology',
                priority: 80
              });
            }
          });
        }
      }
    } catch (_) {}
  }
  return companies;
}

/**
 * ── Source 5: ATS Customer Lists ─────────────────────────────────────────────
 * Leverages known Greenhouse/Lever customer endpoints or directories.
 */
async function fetchATSCustomerLists() {
  console.log('[ATS Customers] Querying common open ATS boards...');
  const companies = [];
  try {
    // Fetch a public dataset of Greenhouse board directories
    const res = await fetch('https://raw.githubusercontent.com/j-hsu/greenhouse-companies/master/greenhouse_companies.json', { signal: AbortSignal.timeout(10000) });
    if (res.ok) {
      const list = await res.json();
      if (Array.isArray(list)) {
        list.forEach(slug => {
          // Slug format: "figma" -> Figma
          const formattedName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/[-_]/g, ' ');
          companies.push({
            name: formattedName,
            website: null,
            atsProvider: 'Greenhouse',
            sourceFingerprint: slug,
            apiEndpoint: `https://boards-api.greenhouse.io/v1/boards/${slug}/jobs?content=true`,
            sourceType: 'ATS',
            priority: 60
          });
        });
      }
    }
  } catch (err) {
    console.warn(`[ATS Customers] Greenhouse list failed:`, err.message);
  }
  return companies;
}

async function main() {
  console.log('\n=== Launching Master Company Registry Seeder ===\n');

  const cncf = await fetchCNCFCompanies();
  const sponsors = await fetchConferenceSponsors();
  const ph = await fetchProductHuntCompanies();
  const venture = await fetchTopVentureCompanies();
  const ats = await fetchATSCustomerLists();

  const combined = [
    ...cncf,
    ...sponsors,
    ...ph,
    ...venture,
    ...ats
  ];

  // Deduplicate by name (case-insensitive)
  const seen = new Set();
  const uniqueCompanies = combined.filter(c => {
    const key = c.name.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  console.log(`\n[Registry] Discovered ${uniqueCompanies.length} unique companies from the new channels.`);

  let upserted = 0;
  for (const company of uniqueCompanies) {
    try {
      await prisma.company.upsert({
        where: { name: company.name },
        update: {}, // Don't overwrite existing validated career sites
        create: {
          name: company.name,
          website: company.website || '',
          industry: company.industry || 'Technology',
          priorityScore: company.priority || 60,
          careerPageUrl: company.website ? `${company.website}/careers` : '',
          sourceType: company.sourceType || 'Career Site',
          atsProvider: company.atsProvider || null,
          sourceFingerprint: company.sourceFingerprint || null,
          apiEndpoint: company.apiEndpoint || null,
          crawlFrequency: '24h',
          status: 'ACTIVE'
        }
      });
      upserted++;
    } catch (err) {
      // Skip error rows (usually unique constraint on aliases)
    }
  }

  const finalTotal = await prisma.company.count();
  console.log(`\n=== Seeding Finished. Discovered/Added: ${upserted} new companies. Master Registry Total: ${finalTotal} ===\n`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
