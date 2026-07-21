const fs = require('fs');
const path = require('path');
const dotenvPath = fs.existsSync(path.join(__dirname, '../../../.env'))
  ? path.join(__dirname, '../../../.env')
  : (fs.existsSync(path.join(__dirname, '../../.env')) ? path.join(__dirname, '../../.env') : path.join(__dirname, '.env'));
require('dotenv').config({ path: dotenvPath });

const prisma = require('../src/db');
const { findCareerPage } = require('../src/discovery/careerFinder');
const { detectAts } = require('../src/services/discovery-engine');

async function discoverAll() {
  // Query all companies. If careerPageUrl is empty, it needs discovery.
  const companies = await prisma.company.findMany({
    where: {
      status: 'ACTIVE'
    }
  });

  const targetCompanies = companies.filter(
    c => !c.careerPageUrl || c.careerPageUrl === '' || c.careerPageUrl === `${c.website || ''}/careers`
  );

  console.log(`[Discovery] Found ${targetCompanies.length} companies that need career page discovery.`);

  for (const company of targetCompanies) {
    try {
      console.log(`\n[Discovery] Processing: ${company.name}`);
      const pageResult = await findCareerPage(company.id);
      
      if (pageResult.success) {
        console.log(`  -> Saved Career URL: ${pageResult.url}`);
        const atsResult = await detectAts(company.id);
        console.log(`  -> Detected ATS: ${atsResult.atsProvider || 'None/Fallback'}`);
      } else {
        console.log(`  -> Failed: ${pageResult.error}`);
      }
    } catch (err) {
      if (err.message === 'CRAWLER_PAUSED_BY_USER') {
        console.log('\n[Discovery] Execution paused by user choice. Exiting discovery loop.');
        break;
      }
      console.error(`  -> Error processing ${company.name}:`, err.message);
    }
  }
}

discoverAll()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
