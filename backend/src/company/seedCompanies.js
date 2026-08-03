/**
 * Company Seeder — Multi-Source Bootstrap
 *
 * Sources:
 *   A. Fortune 500 Tech / NASDAQ-100 / S&P 500
 *   B. GitHub internship tracker (Summer 2025/2026 repos)
 *   C. YC Companies
 *   D. AI Companies
 *   E. Additional startup / hidden hiring lists
 *
 * Run: node src/company/seedCompanies.js [--dry-run]
 */

const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();

// ── Source A: Fortune 500 / NASDAQ-100 / S&P 500 ─────────────────────────────
const FORTUNE_COMPANIES = [
  { name: 'Microsoft',     website: 'https://www.microsoft.com',   industry: 'Technology',     country: 'USA', priority: 100 },
  { name: 'Google',        website: 'https://www.google.com',       industry: 'Technology',     country: 'USA', priority: 100 },
  { name: 'Apple',         website: 'https://www.apple.com',        industry: 'Technology',     country: 'USA', priority: 100 },
  { name: 'Amazon',        website: 'https://www.amazon.com',       industry: 'E-commerce',     country: 'USA', priority: 100 },
  { name: 'Meta',          website: 'https://www.meta.com',         industry: 'Social Media',   country: 'USA', priority: 100 },
  { name: 'Nvidia',        website: 'https://www.nvidia.com',       industry: 'Technology',     country: 'USA', priority: 100 },
  { name: 'Netflix',       website: 'https://www.netflix.com',      industry: 'Entertainment',  country: 'USA', priority: 100 },
  { name: 'AMD',           website: 'https://www.amd.com',          industry: 'Technology',     country: 'USA', priority: 80  },
  { name: 'Intel',         website: 'https://www.intel.com',        industry: 'Technology',     country: 'USA', priority: 80  },
  { name: 'Cisco',         website: 'https://www.cisco.com',        industry: 'Technology',     country: 'USA', priority: 80  },
  { name: 'Oracle',        website: 'https://www.oracle.com',       industry: 'Technology',     country: 'USA', priority: 80  },
  { name: 'Salesforce',    website: 'https://www.salesforce.com',   industry: 'Technology',     country: 'USA', priority: 80  },
  { name: 'Adobe',         website: 'https://www.adobe.com',        industry: 'Software',       country: 'USA', priority: 80  },
  { name: 'Qualcomm',      website: 'https://www.qualcomm.com',     industry: 'Semiconductors', country: 'USA', priority: 80  },
  { name: 'ServiceNow',    website: 'https://www.servicenow.com',   industry: 'SaaS',           country: 'USA', priority: 80  },
  { name: 'Broadcom',      website: 'https://www.broadcom.com',     industry: 'Semiconductors', country: 'USA', priority: 80  },
  { name: 'Intuit',        website: 'https://www.intuit.com',       industry: 'Finance/SaaS',   country: 'USA', priority: 60  },
  { name: 'Accenture',     website: 'https://www.accenture.com',    industry: 'Consulting',     country: 'Ireland', priority: 60 },
  { name: 'JPMorgan Chase',website: 'https://www.jpmorganchase.com',industry: 'Finance',        country: 'USA', priority: 60  },
  { name: 'Goldman Sachs', website: 'https://www.goldmansachs.com', industry: 'Finance',        country: 'USA', priority: 60  },
  { name: 'Morgan Stanley',website: 'https://www.morganstanley.com',industry: 'Finance',        country: 'USA', priority: 60  },
  { name: 'Boeing',        website: 'https://www.boeing.com',       industry: 'Aerospace',      country: 'USA', priority: 60  },
  { name: 'Tesla',         website: 'https://www.tesla.com',        industry: 'Automotive',     country: 'USA', priority: 100 },
];

// ── Source C: YC Companies ────────────────────────────────────────────────────
const YC_COMPANIES = [
  { name: 'Stripe',       website: 'https://stripe.com',       industry: 'Fintech',  country: 'USA', priority: 100 },
  { name: 'Airbnb',       website: 'https://www.airbnb.com',   industry: 'Hospitality', country: 'USA', priority: 100 },
  { name: 'Dropbox',      website: 'https://www.dropbox.com',  industry: 'Cloud Storage', country: 'USA', priority: 80 },
  { name: 'Reddit',       website: 'https://www.reddit.com',   industry: 'Social Media', country: 'USA', priority: 80 },
  { name: 'Coinbase',     website: 'https://www.coinbase.com', industry: 'Crypto',   country: 'USA', priority: 80 },
  { name: 'DoorDash',     website: 'https://www.doordash.com', industry: 'Delivery', country: 'USA', priority: 80 },
  { name: 'Instacart',    website: 'https://www.instacart.com',industry: 'Delivery', country: 'USA', priority: 60 },
  { name: 'Brex',         website: 'https://www.brex.com',     industry: 'Fintech',  country: 'USA', priority: 60 },
  { name: 'Rippling',     website: 'https://www.rippling.com', industry: 'HR Tech',  country: 'USA', priority: 60 },
];

