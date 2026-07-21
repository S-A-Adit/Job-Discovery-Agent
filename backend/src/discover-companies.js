const { PrismaClient } = require('./generated/client');
const prisma = new PrismaClient();

const CANDIDATE_SLUGS = [
  // Financial Tech / Payments
  'stripe', 'plaid', 'chime', 'ramp', 'brex', 'revolut', 'monzo', 'wise', 'affirm', 'robinhood',
  'checkout', 'gusto', 'rippling', 'deel', 'remote', 'bolt', 'klarna', 'n26', 'wealthfront', 'betterment',
  'sofi', 'payoneer', 'circle', 'gemini', 'kraken', 'coinbase', 'ledger', 'blockdaemon', 'fireblocks',
  'tink', 'truelayer', 'starlingbank', 'worldremit', 'remitly', 'flywire', 'carta', 'addepar',
  
  // Developer Tools & Infrastructure
  'vercel', 'netlify', 'supabase', 'planetscale', 'neon', 'cockroachlabs', 'sentry', 'postman', 
  'hashicorp', 'pulumi', 'docker', 'flyio', 'render', 'digitalocean', 'auth0', 'cloudera', 'confluent',
  'snowflake', 'datadog', 'fastly', 'gitbook', 'sourcegraph', 'warp', 'linear', 'retool', 'airtable',
  'zapier', 'elastic', 'redis', 'mongodb', 'pinecone', 'weaviate', 'qdrant', 'chromadb', 'snyk',
  'launchdarkly', 'segment', 'amplitude', 'mixpanel', 'heap', 'logrocket', 'timescale',
  'github', 'gitlab', 'bitbucket', 'jfrog', 'sonar', 'circleci', 'harness', 'travis-ci', 'pagerduty',
  'dynatrace', 'newrelic', 'sumologic', 'grafana', 'influxdata', 'scylladb', 'yugabyte', 'singlestore',
  'dbt', 'fivetran', 'airbyte', 'meltano', 'prefect', 'dagster', 'astronomer', 'temporal',
  
  // AI & Machine Learning
  'openai', 'anthropic', 'cohere', 'huggingface', 'assemblyai', 'runway', 'midjourney', 'stabilityai',
  'weightsbiases', 'replicate', 'langchain', 'scaleai', 'cerebras', 'sambanova', 'anyscale', 'octoai',
  'monsterapi', 'togetherai', 'deepinfra', 'baseten', 'modal', 'modal-labs', 'runpod', 'paperspace',
  
  // Collaboration / Productivity / SaaS
  'notion', 'coda', 'figma', 'miro', 'mural', 'pitch', 'webflow', 'framer', 'canva', 'clickup',
  'monday', 'asana', 'zoom', 'slack', 'loom', 'grammarly', 'docusign', 'dropbox', 'box', 'hubspot',
  'activecampaign', 'gong', 'outreach', 'calendly', 'intercom', 'frontapp', 'drift', 'customerio',
  '1password', 'bitwarden', 'dashlane', 'lastpass', 'okta', 'onelogin', 'pingidentity', 'duosecurity',
  'slack', 'teams', 'webex', 'bluejeans', 'around', 'gather', 'tandem', 'remotion', 'descript',
  
  // Web3 / Crypto
  'uniswap', 'opensea', 'consensys', 'yugalabs', 'solana', 'ripple', 'dapperlabs', 'chainlink',
  'arbitrum', 'optimism', 'polygon', 'avax', 'near', 'cosmos', 'polkadot', 'cardano', 'tezos',
  
  // Marketplace / Delivery / Consumer
  'airbnb', 'uber', 'lyft', 'pinterest', 'instacart', 'doordash', 'roblox', 'snapchat', 'reddit',
  'spotify', 'duolingo', 'coursera', 'udemy', 'patreon', 'substack', 'medium', 'discord',
  'grubhub', 'postmates', 'deliveryhero', 'justeat', 'deliveroo', 'zomato', 'swiggy', 'rapido'
];

