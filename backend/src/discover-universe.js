const { PrismaClient } = require('./generated/client');
const prisma = new PrismaClient();

const FORTUNE_500_TECH = [
  { name: 'Microsoft', website: 'https://www.microsoft.com', industry: 'Technology', country: 'USA' },
  { name: 'Google', website: 'https://www.google.com', industry: 'Technology', country: 'USA' },
  { name: 'Nvidia', website: 'https://www.nvidia.com', industry: 'Technology', country: 'USA' },
  { name: 'Cisco', website: 'https://www.cisco.com', industry: 'Technology', country: 'USA' },
  { name: 'Oracle', website: 'https://www.oracle.com', industry: 'Technology', country: 'USA' },
  { name: 'AMD', website: 'https://www.amd.com', industry: 'Technology', country: 'USA' },
  { name: 'Intel', website: 'https://www.intel.com', industry: 'Technology', country: 'USA' },
  { name: 'Apple', website: 'https://www.apple.com', industry: 'Technology', country: 'USA' },
  { name: 'Salesforce', website: 'https://www.salesforce.com', industry: 'Technology', country: 'USA' }
];

const NASDAQ_100 = [
  { name: 'Adobe', website: 'https://www.adobe.com', industry: 'Software', country: 'USA' },
  { name: 'Amazon', website: 'https://www.amazon.com', industry: 'E-commerce', country: 'USA' },
  { name: 'Netflix', website: 'https://www.netflix.com', industry: 'Entertainment', country: 'USA' },
  { name: 'Meta', website: 'https://www.meta.com', industry: 'Social Media', country: 'USA' },
  { name: 'Broadcom', website: 'https://www.broadcom.com', industry: 'Semiconductors', country: 'USA' },
  { name: 'Tesla', website: 'https://www.tesla.com', industry: 'Automotive', country: 'USA' },
  { name: 'Qualcomm', website: 'https://www.qualcomm.com', industry: 'Semiconductors', country: 'USA' },
  { name: 'Intuit', website: 'https://www.intuit.com', industry: 'Finance/Software', country: 'USA' },
  { name: 'Honeywell', website: 'https://www.honeywell.com', industry: 'Industrial', country: 'USA' }
];

const SP_500 = [
  { name: 'Accenture', website: 'https://www.accenture.com', industry: 'Consulting', country: 'Ireland' },
  { name: 'JPMorgan Chase', website: 'https://www.jpmorganchase.com', industry: 'Finance', country: 'USA' },
  { name: 'Bank of America', website: 'https://www.bankofamerica.com', industry: 'Finance', country: 'USA' },
  { name: 'Goldman Sachs', website: 'https://www.goldmansachs.com', industry: 'Finance', country: 'USA' },
  { name: 'Morgan Stanley', website: 'https://www.morganstanley.com', industry: 'Finance', country: 'USA' },
  { name: 'Boeing', website: 'https://www.boeing.com', industry: 'Aerospace', country: 'USA' },
  { name: 'General Electric', website: 'https://www.ge.com', industry: 'Industrial', country: 'USA' }
];

const YC_COMPANIES = [
  { name: 'Stripe', website: 'https://www.stripe.com', industry: 'Fintech', country: 'USA' },
  { name: 'Airbnb', website: 'https://www.airbnb.com', industry: 'Hospitality', country: 'USA' },
  { name: 'Dropbox', website: 'https://www.dropbox.com', industry: 'Cloud Storage', country: 'USA' },
  { name: 'Reddit', website: 'https://www.reddit.com', industry: 'Social Media', country: 'USA' },
  { name: 'Coinbase', website: 'https://www.coinbase.com', industry: 'Crypto', country: 'USA' },
  { name: 'OpenAI', website: 'https://www.openai.com', industry: 'Artificial Intelligence', country: 'USA' },
  { name: 'Anthropic', website: 'https://www.anthropic.com', industry: 'Artificial Intelligence', country: 'USA' },
  { name: 'Cohere', website: 'https://www.cohere.com', industry: 'Artificial Intelligence', country: 'Canada' },
  { name: 'Hugging Face', website: 'https://huggingface.co', industry: 'Artificial Intelligence', country: 'USA' },
  { name: 'Scale AI', website: 'https://scale.com', industry: 'Artificial Intelligence', country: 'USA' },
  { name: 'Vercel', website: 'https://vercel.com', industry: 'Developer Tools', country: 'USA' },
  { name: 'Supabase', website: 'https://supabase.com', industry: 'Developer Tools', country: 'Singapore' }
];

