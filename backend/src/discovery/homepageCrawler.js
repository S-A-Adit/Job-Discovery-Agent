/**
 * Homepage Crawler
 * Fetches the company homepage and extracts any links that lead to career pages.
 */

const cheerio = require('cheerio');

const CAREER_LINK_KEYWORDS = [
  'career', 'job', 'work with us', 'join us', 'join',
  'students', 'internships', 'university', 'hiring', 'openings'
];

/**
 * Fetches the homepage of `website` and returns the first career-related link found,
 * or null if none is detected.
 *
 * @param {string} website - The base URL of the company website (no trailing slash)
 * @returns {Promise<string|null>} - Resolved career page URL or null
 */
async function crawlHomepageForCareerLink(website) {
  try {
    const res = await fetch(website, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JobDiscoveryBot/1.0)' },
      signal: AbortSignal.timeout(10000)
    });
    if (!res.ok) return null;

    const html = await res.text();
    const $ = cheerio.load(html);
    let foundUrl = null;

    $('a').each((_, el) => {
      const href = $(el).attr('href') || '';
      const linkText = $(el).text().toLowerCase().trim();

      const matchesKeyword = CAREER_LINK_KEYWORDS.some(kw => linkText.includes(kw));

      if (href && matchesKeyword) {
        try {
          foundUrl = new URL(href, website).toString();
        } catch (_) {
          foundUrl = `${website}${href.startsWith('/') ? '' : '/'}${href}`;
        }
        return false; // Break cheerio loop
      }
    });

    return foundUrl;
  } catch (_) {
    return null;
  }
}

module.exports = { crawlHomepageForCareerLink };
