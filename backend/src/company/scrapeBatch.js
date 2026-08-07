/**
 * Manual Bite-Sized Batch Scraper
 *
 * Grabs a specific number of unscraped companies from the database
 * and processes them sequentially. Safe to run manually and shut down when finished.
 *
 * Usage: node src/company/scrapeBatch.js <batch-size>
 * Example: node src/company/scrapeBatch.js 100
 */

const prisma = require('../db');
const { processCrawlForCompany } = require('../scraper/scraper');

const batchSizeArg = process.argv[2];
if (!batchSizeArg) {
  console.error('Usage: node src/company/scrapeBatch.js <batch-size>');
  process.exit(1);
}

const batchSize = parseInt(batchSizeArg, 10);
if (isNaN(batchSize) || batchSize <= 0) {
  console.error('Batch size must be a positive number.');
  process.exit(1);
}

async function getCompaniesToScrape(limit) {
  // 1. Prioritize completely new companies (never successfully scraped)
  let companies = await prisma.company.findMany({
    where: {
      status: 'ACTIVE',
      lastSuccessfulCrawl: null,
    },
    take: limit,
  });

  // 2. If we need more to fill the batch, get the oldest scraped companies
  if (companies.length < limit) {
    const remainingLimit = limit - companies.length;
    const fallbackCompanies = await prisma.company.findMany({
      where: {
        status: 'ACTIVE',
        lastSuccessfulCrawl: { not: null },
      },
      orderBy: {
        lastSuccessfulCrawl: 'asc',
      },
      take: remainingLimit,
    });
    companies = companies.concat(fallbackCompanies);
  }

  return companies;
}

async function main() {
  console.log(`\n=== Bite-Sized Batch Scraper ===`);
  console.log(`Target Batch Size: ${batchSize}\n`);

  const targetCompanies = await getCompaniesToScrape(batchSize);

  if (targetCompanies.length === 0) {
    console.log('No ACTIVE companies found to scrape.');
    return;
  }

  console.log(`Found ${targetCompanies.length} companies to process.\n`);

  let successCount = 0;
  let failCount = 0;
  let totalJobsFound = 0;
  let totalNewJobs = 0;

  for (let i = 0; i < targetCompanies.length; i++) {
    const company = targetCompanies[i];
    console.log(`[${i + 1}/${targetCompanies.length}] Processing: ${company.name}`);
    
    try {
      const result = await processCrawlForCompany(company.id);
      
      if (result && result.success) {
        console.log(`  ✓ Success: Found ${result.jobsFound} jobs (${result.jobsNew} new).`);
        successCount++;
        totalJobsFound += result.jobsFound;
        totalNewJobs += result.jobsNew;
      } else {
        console.log(`  ✗ Failed: ${result?.error || 'Unknown error'}`);
        failCount++;
      }
    } catch (err) {
      console.log(`  ✗ Crashed: ${err.message}`);
      failCount++;
    }
    console.log('--------------------------------------------------');
  }

  console.log(`\n=== Batch Complete ===`);
  console.log(`Successfully Crawled: ${successCount}`);
  console.log(`Failed to Crawl:      ${failCount}`);
  console.log(`Total Jobs Found:     ${totalJobsFound}`);
  console.log(`Brand New Jobs Added: ${totalNewJobs}`);
  console.log(`\nYou can now safely shut down your IDE.\n`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