async function fetchGistCompanies() {
  const gistUrl = 'https://gist.githubusercontent.com/surabhigr/79fb8a971ba3c47ac0b9/raw/';
  try {
    const res = await fetch(gistUrl);
    if (!res.ok) return [];
    const text = await res.text();
    const lines = text.split('\n');
    const gistCompanies = [];

    for (const line of lines) {
      const cleanLine = line.trim();
      if (cleanLine.startsWith('http://') || cleanLine.startsWith('https://')) {
        try {
          const urlObj = new URL(cleanLine.split(' ')[0]);
          let host = urlObj.hostname.replace('www.', '');
          const dotIndex = host.indexOf('.');
          const name = host.substring(0, dotIndex).charAt(0).toUpperCase() + host.substring(0, dotIndex).slice(1);
          if (name && name.length > 2) {
            gistCompanies.push({
              name,
              website: `https://${host}`,
              careerPageUrl: cleanLine.split(' ')[0],
              industry: 'Tech',
              country: 'USA'
            });
          }
        } catch (_) {}
      }
    }
    return gistCompanies;
  } catch (err) {
    console.error('Failed to fetch/parse Gist:', err.message);
    return [];
  }
}

const TIER_1_COMPANIES = new Set([
  'microsoft', 'google', 'apple', 'nvidia', 'openai', 'anthropic', 'stripe', 'databricks', 'snowflake', 'cloudflare', 'meta', 'netflix', 'amazon'
]);

function determinePriorityScore(name, sourceName) {
  const normName = name.toLowerCase().trim();
  if (TIER_1_COMPANIES.has(normName)) {
    return 100;
  }
  
  if (sourceName === 'Fortune 500 Tech' || sourceName === 'NASDAQ-100') {
    return 80;
  }
  if (sourceName === 'YC Companies' || sourceName === 'S&P 500') {
    return 60;
  }
  if (sourceName === 'GitHub Gist') {
    return 40;
  }
  return 20;
}

async function main() {
  console.log('Building Company Universe...');

  const allSources = [
    { name: 'Fortune 500 Tech', items: FORTUNE_500_TECH },
    { name: 'NASDAQ-100', items: NASDAQ_100 },
    { name: 'S&P 500', items: SP_500 },
    { name: 'YC Companies', items: YC_COMPANIES }
  ];

  const gistItems = await fetchGistCompanies();
  if (gistItems.length > 0) {
    allSources.push({ name: 'GitHub Gist', items: gistItems });
    console.log(`Fetched ${gistItems.length} companies from Gist`);
  }

  let upsertedCount = 0;
  const uniqueNames = new Set();

  for (const source of allSources) {
    for (const item of source.items) {
      const canonicalName = item.name.trim();
      if (uniqueNames.has(canonicalName.toLowerCase())) continue;
      uniqueNames.add(canonicalName.toLowerCase());

      const careerPageUrl = item.careerPageUrl || `${item.website}/careers`;
      const score = determinePriorityScore(canonicalName, source.name);
      
      const company = await prisma.company.upsert({
        where: { name: canonicalName },
        update: {
          website: item.website,
          industry: item.industry,
          country: item.country,
          status: 'ACTIVE',
          priorityScore: score
        },
        create: {
          name: canonicalName,
          website: item.website,
          careerPageUrl: careerPageUrl,
          sourceType: 'Career Site',
          crawlFrequency: score >= 80 ? '1h' : '6h',
          industry: item.industry,
          country: item.country,
          status: 'ACTIVE',
          priorityScore: score
        }
      });

      const existingSource = await prisma.companySource.findFirst({
        where: { companyId: company.id, sourceName: source.name }
      });
      if (!existingSource) {
        await prisma.companySource.create({
          data: {
            companyId: company.id,
            sourceName: source.name
          }
        });
      }

      upsertedCount++;
    }
  }

  console.log(`Company Universe built successfully. Total unique companies tracked: ${upsertedCount}`);
}

main()
  .catch(err => console.error(err))
  .finally(() => prisma.$disconnect());
