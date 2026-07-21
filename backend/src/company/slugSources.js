/**
 * ATS Slug Sources
 *
 * Provides company slug lists for each ATS provider.
 * No web search — uses curated community lists + direct HTTP probes.
 */

// ── Lever ─────────────────────────────────────────────────────────────────────
async function fetchLeverSlugs() {
  console.log('[Lever] Loading curated slug list...');
  return LEVER_SLUGS;
}

// ── Ashby ─────────────────────────────────────────────────────────────────────
async function fetchAshbySlugs() {
  console.log('[Ashby] Loading curated slug list...');
  return ASHBY_SLUGS;
}

// ── Greenhouse ────────────────────────────────────────────────────────────────
async function fetchGreenhouseSlugs() {
  console.log('[Greenhouse] Loading curated slug list...');
  return GREENHOUSE_SLUGS;
}

// ── SmartRecruiters ───────────────────────────────────────────────────────────
async function fetchSmartRecruitersCompanies() {
  console.log('[SmartRecruiters] Loading curated slug list...');
  return SMARTRECRUITERS_COMPANIES;
}

// ── Workday ───────────────────────────────────────────────────────────────────
async function fetchWorkdayTenants() {
  console.log('[Workday] Loading curated tenant list...');
  return WORKDAY_TENANTS;
}

// ─────────────────────────────────────────────────────────────────────────────
// Curated Slug Lists
// ─────────────────────────────────────────────────────────────────────────────

const GREENHOUSE_SLUGS = [
  // Big Tech / Cloud
  'airbnb', 'stripe', 'dropbox', 'lyft', 'twilio', 'cloudflare', 'datadog',
  'hashicorp', 'grafana', 'temporal', 'pulumi', 'mongodb', 'gitlab', 'databricks',
  'confluent', 'snowflake', 'dbtlabs', 'fivetran', 'segment', 'amplitude',
  'mixpanel', 'launchdarkly', 'pagerduty', 'sumologic', 'fastly', 'elastic',
  'newrelic', 'sendgrid', 'algolia', 'contentful', 'stytch', 'replit',
  // Fintech
  'plaid', 'affirm', 'chime', 'robinhood', 'coinbase', 'gemini', 'kraken',
  'ripple', 'marqeta', 'brex', 'ramp', 'mercury', 'modern-treasury',
  // AI / ML
  'scale-ai', 'huggingface', 'weights-biases', 'cohere', 'together-ai',
  'modal-labs', 'replicate', 'runway', 'perplexity-ai',
  // Dev Tools
  'vercel', 'netlify', 'supabase', 'planetscale', 'neon-tech', 'cockroachdb',
  'singlestore', 'timescale', 'questdb', 'influxdata', 'clickhouse',
  // Security
  'crowdstrike', 'sentinelone', 'lacework', 'snyk', 'aquasecurity', 'wiz',
  'orca-security', 'axonius', 'abnormal', 'vectra',
  // Healthcare / Biotech
  'benchling', 'veracyte', 'recursion', 'hims', 'ro', 'tempus',
  // Enterprise SaaS
  'zendesk', 'freshworks', 'intercom', 'figma', 'miro', 'lucidchart', 'notion',
  'airtable', 'monday', 'asana', 'clickup', 'linear', 'shortcut',
  // Growth Stage
  'apptronik', 'northspyre', 'skydio', 'zipline', 'joby', 'archer-aviation', 'relativityspace',
  // HFT / Finance
  'twosigma', 'citadel', 'deshaw', 'hudsonrivertrading', 'imc-trading',
  'jumptrading', 'optiver', 'susquehanna',
  // More
  'sentry', 'retool', 'descript', 'pitch', 'loom', 'mux',
  'posthog', 'hotjar', 'ably', 'pusher', 'sanity', 'hygraph', 'prismic',
  'storyblok', 'directus'
];

const LEVER_SLUGS = [
  // Dev Tools & Infrastructure
  'vercel', 'netlify', 'fly', 'render', 'railway',
  // AI / ML
  'anthropic', 'openai', 'mistral', 'cohere', 'imbue', 'adept', 'inflection',
  'anyscale', 'determined-ai',
  // Fintech
  'plaid', 'ramp', 'brex', 'mercury', 'column', 'unit', 'moov',
  'modern-treasury', 'increase', 'marqeta', 'lithic',
  // Health / BioTech
  'benchling', 'ginkgo', 'insitro', 'recursion', 'hinge-health', 'brightline',
  'cerebral', 'headspace', 'calm', 'noom', 'ro', 'hims',
  // Enterprise SaaS
  'lattice', 'rippling', 'gusto', 'deel', 'remote', 'papaya-global',
  // Security
  'snyk', 'lacework', 'wiz', 'orca-security', 'abnormalsecurity',
  'drata', 'vanta', 'secureframe',
  // Growth Startups
  'figma', 'canva', 'framer', 'webflow', 'bubble',
  'airtable', 'coda', 'notion', 'fibery',
  // Media / Consumer
  'discord', 'reddit', 'pinterest',
  // Hardware / Mobility
  'tesla', 'rivian', 'aurora', 'waymo', 'nuro',
  // More
  'samsara', 'opendoor', 'homelight'
];

