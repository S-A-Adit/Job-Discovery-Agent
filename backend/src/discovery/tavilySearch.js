/**
 * Tavily Search — Career Page Discovery Fallback
 *
 * Uses Tavily's search API to find a company's official career page when
 * deterministic URL probing fails. Runs queries sequentially and stops
 * at the first validated result.
 *
 * Search is ONLY used for discovery. Once a URL is found and cached,
 * Tavily is not called again until the URL goes stale (weekly verification).
 */

const { incrementCredit, askPermission, checkCreditThreshold } = require('../utils/creditTracker');

const THIRD_PARTY_REJECTS = [
  'linkedin.com', 'indeed.com', 'ziprecruiter.com', 'glassdoor.com', 'monster.com',
  'simplyhired.com', 'careerbuilder.com', 'handshake', 'joinhandshake.com',
  'medium.com', 'substack.com', 'youtube.com', 'facebook.com', 'twitter.com',
  'instagram.com', 'crunchbase.com', 'ycombinator.com', 'github.com', 'reddit.com',
  'levels.fyi', 'levels-fyi', 'builtin', 'wellfound.com', 'angel.co', 'upwork.com',
  'fiverr.com', 'toptal.com', 'freelancer.com', 'zipply.com'
];

const ATS_DOMAINS = [
  'greenhouse.io', 'lever.co', 'ashbyhq.com', 'smartrecruiters.com',
  'myworkdayjobs.com', 'icims.com', 'taleo.net', 'jobvite.com',
  'recruitee.com', 'bamboohr.com', 'successfactors.com'
];

/**
 * Scores a candidate URL's likelihood of being an official career page.
 * Returns 0 if the URL is rejected (third-party, blog, etc.).
 *
 * @param {string} urlStr
 * @param {string} domain - The company's root domain (e.g. "figma.com")
 * @returns {number} confidence 0.0–1.0
 */
function getConfidence(urlStr, domain) {
  let parsed;
  try {
    parsed = new URL(urlStr);
  } catch (_) {
    return 0;
  }

  const hostname = parsed.hostname.toLowerCase();
  const path = parsed.pathname.toLowerCase();

  // Reject third-party job boards and blogs
  if (THIRD_PARTY_REJECTS.some(r => hostname.includes(r))) return 0;

  const isAtsDomain = ATS_DOMAINS.some(a => hostname.includes(a));
  if (isAtsDomain) return 0.95;

  if (domain) {
    const isCompanyDomain = hostname === domain || hostname.endsWith(`.${domain}`);
    if (isCompanyDomain) {
      if (path.includes('/careers') || path.includes('/jobs')) return 1.0;
      if (hostname.startsWith('careers.') || hostname.startsWith('jobs.')) return 0.95;
      if (urlStr.toLowerCase().includes('career') || urlStr.toLowerCase().includes('job')) return 0.9;
    }
  } else {
    // If no domain is provided, accept any page containing career/job indicators in the path
    if (path.includes('/careers') || path.includes('/jobs') || path.includes('/career') || path.includes('/job')) {
      return 0.8;
    }
  }

  return 0;
}



/**
 * Searches Tavily with multiple queries and returns the first high-confidence result.
 * Prompts user before search and tracks credit consumption.
 *
 * @param {string} companyName
 * @param {string} domain
 * @returns {Promise<{url: string, confidence: number}|null>}
 */
async function searchCareerPage(companyName, domain) {
  if (!process.env.TAVILY_API_KEY) {
    console.warn('[Tavily] TAVILY_API_KEY not set — skipping search fallback');
    return null;
  }

  // Prompt for permission when entering Phase 4 for this company
  console.log(`\n  [Tavily Alert] Phase 4 (Tavily Search) triggered for "${companyName}".`);
  const allowed = await askPermission(`  Allow Tavily search for this company? (y/n): `);
  if (!allowed) {
    console.log(`  [Tavily] Permission denied. Skipping search.`);
    return null;
  }

  const { tavily } = require('tavily');
  const client = tavily({ apiKey: process.env.TAVILY_API_KEY });

  const queries = [
    `${companyName} careers`,
    `${companyName} jobs`,
    `${companyName} internships`,
    `${companyName} university recruiting`
  ];

  if (domain) {
    queries.push(`site:${domain} careers`);
    queries.push(`site:${domain} jobs`);
  }

  for (const query of queries) {
    // Pause at every 100-credit threshold (shared across all pipelines)
    await checkCreditThreshold();

    console.log(`  [Tavily] Query: "${query}"`);
    try {
      const result = await client.search(query, { maxResults: 5 });
      incrementCredit(query);

      if (!result?.results?.length) continue;

      for (const item of result.results) {
        const confidence = getConfidence(item.url, domain);
        if (confidence > 0) {
          console.log(`  [Tavily] Hit: ${item.url} (Confidence: ${confidence})`);
          return { url: item.url, confidence };
        }
      }
    } catch (err) {
      console.error(`  [Tavily] Query "${query}" failed:`, err.message);
    }
  }

  return null;
}

module.exports = { searchCareerPage, getConfidence };

