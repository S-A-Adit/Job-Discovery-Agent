const prisma = require('./db');
const { processCrawlForCompany } = require('./services/normalization');

async function main() {
  const companyName = process.argv[2];
  if (!companyName) {
    console.log("Usage: node test-crawler.js <CompanyName>");
    const companies = await prisma.company.findMany({ select: { name: true } });
    console.log("Available companies:", companies.map(c => c.name).join(", "));
    process.exit(1);
  }

  const company = await prisma.company.findFirst({
    where: { name: { equals: companyName } }
  });

  if (!company) {
    console.error(`Company '${companyName}' not found in registry.`);
    process.exit(1);
  }

  console.log(`Starting test crawl for ${company.name}...`);
  const result = await processCrawlForCompany(company.id);
  console.log("Crawl Result:", result);
}

main().finally(() => prisma.$disconnect());