const ASHBY_SLUGS = [
  // Known Ashby Customers (YC / Growth Stage)
  'linear', 'sentry', 'loom', 'pitch', 'raycast', 'clerk', 'resend',
  'cal', 'novu', 'lago', 'dub', 'boxyhq', 'tooljet',
  'airbyte', 'meltano', 'prefect', 'dagster', 'astronomer', 'rudderstack',
  'hightouch', 'census',
  // AI / Inference
  'browserbase', 'dify', 'runpod', 'e2b', 'replicate',
  'fal', 'baseten', 'bentoml',
  // Dev Tooling
  'warp', 'zed', 'gitbutler', 'graphite', 'mintlify',
  // Data
  'tinybird', 'turso', 'neon', 'convex', 'edgedb', 'materialize',
  // Infrastructure
  'railway', 'render', 'northflank', 'encore', 'pulumi', 'porter',
  // Fintech
  'increase', 'column', 'moov', 'unit', 'lithic', 'modern-treasury'
];

const WORKDAY_TENANTS = [
  { slug: 'adobe', name: 'Adobe' },
  { slug: 'salesforce', name: 'Salesforce' },
  { slug: 'servicenow', name: 'ServiceNow' },
  { slug: 'workday', name: 'Workday' },
  { slug: 'oracle', name: 'Oracle' },
  { slug: 'sap', name: 'SAP' },
  { slug: 'cisco', name: 'Cisco' },
  { slug: 'intel', name: 'Intel' },
  { slug: 'qualcomm', name: 'Qualcomm' },
  { slug: 'hp', name: 'HP' },
  { slug: 'hpe', name: 'Hewlett Packard Enterprise' },
  { slug: 'accenture', name: 'Accenture' },
  { slug: 'deloitte', name: 'Deloitte' },
  { slug: 'ey', name: 'Ernst & Young' },
  { slug: 'pwc', name: 'PricewaterhouseCoopers' },
  { slug: 'kpmg', name: 'KPMG' },
  { slug: 'mckinsey', name: 'McKinsey & Company' },
  { slug: 'bcg', name: 'Boston Consulting Group' },
  { slug: 'bain', name: 'Bain & Company' },
  { slug: 'ibm', name: 'IBM' },
  { slug: 'ge', name: 'General Electric' },
  { slug: 'honeywell', name: 'Honeywell' },
  { slug: 'boeing', name: 'Boeing' },
  { slug: 'lockheedmartin', name: 'Lockheed Martin' },
  { slug: 'raytheon', name: 'Raytheon' },
  { slug: 'northropgrumman', name: 'Northrop Grumman' },
  { slug: 'generaldynamics', name: 'General Dynamics' },
  { slug: 'att', name: 'AT&T' },
  { slug: 'verizon', name: 'Verizon' },
  { slug: 'tmobile', name: 'T-Mobile' },
  { slug: 'comcast', name: 'Comcast' },
  { slug: 'jpmorgan', name: 'JPMorgan Chase' },
  { slug: 'bankofamerica', name: 'Bank of America' },
  { slug: 'wellsfargo', name: 'Wells Fargo' },
  { slug: 'goldmansachs', name: 'Goldman Sachs' },
  { slug: 'morganstanley', name: 'Morgan Stanley' },
  { slug: 'blackrock', name: 'BlackRock' },
  { slug: 'fidelity', name: 'Fidelity' },
  { slug: 'schwab', name: 'Charles Schwab' },
  { slug: 'kbr', name: 'KBR' },
  { slug: 'icf', name: 'ICF' },
  { slug: 'leidos', name: 'Leidos' },
  { slug: 'saic', name: 'SAIC' },
  { slug: 'booz', name: 'Booz Allen Hamilton' }
];

const SMARTRECRUITERS_COMPANIES = [
  { name: 'Visa', slug: 'Visa' },
  { name: 'Bosch', slug: 'BoschGroup' },
  { name: 'LinkedIn', slug: 'LinkedIn' },
  { name: 'IKEA', slug: 'IKEA' },
  { name: 'Equinix', slug: 'Equinix' },
  { name: 'Rapid7', slug: 'Rapid7' },
  { name: 'ChargePoint', slug: 'ChargePoint' },
  { name: 'DigitalOcean', slug: 'DigitalOcean' },
  { name: 'Zuora', slug: 'Zuora' },
  { name: 'Okta', slug: 'Okta' },
  { name: 'Procore', slug: 'Procore' },
  { name: 'Outreach', slug: 'Outreach' },
  { name: 'Seismic', slug: 'Seismic' },
  { name: 'Sprinklr', slug: 'Sprinklr' },
  { name: 'Yotpo', slug: 'Yotpo' },
  { name: 'Gainsight', slug: 'Gainsight' },
  { name: 'UserTesting', slug: 'UserTesting' }
];

module.exports = {
  fetchLeverSlugs,
  fetchAshbySlugs,
  fetchGreenhouseSlugs,
  fetchSmartRecruitersCompanies,
  fetchWorkdayTenants
};