async function checkGreenhouse(slug) {
  const url = `https://boards-api.greenhouse.io/v1/boards/${slug}/jobs?content=true`;
  try {
    const res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
    return res.status === 200;
  } catch (_) {
    return false;
  }
}

async function checkLever(slug) {
  const url = `https://api.lever.co/v0/postings/${slug}?group=team`;
  try {
    const res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
    return res.status === 200;
  } catch (_) {
    return false;
  }
}

const TIER_1_COMPANIES = new Set([
  'microsoft', 'google', 'apple', 'nvidia', 'openai', 'anthropic', 'stripe', 'databricks', 'snowflake', 'cloudflare', 'meta', 'netflix', 'amazon'
]);

function determinePriorityScore(name) {
  const normName = name.toLowerCase().trim();
  if (TIER_1_COMPANIES.has(normName)) {
    return 100;
  }
  return 60;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  console.log(`Starting discovery of companies... (Dry Run: ${dryRun})`);
  
  const discovered = [];
  const uniqueSlugs = [...new Set(CANDIDATE_SLUGS)];
  
  console.log(`Checking ${uniqueSlugs.length} candidate slugs...`);
  
  // Run checks with concurrent limit to be polite
  const CONCURRENCY_LIMIT = 5;
  for (let i = 0; i < uniqueSlugs.length; i += CONCURRENCY_LIMIT) {
    const batch = uniqueSlugs.slice(i, i + CONCURRENCY_LIMIT);
    await Promise.all(batch.map(async (slug) => {
      // 1. Try Greenhouse
      const isGreenhouse = await checkGreenhouse(slug);
      if (isGreenhouse) {
        const name = slug.charAt(0).toUpperCase() + slug.slice(1);
        const score = determinePriorityScore(name);
        discovered.push({
          name,
          careerPageUrl: `https://boards.greenhouse.io/${slug}`,
          sourceType: 'ATS',
          atsProvider: 'Greenhouse',
          crawlFrequency: score >= 80 ? '1h' : '6h',
          apiEndpoint: `https://boards-api.greenhouse.io/v1/boards/${slug}/jobs?content=true`,
          sourceFingerprint: slug,
          priorityScore: score
        });
        console.log(`  [Found] ${name} (Greenhouse)`);
        return;
      }
      
      // 2. Try Lever
      const isLever = await checkLever(slug);
      if (isLever) {
        const name = slug.charAt(0).toUpperCase() + slug.slice(1);
        const score = determinePriorityScore(name);
        discovered.push({
          name,
          careerPageUrl: `https://jobs.lever.co/${slug}`,
          sourceType: 'ATS',
          atsProvider: 'Lever',
          crawlFrequency: score >= 80 ? '1h' : '6h',
          apiEndpoint: `https://api.lever.co/v0/postings/${slug}?group=team`,
          sourceFingerprint: slug,
          priorityScore: score
        });
        console.log(`  [Found] ${name} (Lever)`);
      }
    }));
    
    // Tiny sleep between batches
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log(`\nDiscovery completed. Found ${discovered.length} valid company boards.`);
  
  if (!dryRun && discovered.length > 0) {
    console.log('Writing to database...');
    let added = 0;
    for (const company of discovered) {
      await prisma.company.upsert({
        where: { name: company.name },
        update: {
          careerPageUrl: company.careerPageUrl,
          sourceType: company.sourceType,
          atsProvider: company.atsProvider,
          crawlFrequency: company.crawlFrequency,
          apiEndpoint: company.apiEndpoint,
          sourceFingerprint: company.sourceFingerprint,
          priorityScore: company.priorityScore
        },
        create: company
      });
      added++;
    }
    console.log(`Successfully wrote ${added} companies to the database.`);
  } else {
    console.log('Skipping database write.');
  }
}

main()
  .catch(err => console.error(err))
  .finally(() => prisma.$disconnect());
