const cheerio = require('cheerio');
const { launchBrowser } = require('./helpers');

async function fetchFallback(url) {
  console.log(`[Fallback] Scraping job links via Puppeteer from ${url}`);
  let browser;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    const html = await page.content();
    const $ = cheerio.load(html);
    const jobs = [];

    $('a').each((_, el) => {
      const link = $(el).attr('href');
      const text = $(el).text().trim();
      const isJobLink = link && (
        link.includes('/job/') || link.includes('/jobs/') ||
        link.includes('/careers/') || link.includes('/posting/') || link.includes('careers.')
      );
      if (isJobLink && text.length > 5 && text.length < 100) {
        let fullUrl = link;
        try { fullUrl = new URL(link, url).toString(); } catch (_) {}
        jobs.push({
          jobId: Buffer.from(fullUrl).toString('base64').substring(0, 16),
          title: text,
          location: 'See Job Page',
          employmentType: 'Full-time',
          postedTimestamp: new Date(),
          description: text,
          url: fullUrl,
          source: 'Fallback Scraper'
        });
      }
    });

    const seen = new Set();
    return jobs.filter(job => {
      if (seen.has(job.url)) return false;
      seen.add(job.url);
      return true;
    });
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { fetchFallback };
