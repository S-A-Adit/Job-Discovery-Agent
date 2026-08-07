/**
 * Manual Bite-Sized Batch Standardizer (Gemini LLM)
 *
 * Grabs a specific number of unprocessed jobs from the database
 * and uses the Gemini LLM to extract highly structured tags (Remote, Salary, Skills, etc.).
 *
 * Usage: node src/scraper/standardizeBatch.js <batch-size>
 * Example: node src/scraper/standardizeBatch.js 50
 */

const prisma = require('../db');
const { standardizeJobFields } = require('../services/llmStandardize');

const batchSizeArg = process.argv[2];
if (!batchSizeArg) {
  console.error('Usage: node src/scraper/standardizeBatch.js <batch-size>');
  process.exit(1);
}

const batchSize = parseInt(batchSizeArg, 10);
if (isNaN(batchSize) || batchSize <= 0) {
  console.error('Batch size must be a positive number.');
  process.exit(1);
}

async function main() {
  console.log(`\n=== LLM Job Standardization Batch ===`);
  console.log(`Target Batch Size: ${batchSize}\n`);

  const jobsToProcess = await prisma.job.findMany({
    where: {
      status: 'ACTIVE',
      llmProcessed: false,
    },
    take: batchSize,
    orderBy: {
      firstSeen: 'desc', // Prioritize newest jobs first
    }
  });

  if (jobsToProcess.length === 0) {
    console.log('No unprocessed jobs found.');
    return;
  }

  console.log(`Found ${jobsToProcess.length} jobs to standardize.\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < jobsToProcess.length; i++) {
    const job = jobsToProcess[i];
    console.log(`[${i + 1}/${jobsToProcess.length}] Parsing: ${job.companyName} - ${job.title}`);
    
    try {
      const extractedData = await standardizeJobFields(job.title, job.description);
      
      // Merge with existing fields if LLM returned null
      const remote = extractedData.remote !== undefined ? extractedData.remote : job.remote;
      const salary = extractedData.salary || job.salary;
      const department = extractedData.department || job.department;
      const skills = extractedData.skills || job.skills;
      const experience = extractedData.experience || job.experience;

      await prisma.job.update({
        where: { id: job.id },
        data: {
          remote,
          salary,
          department,
          skills,
          experience,
          llmProcessed: true
        }
      });
      
      console.log(`  ✓ Success: [Exp: ${experience}] [Remote: ${remote}] [Skills: ${skills ? 'Yes' : 'No'}]`);
      successCount++;
      
      // Sleep a tiny bit to be gentle on rate limits
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.log(`  ✗ Failed: ${err.message}`);
      failCount++;
      
      // If we hit hard rate limits, back off significantly before the next job
      if (err.message.includes('429')) {
         console.log('  [!] Hit rate limit. Pausing for 30s...');
         await new Promise(r => setTimeout(r, 30000));
      }
    }
  }

  console.log(`\n=== Batch Complete ===`);
  console.log(`Successfully Standardized: ${successCount}`);
  console.log(`Failed:                    ${failCount}`);
  console.log(`\nYou can now safely shut down your IDE.\n`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
