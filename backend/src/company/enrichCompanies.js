/**
 * Company Enricher — Weekly Career URL Re-Verification
 *
 * Runs on a weekly cadence (triggered by scheduler).
 * For each company:
 * 1. Performs a HEAD request on the existing careerPageUrl.
 * 2. If it returns 4xx/5xx → re-runs the full careerFinder pipeline.
 * 3. Updates lastChecked timestamp.
 *
 * Run manually: node src/company/enrichCompanies.js
 */

const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();
const { findCareerPage } = require('../discovery/careerFinder');

const STALE_DAYS = 7;
const CONCURRENT = 3; // Max parallel verifications

async function checkUrlAlive(url) {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JobDiscoveryBot/1.0)' },
      signal: AbortSignal.timeout(8000),
      redirect: 'follow'
    });
    return res.ok; // 2xx = alive
  } catch (_) {
    return false;
  }
}

async function main() {
  const cutoff = new Date(Date.now() - STALE_DAYS * 24 * 60 * 60 * 1000);
  
  const companies = await prisma.company.findMany({
    where: {
      OR: [
        { lastChecked: null },
        { lastChecked: { lt: cutoff } }
      ],
      status: 'ACTIVE'
    },
    orderBy: { priorityScore: 'desc' }
  });

  console.log(`[Enricher] ${companies.length} companies to verify (not checked in ${STALE_DAYS}+ days)`);

  // Process in batches to avoid hammering servers
  for (let i = 0; i < companies.length; i += CONCURRENT) {
    const batch = companies.slice(i, i + CONCURRENT);
    await Promise.all(batch.map(async (company) => {
      const url = company.careerPageUrl;
      if (!url) {
        console.log(`[Enricher] ${company.name}: No career URL, running discovery...`);
        await findCareerPage(company.id).catch(e => console.error(`  Discovery failed: ${e.message}`));
        return;
      }

      const alive = await checkUrlAlive(url);
      if (alive) {
        console.log(`[Enricher] ${company.name}: ✓ ${url}`);
        await prisma.company.update({
          where: { id: company.id },
          data: { lastChecked: new Date() }
        });
      } else {
        console.log(`[Enricher] ${company.name}: ✗ ${url} is broken — re-running discovery...`);
        await findCareerPage(company.id).catch(e => console.error(`  Re-discovery failed: ${e.message}`));
      }
    }));

    // Polite delay between batches
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('[Enricher] Verification complete.');
}

main().catch(console.error).finally(() => prisma.$disconnect());

module.exports = { enrichCompanies: main };
