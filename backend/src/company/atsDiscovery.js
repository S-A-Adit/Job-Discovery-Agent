/**
 * ATS-First Reverse Discovery Pipeline
 *
 * Instead of: Company → Find Career Page → Detect ATS
 * This does:  ATS Board → Extract Company → Register (with ATS already known)
 *
 * Zero web search calls — uses only direct HTTP probes to ATS public APIs.
 *
 * Run: node src/company/atsDiscovery.js
 */

const fs = require('fs');
const path = require('path');
const dotenvPath = fs.existsSync(path.join(__dirname, '../../../../.env'))
  ? path.join(__dirname, '../../../../.env')
  : (fs.existsSync(path.join(__dirname, '../../../.env'))
    ? path.join(__dirname, '../../../.env')
    : path.join(__dirname, '.env'));
require('dotenv').config({ path: dotenvPath });

const prisma = require('../db');
const {
  fetchLeverSlugs,
  fetchAshbySlugs,
  fetchGreenhouseSlugs,
  fetchSmartRecruitersCompanies,
  fetchWorkdayTenants
} = require('./slugSources');

const { askPermission, getSessionCredits } = require('../utils/creditTracker');

const CONCURRENCY = 5; // parallel probes at once
const REQUEST_DELAY_MS = 150; // polite delay between batch requests

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function toTitleCase(slug) {
  return slug
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// ── Probe Helpers ─────────────────────────────────────────────────────────────

async function probeGreenhouse(slug) {
  try {
    const res = await fetch(
      `https://boards-api.greenhouse.io/v1/boards/${slug}/jobs?content=false`,
      {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(6000)
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    // Greenhouse returns { jobs: [...], meta: { total: N } }
    const name = data?.company?.name || toTitleCase(slug);
    return {
      name,
      atsProvider: 'Greenhouse',
      sourceFingerprint: slug,
      careerPageUrl: `https://boards.greenhouse.io/${slug}`,
      apiEndpoint: `https://boards-api.greenhouse.io/v1/boards/${slug}/jobs?content=true`,
      sourceType: 'ATS'
    };
  } catch (_) {
    return null;
  }
}

async function probeLever(slug) {
  try {
    const res = await fetch(
      `https://api.lever.co/v0/postings/${slug}?mode=json&limit=1`,
      {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(6000)
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    // Lever returns array of job postings
    if (!Array.isArray(data) || data.length === 0) return null;
    const name = toTitleCase(slug);
    return {
      name,
      atsProvider: 'Lever',
      sourceFingerprint: slug,
      careerPageUrl: `https://jobs.lever.co/${slug}`,
      apiEndpoint: `https://api.lever.co/v0/postings/${slug}?mode=json`,
      sourceType: 'ATS'
    };
  } catch (_) {
    return null;
  }
}

async function probeAshby(slug) {
  try {
    const res = await fetch(
      `https://api.ashbyhq.com/posting-api/job-board/${slug}`,
      {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(6000)
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const name = data?.organization?.name || toTitleCase(slug);
    return {
      name,
      atsProvider: 'Ashby',
      sourceFingerprint: slug,
      careerPageUrl: `https://jobs.ashbyhq.com/${slug}`,
      apiEndpoint: `https://api.ashbyhq.com/posting-api/job-board/${slug}`,
      sourceType: 'ATS'
    };
  } catch (_) {
    return null;
  }
}

async function probeWorkday(tenant) {
  const { slug, name } = tenant;
  // Try common Workday API endpoint pattern
  try {
    const res = await fetch(
      `https://${slug}.wd5.myworkdayjobs.com/wday/cxs/${slug}/External/jobs`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        },
        body: JSON.stringify({ limit: 1, offset: 0 }),
        signal: AbortSignal.timeout(8000)
      }
    );
    if (!res.ok) return null;
    return {
      name,
      atsProvider: 'Workday',
      sourceFingerprint: slug,
      careerPageUrl: `https://${slug}.myworkdayjobs.com/External`,
      apiEndpoint: `https://${slug}.wd5.myworkdayjobs.com/wday/cxs/${slug}/External/jobs`,
      sourceType: 'ATS'
    };
  } catch (_) {
    return null;
  }
}

// ── Batch Processor ───────────────────────────────────────────────────────────

async function processBatch(items, probeFn, label) {
  const discovered = [];
  let processed = 0;

  for (let i = 0; i < items.length; i += CONCURRENCY) {
    const batch = items.slice(i, i + CONCURRENCY);
    const results = await Promise.all(batch.map(item => probeFn(item)));
    for (const result of results) {
      if (result) {
        discovered.push(result);
        console.log(`  [${label}] ✓ ${result.name}`);
      }
    }
    processed += batch.length;
    if (processed % 50 === 0) {
      console.log(`  [${label}] Progress: ${processed}/${items.length} probed, ${discovered.length} found`);
    }
    await sleep(REQUEST_DELAY_MS);
  }

  return discovered;
}

// ── Upsert to Registry ────────────────────────────────────────────────────────

async function upsertCompanies(companies) {
  let added = 0;
  let updated = 0;
  const newlyCreatedCompanyIds = [];

  for (const company of companies) {
    try {
      const existing = await prisma.company.findUnique({ where: { name: company.name } });
      if (existing) {
        // Update ATS data only if not already set
        if (!existing.atsProvider) {
          await prisma.company.update({
            where: { name: company.name },
            data: {
              atsProvider: company.atsProvider,
              sourceFingerprint: company.sourceFingerprint,
              apiEndpoint: company.apiEndpoint,
              careerPageUrl: company.careerPageUrl,
              sourceType: company.sourceType
            }
          });
          updated++;
        }
      } else {
        const created = await prisma.company.create({
          data: {
            name: company.name,
            website: '',
            careerPageUrl: company.careerPageUrl,
            atsProvider: company.atsProvider,
            sourceFingerprint: company.sourceFingerprint,
            apiEndpoint: company.apiEndpoint,
            sourceType: company.sourceType,
            crawlFrequency: '24h',
            priorityScore: 60,
            status: 'ACTIVE'
          }
        });
        newlyCreatedCompanyIds.push(created.id);
        added++;
      }
    } catch (_) {}
  }

  return { added, updated, newlyCreatedCompanyIds };
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n=== ATS-First Reverse Discovery Pipeline ===\n');

  const allDiscovered = [];

  // 1. Greenhouse
  console.log('\n[1/5] Probing Greenhouse boards...');
  const ghAllowed = await askPermission('  Proceed with Greenhouse probing? (y/n): ');
  if (ghAllowed) {
    const ghSlugs = await fetchGreenhouseSlugs();
    const ghCompanies = await processBatch(ghSlugs, probeGreenhouse, 'Greenhouse');
    allDiscovered.push(...ghCompanies);
    console.log(`[Greenhouse] Total verified: ${ghCompanies.length}`);
  } else {
    console.log('[Greenhouse] Skipped.');
  }

  // 2. Lever
  console.log('\n[2/5] Probing Lever boards...');
  const leverAllowed = await askPermission('  Proceed with Lever probing? (y/n): ');
  if (leverAllowed) {
    const leverSlugs = await fetchLeverSlugs();
    const leverCompanies = await processBatch(leverSlugs, probeLever, 'Lever');
    allDiscovered.push(...leverCompanies);
    console.log(`[Lever] Total verified: ${leverCompanies.length}`);
  } else {
    console.log('[Lever] Skipped.');
  }

  // 3. Ashby
  console.log('\n[3/5] Probing Ashby boards...');
  const ashbyAllowed = await askPermission('  Proceed with Ashby probing? (y/n): ');
  if (ashbyAllowed) {
    const ashbySlugs = await fetchAshbySlugs();
    const ashbyCompanies = await processBatch(ashbySlugs, probeAshby, 'Ashby');
    allDiscovered.push(...ashbyCompanies);
    console.log(`[Ashby] Total verified: ${ashbyCompanies.length}`);
  } else {
    console.log('[Ashby] Skipped.');
  }

  // 4. Workday
  console.log('\n[4/5] Probing Workday tenants...');
  const workdayAllowed = await askPermission('  Proceed with Workday probing? (y/n): ');
  if (workdayAllowed) {
    const workdayTenants = await fetchWorkdayTenants();
    const workdayCompanies = await processBatch(workdayTenants, probeWorkday, 'Workday');
    allDiscovered.push(...workdayCompanies);
    console.log(`[Workday] Total verified: ${workdayCompanies.length}`);
  } else {
    console.log('[Workday] Skipped.');
  }

  // 5. SmartRecruiters (API-based, no slugs needed)
  console.log('\n[5/5] Fetching SmartRecruiters companies...');
  const srAllowed = await askPermission('  Proceed with SmartRecruiters probing? (y/n): ');
  if (srAllowed) {
    const srCompanies = await fetchSmartRecruitersCompanies();
    const srFormatted = srCompanies.map(c => ({
      name: c.name,
      atsProvider: 'SmartRecruiters',
      sourceFingerprint: c.slug,
      careerPageUrl: `https://jobs.smartrecruiters.com/${c.slug}`,
      apiEndpoint: `https://api.smartrecruiters.com/v1/companies/${c.slug}/postings`,
      sourceType: 'ATS'
    }));
    allDiscovered.push(...srFormatted);
    console.log(`[SmartRecruiters] Total: ${srFormatted.length}`);
  } else {
    console.log('[SmartRecruiters] Skipped.');
  }

  // Deduplicate by name
  const seen = new Set();
  const unique = allDiscovered.filter(c => {
    const key = c.name.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  console.log(`\n[Registry] Upserting ${unique.length} verified companies...`);
  const { added, updated, newlyCreatedCompanyIds } = await upsertCompanies(unique);

  const finalTotal = await prisma.company.count();
  console.log(`\n=== ATS Discovery Complete ===`);
  console.log(`  New companies added:                      ${added}`);
  console.log(`  Existing companies enriched with ATS data: ${updated}`);
  console.log(`  Master Registry Total:                    ${finalTotal}`);
  console.log(`  Tavily credits used this session:         ${getSessionCredits()}`);
  console.log('==============================\n');

  if (newlyCreatedCompanyIds && newlyCreatedCompanyIds.length > 0) {
    console.log(`\n[Discovery] Initiating immediate crawl for ${newlyCreatedCompanyIds.length} newly added companies...`);
    const { processCrawlForCompany } = require('../scraper/scraper');
    let crawlSuccess = 0;
    for (const companyId of newlyCreatedCompanyIds) {
      try {
        const result = await processCrawlForCompany(companyId);
        if (result && result.success) {
          crawlSuccess++;
        }
      } catch (e) {
        console.error(`[Discovery] Crawl failed for company ID ${companyId}:`, e.message);
      }
    }
    console.log(`[Discovery] Finished crawling ${crawlSuccess}/${newlyCreatedCompanyIds.length} new companies successfully.`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

module.exports = { atsDiscovery: main };
