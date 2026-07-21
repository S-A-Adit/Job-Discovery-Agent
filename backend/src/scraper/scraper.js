/**
 * Scraper — Orchestrates company crawling: fetch → normalize → upsert → archive.
 */

const prisma = require('../db');
const { crawlCompany } = require('../ats');
const { normalizeJob } = require('./normalize');
const { enqueue } = require('../crawler/queue');

async function pruneOldJobs() {
  const cutoff = new Date(Date.now() - 72 * 60 * 60 * 1000);
  const result = await prisma.job.deleteMany({
    where: {
      OR: [
        { firstSeen: { lt: cutoff } },
        { status: 'INACTIVE' }
      ]
    }
  });
  if (result.count > 0) {
    console.log(`[Scraper] Pruned ${result.count} old or inactive jobs.`);
  }
}

async function processCrawlForCompany(companyId) {
  const startTime = Date.now();
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company) throw new Error(`Company not found: ${companyId}`);

  console.log(`[Scraper] Crawling ${company.name}...`);
  let jobsFound = 0;
  let jobsNew = 0;
  let errorMsg = null;

  try {
    const rawJobs = await enqueue(company.careerPageUrl, async () => {
      return await crawlCompany(company);
    });

    jobsFound = rawJobs.length;
    console.log(`[Scraper] ${company.name}: ${jobsFound} raw jobs fetched`);

    const runTimestamp = new Date();

    for (const rawJob of rawJobs) {
      const normalized = normalizeJob(rawJob, company);
      if (!normalized) continue;

      const existingJob = await prisma.job.findUnique({ where: { hash: normalized.hash } });

      if (existingJob) {
        await prisma.job.update({
          where: { hash: normalized.hash },
          data: {
            lastSeen: runTimestamp,
            status: 'ACTIVE',
            url: normalized.url,
            description: normalized.description || existingJob.description
          }
        });
      } else {
        await prisma.job.create({
          data: { ...normalized, firstSeen: runTimestamp, lastSeen: runTimestamp, status: 'ACTIVE' }
        });
        jobsNew++;
      }
    }

    // Archive jobs not seen in this crawl run
    const updateResult = await prisma.job.updateMany({
      where: { companyId: company.id, lastSeen: { lt: runTimestamp }, status: 'ACTIVE' },
      data: { status: 'INACTIVE' }
    });

    if (updateResult.count > 0) {
      console.log(`[Scraper] Archived ${updateResult.count} jobs for ${company.name}`);
    }

    await prisma.company.update({
      where: { id: companyId },
      data: { lastSuccessfulCrawl: runTimestamp }
    });

    await prisma.crawlLog.create({
      data: { companyId: company.id, status: 'SUCCESS', jobsFound, jobsNew, durationMs: Date.now() - startTime }
    });

    await pruneOldJobs();
    return { success: true, jobsFound, jobsNew };
  } catch (err) {
    errorMsg = err.message;
    console.error(`[Scraper] Error crawling ${company.name}:`, err);
    await prisma.crawlLog.create({
      data: { companyId: company.id, status: 'FAILURE', jobsFound: 0, jobsNew: 0, errorMessage: errorMsg, durationMs: Date.now() - startTime }
    });
    return { success: false, error: errorMsg };
  }
}

module.exports = { processCrawlForCompany, pruneOldJobs };
