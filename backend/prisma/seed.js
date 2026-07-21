const { PrismaClient } = require('../src/generated/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding settings...');
  const existingSettings = await prisma.settings.findUnique({
    where: { id: 'singleton' }
  });

  if (!existingSettings) {
    const defaultSettings = {
      GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
      GEMINI_MODEL: 'gemini-2.0-flash',
      resumeText: '',
      resumeEmbedding: null,
      preferences: {
        desiredRoles: ['Software Engineer', 'Machine Learning', 'Data Scientist', 'Frontend', 'Backend'],
        desiredLocations: ['Remote', 'San Francisco', 'New York', 'Seattle'],
        matchThreshold: 0.65
      }
    };
    await prisma.settings.create({
      data: {
        id: 'singleton',
        dataJson: JSON.stringify(defaultSettings)
      }
    });
    console.log('Default settings created.');
  } else {
    console.log('Settings already exist, skipping.');
  }

  console.log('Seeding company registry...');

  // Full company registry covering all ATS providers and career portals from the proposal.
  // Sources: Greenhouse, Lever, Ashby, Workday, Google Careers, SmartRecruiters, Oracle Jobs
  const companies = [
    // ─── Greenhouse ATS ───────────────────────────────────────────────────────
    {
      name: 'Cloudflare',
      careerPageUrl: 'https://www.cloudflare.com/careers/',
      sourceType: 'ATS',
      atsProvider: 'Greenhouse',
      crawlFrequency: '15m',
      apiEndpoint: 'https://boards-api.greenhouse.io/v1/boards/cloudflare/jobs?content=true',
      sourceFingerprint: 'cloudflare'
    },
    {
      name: 'Figma',
      careerPageUrl: 'https://www.figma.com/careers/',
      sourceType: 'ATS',
      atsProvider: 'Greenhouse',
      crawlFrequency: '1h',
      apiEndpoint: 'https://boards-api.greenhouse.io/v1/boards/figma/jobs?content=true',
      sourceFingerprint: 'figma'
    },
    {
      name: 'Anthropic',
      careerPageUrl: 'https://www.anthropic.com/careers',
      sourceType: 'ATS',
      atsProvider: 'Greenhouse',
      crawlFrequency: '15m',
      apiEndpoint: 'https://boards-api.greenhouse.io/v1/boards/anthropic/jobs?content=true',
      sourceFingerprint: 'anthropic'
    },
    {
      name: 'Scale AI',
      careerPageUrl: 'https://scale.com/careers',
      sourceType: 'ATS',
      atsProvider: 'Greenhouse',
      crawlFrequency: '1h',
      apiEndpoint: 'https://boards-api.greenhouse.io/v1/boards/scaleai/jobs?content=true',
      sourceFingerprint: 'scaleai'
    },
    {
      name: 'Coinbase',
      careerPageUrl: 'https://www.coinbase.com/careers',
      sourceType: 'ATS',
      atsProvider: 'Greenhouse',
      crawlFrequency: '1h',
      apiEndpoint: 'https://boards-api.greenhouse.io/v1/boards/coinbase/jobs?content=true',
      sourceFingerprint: 'coinbase'
    },

    // ─── Lever ATS ────────────────────────────────────────────────────────────
    {
      name: 'Lever',
      careerPageUrl: 'https://www.lever.co/careers/',
      sourceType: 'ATS',
      atsProvider: 'Lever',
      crawlFrequency: '15m',
      apiEndpoint: 'https://api.lever.co/v0/postings/lever?group=team',
      sourceFingerprint: 'lever'
    },
    {
      name: 'Reddit',
      careerPageUrl: 'https://www.redditinc.com/careers',
      sourceType: 'ATS',
      atsProvider: 'Lever',
      crawlFrequency: '1h',
      apiEndpoint: 'https://api.lever.co/v0/postings/reddit?group=team',
      sourceFingerprint: 'reddit'
    },

    // ─── Ashby ATS ────────────────────────────────────────────────────────────
    {
      name: 'Linear',
      careerPageUrl: 'https://linear.app/careers',
      sourceType: 'ATS',
      atsProvider: 'Ashby',
      crawlFrequency: '6h',
      apiEndpoint: 'https://api.ashbyhq.com/draft/public-api/job-board/linear',
      sourceFingerprint: 'linear'
    },

    // ─── Workday ──────────────────────────────────────────────────────────────
    {
      name: 'Netflix',
      careerPageUrl: 'https://jobs.netflix.com/',
      sourceType: 'ATS',
      atsProvider: 'Workday',
      crawlFrequency: '15m',
      // Netflix Workday CXS endpoint (publicly accessible)
      apiEndpoint: 'https://jobs.netflix.com/wday/cxs/netflix/External/jobs',
      sourceFingerprint: 'netflix'
    },
    {
      name: 'Salesforce',
      careerPageUrl: 'https://www.salesforce.com/company/careers/',
      sourceType: 'ATS',
      atsProvider: 'Workday',
      crawlFrequency: '1h',
      apiEndpoint: 'https://salesforce.wd12.myworkdayjobs.com/wday/cxs/salesforce/External_Career_Site/jobs',
      sourceFingerprint: 'salesforce'
    },

    // ─── SmartRecruiters ─────────────────────────────────────────────────────
    {
      name: 'IKEA',
      careerPageUrl: 'https://www.ikea.com/us/en/jobs/',
      sourceType: 'ATS',
      atsProvider: 'SmartRecruiters',
      crawlFrequency: '6h',
      apiEndpoint: 'https://api.smartrecruiters.com/v1/companies/IKEA/postings?limit=100',
      sourceFingerprint: 'IKEA'
    },
    {
      name: 'Visa',
      careerPageUrl: 'https://careers.visa.com/',
      sourceType: 'ATS',
      atsProvider: 'SmartRecruiters',
      crawlFrequency: '6h',
      apiEndpoint: 'https://api.smartrecruiters.com/v1/companies/visa/postings?limit=100',
      sourceFingerprint: 'visa'
    },

    // ─── Google Careers ───────────────────────────────────────────────────────
    {
      name: 'Google',
      careerPageUrl: 'https://careers.google.com/',
      sourceType: 'Career Site',
      atsProvider: 'Google Careers',
      crawlFrequency: '15m',
      apiEndpoint: 'https://careers.google.com/api/v1/jobs/search/?q=&company=Google&hl=en_US',
      sourceFingerprint: 'google'
    },

    // ─── Oracle Jobs ──────────────────────────────────────────────────────────
    {
      name: 'Oracle',
      careerPageUrl: 'https://www.oracle.com/careers/',
      sourceType: 'Career Site',
      atsProvider: 'Oracle',
      crawlFrequency: '6h',
      // Oracle Recruiting Cloud public REST endpoint (requires browser fallback if blocked)
      apiEndpoint: null,
      sourceFingerprint: 'oracle'
    }
  ];

  let upserted = 0;
  for (const company of companies) {
    await prisma.company.upsert({
      where: { name: company.name },
      update: {
        careerPageUrl: company.careerPageUrl,
        sourceType: company.sourceType,
        atsProvider: company.atsProvider,
        crawlFrequency: company.crawlFrequency,
        apiEndpoint: company.apiEndpoint,
        sourceFingerprint: company.sourceFingerprint
      },
      create: company
    });
    console.log(`  ✓ Upserted: ${company.name} (${company.atsProvider})`);
    upserted++;
  }

  console.log(`\nSeeding complete. ${upserted} companies in registry.`);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