// ── Source D: AI Companies ────────────────────────────────────────────────────
const AI_COMPANIES = [
  { name: 'OpenAI',       website: 'https://www.openai.com',      industry: 'Artificial Intelligence', country: 'USA', priority: 100 },
  { name: 'Anthropic',    website: 'https://www.anthropic.com',   industry: 'Artificial Intelligence', country: 'USA', priority: 100 },
  { name: 'Cohere',       website: 'https://www.cohere.com',      industry: 'Artificial Intelligence', country: 'Canada', priority: 80 },
  { name: 'Hugging Face', website: 'https://huggingface.co',      industry: 'Artificial Intelligence', country: 'USA', priority: 80 },
  { name: 'Scale AI',     website: 'https://scale.com',           industry: 'Artificial Intelligence', country: 'USA', priority: 80 },
  { name: 'Perplexity',   website: 'https://www.perplexity.ai',   industry: 'Artificial Intelligence', country: 'USA', priority: 80 },
  { name: 'Runway',       website: 'https://runwayml.com',        industry: 'Artificial Intelligence', country: 'USA', priority: 60 },
  { name: 'ElevenLabs',   website: 'https://www.elevenlabs.io',   industry: 'Artificial Intelligence', country: 'USA', priority: 60 },
  { name: 'Mistral AI',   website: 'https://www.mistral.ai',      industry: 'Artificial Intelligence', country: 'France', priority: 60 },
  { name: 'Together AI',  website: 'https://www.together.ai',     industry: 'Artificial Intelligence', country: 'USA', priority: 60 },
  { name: 'Weights & Biases', website: 'https://wandb.ai',        industry: 'ML Tools',     country: 'USA', priority: 60 },
  { name: 'Replicate',    website: 'https://replicate.com',       industry: 'ML Tools',     country: 'USA', priority: 60 },
  { name: 'Modal',        website: 'https://modal.com',           industry: 'ML Infrastructure', country: 'USA', priority: 60 },
  { name: 'Anyscale',     website: 'https://www.anyscale.com',    industry: 'ML Infrastructure', country: 'USA', priority: 60 },
];

// ── Source E: Developer Tools + Startups ─────────────────────────────────────
const DEV_COMPANIES = [
  { name: 'Vercel',       website: 'https://vercel.com',        industry: 'Developer Tools', country: 'USA', priority: 80 },
  { name: 'Supabase',     website: 'https://supabase.com',      industry: 'Developer Tools', country: 'Singapore', priority: 80 },
  { name: 'Cloudflare',   website: 'https://www.cloudflare.com',industry: 'Infrastructure', country: 'USA', priority: 100 },
  { name: 'Figma',        website: 'https://www.figma.com',     industry: 'Design Tools',   country: 'USA', priority: 80 },
  { name: 'Notion',       website: 'https://www.notion.so',     industry: 'Productivity',   country: 'USA', priority: 80 },
  { name: 'Linear',       website: 'https://linear.app',        industry: 'Developer Tools', country: 'USA', priority: 60 },
  { name: 'Retool',       website: 'https://retool.com',        industry: 'Developer Tools', country: 'USA', priority: 60 },
  { name: 'Datadog',      website: 'https://www.datadoghq.com', industry: 'Observability',  country: 'USA', priority: 80 },
  { name: 'Sentry',       website: 'https://sentry.io',         industry: 'Developer Tools', country: 'USA', priority: 60 },
  { name: 'Databricks',   website: 'https://www.databricks.com',industry: 'Data/AI',        country: 'USA', priority: 100 },
  { name: 'Snowflake',    website: 'https://www.snowflake.com', industry: 'Data',           country: 'USA', priority: 100 },
  { name: 'MongoDB',      website: 'https://www.mongodb.com',   industry: 'Database',       country: 'USA', priority: 60 },
  { name: 'Elastic',      website: 'https://www.elastic.co',    industry: 'Search',         country: 'USA', priority: 60 },
  { name: 'HashiCorp',    website: 'https://www.hashicorp.com', industry: 'Infrastructure', country: 'USA', priority: 60 },
  { name: 'Postman',      website: 'https://www.postman.com',   industry: 'Developer Tools', country: 'USA', priority: 60 },
  { name: 'GitHub',       website: 'https://github.com',        industry: 'Developer Tools', country: 'USA', priority: 100 },
  { name: 'GitLab',       website: 'https://www.gitlab.com',    industry: 'Developer Tools', country: 'USA', priority: 80 },
  { name: 'PagerDuty',    website: 'https://www.pagerduty.com', industry: 'Observability',  country: 'USA', priority: 60 },
  { name: 'Grafana',      website: 'https://grafana.com',       industry: 'Observability',  country: 'USA', priority: 60 },
  { name: 'Pinecone',     website: 'https://www.pinecone.io',   industry: 'ML Infrastructure', country: 'USA', priority: 60 },
  { name: 'Weaviate',     website: 'https://weaviate.io',       industry: 'ML Infrastructure', country: 'Netherlands', priority: 60 },
  { name: 'Temporal',     website: 'https://temporal.io',       industry: 'Developer Tools', country: 'USA', priority: 60 },
  { name: 'Pulumi',       website: 'https://www.pulumi.com',    industry: 'Infrastructure', country: 'USA', priority: 60 },
];

