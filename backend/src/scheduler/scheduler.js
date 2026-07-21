/**
 * Scheduler — Tiered crawl schedule with weekly URL re-verification.
 *
 * Tiers (by priorityScore):
 *   100  → every 6h  (Tier 1: FAANG, OpenAI, etc.)
 *   ≥80  → every 12h (Tier 2: large tech)
 *   ≥60  → every 24h (Tier 3: mid-size)
 *   <60  → every 24h (Tier 4: startups/smaller)
 *
 * Weekly: re-verify all career URLs via enrichCompanies.
 */

const prisma = require('../db');
const { processCrawlForCompany } = require('../scraper/scraper');
const { embedMissingJobs } = require('../services/recommendation');

const TICK_INTERVAL = 60 * 1000;         // 1 minute
const WEEKLY_INTERVAL = 7 * 24 * 60 * 60 * 1000; // 7 days

let schedulerTimer = null;
let embeddingTimer = null;
let weeklyTimer = null;

function getCrawlInterval(priorityScore) {
  const score = priorityScore || 20;
  if (score >= 100) return 6 * 60 * 60 * 1000;   // 6h — Tier 1
  if (score >= 80)  return 12 * 60 * 60 * 1000;  // 12h — Tier 2
  return 24 * 60 * 60 * 1000;                     // 24h — Tier 3/4
}

async function checkAndCrawl() {
  console.log('[Scheduler] Tick: checking companies due for crawl...');
  try {
    const companies = await prisma.company.findMany({ where: { status: 'ACTIVE' } });
    const now = Date.now();

    for (const company of companies) {
      const interval = getCrawlInterval(company.priorityScore);
      const lastCrawl = company.lastSuccessfulCrawl ? new Date(company.lastSuccessfulCrawl).getTime() : 0;
      if (now - lastCrawl >= interval) {
        console.log(`[Scheduler] Queueing crawl: ${company.name} (Priority ${company.priorityScore || 20})`);
        processCrawlForCompany(company.id).catch(err =>
          console.error(`[Scheduler] Crawl failed for ${company.name}:`, err)
        );
      }
    }
  } catch (err) {
    console.error('[Scheduler] Error during tick:', err);
  }
}

async function runWeeklyEnrichment() {
  console.log('[Scheduler] Running weekly career URL re-verification...');
  try {
    const { main: enrichCompanies } = require('../company/enrichCompanies');
    await enrichCompanies();
  } catch (err) {
    console.error('[Scheduler] Weekly enrichment error:', err);
  }
}

function startScheduler() {
  if (schedulerTimer) return;
  console.log('[Scheduler] Starting...');

  checkAndCrawl();
  schedulerTimer = setInterval(checkAndCrawl, TICK_INTERVAL);

  // Background embedding generator — every 3 minutes
  embedMissingJobs().catch(e => console.error('[Scheduler] Initial embed error:', e));
  embeddingTimer = setInterval(() => {
    console.log('[Scheduler] Checking for missing embeddings...');
    embedMissingJobs().catch(err => console.error('[Scheduler] Embedding error:', err));
  }, 3 * 60 * 1000);

  // Weekly URL re-verification
  weeklyTimer = setInterval(runWeeklyEnrichment, WEEKLY_INTERVAL);
}

function stopScheduler() {
  if (schedulerTimer) { clearInterval(schedulerTimer); schedulerTimer = null; }
  if (embeddingTimer)  { clearInterval(embeddingTimer);  embeddingTimer = null; }
  if (weeklyTimer)     { clearInterval(weeklyTimer);     weeklyTimer = null; }
  console.log('[Scheduler] Stopped.');
}

module.exports = { startScheduler, stopScheduler };
