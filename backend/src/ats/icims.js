const cheerio = require('cheerio');
const { launchBrowser } = require('./helpers');

async function fetchICIMS(companySlug, careerPageUrl, apiEndpoint) {
  const targetUrl = apiEndpoint || careerPageUrl;
  console.log(`[iCIMS] Loading page with Puppeteer: ${targetUrl}`);

  let browser;
  const capturedJobs = [];

  try {
    browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    page.on('response', async (response) => {
      const url = response.url();
      const contentType = response.headers()['content-type'] || '';
      if (
        contentType.includes('application/json') &&
        (url.includes('/jobs') || url.includes('/postings') || url.includes('/search') || url.includes('icims'))
      ) {
        try {
          const json = await response.json();
          const items = json?.searchResults || json?.jobs || json?.items || (Array.isArray(json) ? json : null);
          if (items?.length > 0) {
            for (const item of items) {
              const title = item.jobtitle || item.title || item.name || 'Job Opening';
              const jobId = item.id || item.jobId || item.req_id || Buffer.from(title).toString('base64').substring(0, 12);
              capturedJobs.push({
                jobId: String(jobId),
                title,
                location: item.joblocation || item.location || 'See Job Page',
                employmentType: item.joblevel || item.type || 'Full-time',
                postedTimestamp: item.posted_date ? new Date(item.posted_date) : null,
                description: item.jobdescription || item.description || '',
                url: item.url || item.jobUrl || targetUrl,
                source: 'iCIMS'
              });
            }
          }
        } catch (_) {}
      }
    });

    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    if (capturedJobs.length > 0) {
      console.log(`[iCIMS] Captured ${capturedJobs.length} jobs from XHR`);
      return capturedJobs;
    }

    console.log('[iCIMS] No XHR jobs captured, falling back to link scraping');
    const html = await page.content();
    const $ = cheerio.load(html);
    const linkJobs = [];
    const seen = new Set();

    $('a').each((_, el) => {
      const href = $(el).attr('href') || '';
      const text = $(el).text().trim();
      const isJobLink = href && (
        href.includes('/job/') || href.includes('/jobs/') ||
        href.includes('/careers/') || href.includes('/icims') || href.includes('/posting/')
      );
      if (isJobLink && text.length > 5 && text.length < 120) {
        let fullUrl = href;
        try { fullUrl = new URL(href, targetUrl).toString(); } catch (_) {}
        if (!seen.has(fullUrl)) {
          seen.add(fullUrl);
          linkJobs.push({
            jobId: Buffer.from(fullUrl).toString('base64').substring(0, 16),
            title: text,
            location: 'See Job Page',
            employmentType: 'Full-time',
            postedTimestamp: null,
            description: text,
            url: fullUrl,
            source: 'iCIMS'
          });
        }
      }
    });

    return linkJobs;
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { fetchICIMS };
