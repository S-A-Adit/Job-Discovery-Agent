/**
 * CSV Ingestion Script
 *
 * Imports companies from a CSV file, enforces uniqueness,
 * and dynamically scrapes the first N new companies discovered.
 *
 * Usage: node src/company/importCsv.js <path-to-csv> [limit-N-scrapes]
 * Example: node src/company/importCsv.js ./dataset.csv 50
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const prisma = require('../db');
const { processCrawlForCompany } = require('../scraper/scraper');

const filePath = process.argv[2];
const N_SCRAPES = parseInt(process.argv[3] || '50', 10);

if (!filePath) {
  console.error('Usage: node src/company/importCsv.js <path-to-csv> [scrape-limit]');
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

const BATCH_SIZE = 50;
let buffer = [];
let totalProcessed = 0;
let totalAdded = 0;
let totalUpdated = 0;
const newlyCreatedCompanyIds = [];

async function flushBatch() {
  if (buffer.length === 0) return;

  const currentBatch = [...buffer];
  buffer = [];

  for (const row of currentBatch) {
    const name = row.name?.trim();
    if (!name) continue;

    const website = row.website?.trim() || '';
    const industry = row.industry?.trim() || 'Unknown';
    const country = row.country?.trim() || 'Unknown';
    const careerPageUrl = `${website}/careers`;

    try {
      const existing = await prisma.company.findUnique({ where: { name } });

      if (existing) {
        await prisma.company.update({
          where: { id: existing.id },
          data: {
            industry: industry !== 'Unknown' ? industry : existing.industry,
            country: country !== 'Unknown' ? country : existing.country,
            website: website || existing.website
          }
        });
        totalUpdated++;
      } else {
        const created = await prisma.company.create({
          data: {
            name,
            website,
            industry,
            country,
            careerPageUrl,
            sourceType: 'CSV Import',
            crawlFrequency: '24h',
            priorityScore: 50,
            status: 'ACTIVE'
          }
        });
        newlyCreatedCompanyIds.push(created.id);
        totalAdded++;
      }
    } catch (err) {
      console.warn(`[Import] Failed to process ${name}: ${err.message}`);
    }
  }

  totalProcessed += currentBatch.length;
  console.log(`[Import] Processed ${totalProcessed} rows... (Added: ${totalAdded}, Updated: ${totalUpdated})`);
}

async function streamProcess() {
  console.log(`\n=== Starting CSV Import ===\nFile: ${filePath}\nMax Dynamic Scrapes: ${N_SCRAPES}\n`);
  const parser = fs.createReadStream(filePath).pipe(csv());

  for await (const row of parser) {
    buffer.push(row);
    if (buffer.length >= BATCH_SIZE) {
      await flushBatch();
    }
  }
  
  if (buffer.length > 0) {
    await flushBatch();
  }

  console.log(`\n=== Import Complete ===`);
  console.log(`Total Rows Processed: ${totalProcessed}`);
  console.log(`New Companies Added:  ${totalAdded}`);
  console.log(`Companies Updated:    ${totalUpdated}`);

  // Dynamic Scraping for first N companies
  if (newlyCreatedCompanyIds.length > 0) {
    const idsToScrape = newlyCreatedCompanyIds.slice(0, N_SCRAPES);
    console.log(`\n=== Dynamic Scraping ===`);
    console.log(`Initiating immediate crawl for ${idsToScrape.length} new companies (out of ${newlyCreatedCompanyIds.length} total added)...`);
    
    let crawlSuccess = 0;
    for (const companyId of idsToScrape) {
      try {
        const result = await processCrawlForCompany(companyId);
        if (result && result.success) {
          crawlSuccess++;
        }
      } catch (e) {
        console.error(`[Scrape] Crawl failed for company ID ${companyId}:`, e.message);
      }
    }
    console.log(`Finished crawling ${crawlSuccess}/${idsToScrape.length} companies successfully.`);
    if (newlyCreatedCompanyIds.length > N_SCRAPES) {
       console.log(`Note: ${newlyCreatedCompanyIds.length - N_SCRAPES} new companies were added but not scraped immediately to save time. The scheduler will pick them up later.`);
    }
  } else {
    console.log(`\n=== No New Companies to Scrape ===`);
  }
}

streamProcess()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
