const { PrismaClient } = require('../src/generated/client');
const prisma = new PrismaClient();

async function addBloomberg() {
  await prisma.company.upsert({
    where: { name: 'Bloomberg' },
    update: {
      status: 'ACTIVE',
      careerPageUrl: ''
    },
    create: {
      name: 'Bloomberg',
      website: 'https://www.bloomberg.com',
      careerPageUrl: '',
      sourceType: 'Unknown',
      crawlFrequency: '1h',
      status: 'ACTIVE',
      priorityScore: 90
    }
  });
  console.log("Added Bloomberg");
}

addBloomberg().then(() => prisma.$disconnect());
