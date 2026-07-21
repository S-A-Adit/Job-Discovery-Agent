const prisma = require('../db');
const { processCrawlForCompany } = require('../services/normalization');
const { embedMissingJobs } = require('../services/recommendation');

function getCrawlInterval(priorityScore) {
  const score = priorityScore || 20;
  if (score >= 100) {
    return 3 * 60 * 60 * 1000; // Tier 1: 3 hours
  } else if (score >= 80) {
    return 6 * 60 * 60 * 1000; // Tier 2: 6 hours
  } else if (score >= 60) {
    return 12 * 60 * 60 * 1000; // Tier 3: 12 hours
  } else {
    return 24 * 60 * 60 * 1000; // Tier 4/5: 24 hours (daily)
  }
}

// Tick interval: 1 minute
const TICK_INTERVAL = 60 * 1000;
let schedulerTimer = null;
let embeddingTimer = null;

async function checkAndCrawl() {
  console.log("[Scheduler] Tick: checking companies to crawl...");
  try {
    const companies = await prisma.company.findMany();
    const now = Date.now();

    for (const company of companies) {
      const interval = getCrawlInterval(company.priorityScore);
      const lastCrawl = company.lastSuccessfulCrawl ? new Date(company.lastSuccessfulCrawl).getTime() : 0;
      
      if (now - lastCrawl >= interval) {
        console.log(`[Scheduler] Company ${company.name} (Priority ${company.priorityScore || 20}) is due for crawling. Triggering...`);
        // Trigger asynchronously to avoid blocking the tick
        processCrawlForCompany(company.id).catch(err => {
          console.error(`[Scheduler] Crawl failed for ${company.name}:`, err);
        });
      }
    }
  } catch (err) {
    console.error("[Scheduler] Error during schedule tick:", err);
  }
}

function startScheduler() {
  if (schedulerTimer) return;
  console.log("[Scheduler] Starting scheduler tick...");
  
  // Run immediately on boot
  checkAndCrawl();
  schedulerTimer = setInterval(checkAndCrawl, TICK_INTERVAL);

  // Background embedding generator: run every 3 minutes
  embedMissingJobs().catch(e => console.error("Error in initial embed:", e));
  embeddingTimer = setInterval(() => {
    console.log("[Scheduler] Checking for missing embeddings...");
    embedMissingJobs().catch(err => {
      console.error("[Scheduler] Error embedding missing jobs:", err);
    });
  }, 3 * 60 * 1000);
}

function stopScheduler() {
  if (schedulerTimer) {
    clearInterval(schedulerTimer);
    schedulerTimer = null;
  }
  if (embeddingTimer) {
    clearInterval(embeddingTimer);
    embeddingTimer = null;
  }
  console.log("[Scheduler] Scheduler stopped.");
}

module.exports = {
  startScheduler,
  stopScheduler
};