// ── Source B: GitHub Internship Tracker (runtime fetch) ───────────────────────
const GITHUB_INTERNSHIP_TRACKER_URLS = [
  // Community-maintained lists — parsed for company name + ATS link
  'https://raw.githubusercontent.com/SimplifyJobs/Summer2025-Internships/dev/README.md',
  'https://raw.githubusercontent.com/vanshb03/Summer2027-Internships/main/README.md'
];

/**
 * Parses a GitHub internship tracker markdown file.
 * Extracts company name and apply link rows from markdown table format.
 * Returns array of { name, applyUrl }
 */
function parseGithubTracker(markdown) {
  const results = [];
  const lines = markdown.split('\n');

  for (const line of lines) {
    if (!line.startsWith('|')) continue;
    const cols = line.split('|').map(c => c.trim()).filter(Boolean);
    if (cols.length < 3) continue;

    // Typical format: | Company | Role | Location | Link | ... |
    const nameCol = cols[0];
    const linkCol = cols.find(c => c.includes('http') || c.includes('[Apply]') || c.includes('[🔗]'));

    if (!nameCol || nameCol === 'Company' || nameCol.startsWith('---')) continue;

    // Extract company name (strip markdown links)
    const nameMatch = nameCol.match(/\[([^\]]+)\]/) || nameCol.match(/^([^[\]<>]+)/);
    const name = nameMatch ? nameMatch[1].trim() : null;

    // Extract apply URL
    let applyUrl = null;
    if (linkCol) {
      const urlMatch = linkCol.match(/https?:\/\/[^\s)\]"]+/);
      if (urlMatch) applyUrl = urlMatch[0];
    }

    if (name && name.length > 1) {
      results.push({ name, applyUrl });
    }
  }

  return results;
}

/**
 * Detects ATS provider from an apply URL.
 * Returns { atsProvider, sourceFingerprint, apiEndpoint } or null.
 */
