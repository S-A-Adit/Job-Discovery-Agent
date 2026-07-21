const { PrismaClient } = require('./generated/client');
const path = require('path');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${path.join(__dirname, '..', 'prisma', 'job-agent.db')}`
    }
  }
});

module.exports = prisma;