function detectAtsFromUrl(url) {
  if (!url) return null;
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    if (hostname.includes('greenhouse.io')) {
      const match = url.match(/greenhouse\.io\/([^/?#]+)/);
      const slug = match ? match[1] : null;
      return {
        atsProvider: 'Greenhouse',
        sourceFingerprint: slug,
        apiEndpoint: slug ? `https://boards-api.greenhouse.io/v1/boards/${slug}/jobs?content=true` : null,
        careerPageUrl: url,
        sourceType: 'ATS'
      };
    }
    if (hostname.includes('lever.co')) {
      const match = url.match(/lever\.co\/([^/?#]+)/);
      const slug = match ? match[1] : null;
      return {
        atsProvider: 'Lever',
        sourceFingerprint: slug,
        apiEndpoint: slug ? `https://api.lever.co/v0/postings/${slug}?group=team` : null,
        careerPageUrl: url,
        sourceType: 'ATS'
      };
    }
    if (hostname.includes('ashbyhq.com')) {
      const match = url.match(/ashbyhq\.com\/([^/?#]+)/);
      const slug = match ? match[1] : null;
      return {
        atsProvider: 'Ashby',
        sourceFingerprint: slug,
        apiEndpoint: slug ? `https://api.ashbyhq.com/draft/public-api/job-board/${slug}` : null,
        careerPageUrl: url,
        sourceType: 'ATS'
      };
    }
    if (hostname.includes('myworkdayjobs.com')) {
      const match = url.match(/([a-zA-Z0-9\-]+)\.myworkdayjobs\.com/);
      const slug = match ? match[1] : null;
      return {
        atsProvider: 'Workday',
        sourceFingerprint: slug,
        apiEndpoint: slug ? `https://${match[0]}/wday/cxs/${slug}/External/jobs` : null,
        careerPageUrl: url,
        sourceType: 'ATS'
      };
    }
    if (hostname.includes('smartrecruiters.com')) {
      const match = url.match(/smartrecruiters\.com\/([^/?#]+)/);
      const slug = match ? match[1] : null;
      return {
        atsProvider: 'SmartRecruiters',
        sourceFingerprint: slug,
        careerPageUrl: url,
        sourceType: 'ATS'
      };
    }
  } catch (_) {}
  return null;
}

async function fetchGithubCompanies() {
  const companies = [];

  for (const trackerUrl of GITHUB_INTERNSHIP_TRACKER_URLS) {
    try {
      console.log(`[Seed] Fetching GitHub tracker: ${trackerUrl}`);
      const res = await fetch(trackerUrl, { headers: { 'User-Agent': 'JobDiscoveryBot/1.0' }, signal: AbortSignal.timeout(10000) });
      if (!res.ok) continue;
      const markdown = await res.text();
      const parsed = parseGithubTracker(markdown);
      console.log(`[Seed] Parsed ${parsed.length} entries from ${trackerUrl}`);

      for (const { name, applyUrl } of parsed) {
        const atsInfo = detectAtsFromUrl(applyUrl);
        companies.push({
          name,
          website: null, // Will be enriched later
          industry: 'Technology',
          country: 'USA',
          priority: 60,
          ...(atsInfo || {})
        });
      }
    } catch (err) {
      console.warn(`[Seed] Failed to fetch ${trackerUrl}:`, err.message);
    }
  }

  return companies;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  console.log(`\n[SeedCompanies] Starting multi-source seeding... (dry-run: ${dryRun})\n`);

  const allSources = [
    ...FORTUNE_COMPANIES,
    ...YC_COMPANIES,
    ...AI_COMPANIES,
    ...DEV_COMPANIES
  ];

  const githubCompanies = await fetchGithubCompanies();
  console.log(`[Seed] GitHub trackers: ${githubCompanies.length} companies`);
  allSources.push(...githubCompanies);

  // Deduplicate by name (case-insensitive)
  const seen = new Set();
  const unique = allSources.filter(c => {
    const key = c.name.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  console.log(`[Seed] Total unique companies to seed: ${unique.length}`);

  if (dryRun) {
    console.log('[Seed] Dry run complete. No database writes.');
    return;
  }

  let added = 0;
  let updated = 0;
  const newlyCreatedCompanyIds = [];

  for (const company of unique) {
    const careerPageUrl = company.careerPageUrl || `${company.website || ''}/careers`;
    try {
      const existing = await prisma.company.findUnique({ where: { name: company.name } });
      
      if (existing) {
        await prisma.company.update({
          where: { id: existing.id },
          data: {
            industry: company.industry,
            country: company.country,
            priorityScore: company.priority,
            website: company.website || undefined,
            atsProvider: company.atsProvider || undefined,
            sourceFingerprint: company.sourceFingerprint || undefined,
            apiEndpoint: company.apiEndpoint || undefined,
            sourceType: company.sourceType || undefined,
            careerPageUrl: company.careerPageUrl || undefined
          }
        });
        updated++;
      } else {
        const created = await prisma.company.create({
          data: {
            name: company.name,
            website: company.website || '',
            industry: company.industry,
            country: company.country,
            priorityScore: company.priority,
            careerPageUrl,
            sourceType: company.sourceType || 'Career Site',
            crawlFrequency: company.priority >= 80 ? '6h' : '24h',
            atsProvider: company.atsProvider || null,
            sourceFingerprint: company.sourceFingerprint || null,
            apiEndpoint: company.apiEndpoint || null,
            status: 'ACTIVE'
          }
        });
        newlyCreatedCompanyIds.push(created.id);
        added++;
      }
    } catch (err) {
      console.warn(`[Seed] Failed to process ${company.name}: ${err.message}`);
    }
  }

  console.log(`\n[Seed] Done. ${added} companies added, ${updated} updated in database.`);

  if (newlyCreatedCompanyIds.length > 0) {
    console.log(`\n[Seed] Initiating immediate crawl for ${newlyCreatedCompanyIds.length} newly added companies...`);
    const { processCrawlForCompany } = require('../scraper/scraper');
    let crawlSuccess = 0;
    for (const companyId of newlyCreatedCompanyIds) {
      try {
        const result = await processCrawlForCompany(companyId);
        if (result && result.success) {
          crawlSuccess++;
        }
      } catch (e) {
        console.error(`[Seed] Crawl failed for company ID ${companyId}:`, e.message);
      }
    }
    console.log(`[Seed] Finished crawling ${crawlSuccess}/${newlyCreatedCompanyIds.length} new companies successfully.`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
