const cheerio = require('cheerio');
const { fetchJson, launchBrowser } = require('./helpers');

async function fetchOracleJobs(companySlug, careerPageUrl, apiEndpoint) {
  if (apiEndpoint) {
    try {
      console.log(`[Oracle] Trying direct JSON endpoint: ${apiEndpoint}`);
      const data = await fetchJson(apiEndpoint);
      if (data?.requisitionList) {
        return data.requisitionList.map(job => ({
          jobId: String(job.Id || job.requisitionId || job.id),
          title: job.Title || job.title || 'Job Opening',
          location: job.PrimaryLocation || job.primaryLocation || 'Remote',
          employmentType: job.JobType || job.jobType || 'Full-time',
          postedTimestamp: job.PostedDate ? new Date(job.PostedDate) : null,
          description: job.ShortDescription || job.shortDescription || '',
          url: job.ExternalURL || apiEndpoint,
          source: 'Oracle Jobs'
        }));
      }
      if (data?.requisitions) {
        return data.requisitions.map(job => ({
          jobId: String(job.reqId || job.id),
          title: job.title || 'Job Opening',
          location: job.location || 'Remote',
          employmentType: job.employmentType || 'Full-time',
          postedTimestamp: job.postingDate ? new Date(job.postingDate) : null,
          description: job.description || '',
          url: job.jobUrl || careerPageUrl,
          source: 'Oracle Jobs'
        }));
      }
    } catch (e) {
      console.warn(`[Oracle] Direct endpoint failed: ${e.message}`);
    }
  }

  const targetUrl = careerPageUrl;
  console.log(`[Oracle] Loading via Puppeteer: ${targetUrl}`);
  let browser;
  const capturedJobs = [];

  try {
    browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

    page.on('response', async (response) => {
      const url = response.url();
      const contentType = response.headers()['content-type'] || '';
      if (
        contentType.includes('application/json') &&
        (url.includes('oracle') || url.includes('taleo') || url.includes('requisition') || url.includes('/jobs'))
      ) {
        try {
          const json = await response.json();
          const items = json?.requisitionList || json?.requisitions || json?.jobs || (Array.isArray(json) ? json : null);
          if (items?.length > 0) {
            for (const item of items) {
              capturedJobs.push({
                jobId: String(item.Id || item.reqId || item.id || Math.random()),
                title: item.Title || item.title || 'Job Opening',
                location: item.PrimaryLocation || item.location || 'Remote',
                employmentType: item.JobType || item.employmentType || 'Full-time',
                postedTimestamp: (item.PostedDate || item.postingDate) ? new Date(item.PostedDate || item.postingDate) : null,
                description: item.ShortDescription || item.description || '',
                url: item.ExternalURL || item.jobUrl || targetUrl,
                source: 'Oracle Jobs'
              });
            }
          }
        } catch (_) {}
      }
    });

    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 35000 });
    if (capturedJobs.length > 0) {
      console.log(`[Oracle] Captured ${capturedJobs.length} jobs via XHR`);
      return capturedJobs;
    }

    const html = await page.content();
    const $ = cheerio.load(html);
    let embeddedJobs = [];

    $('script').each((_, el) => {
      const content = $(el).html() || '';
      if (content.includes('"@type":"JobPosting"') || content.includes('"@type": "JobPosting"')) {
        try {
          const parsed = JSON.parse(content.trim());
          const items = Array.isArray(parsed) ? parsed : [parsed];
          items.filter(i => i['@type'] === 'JobPosting').forEach(job => {
            embeddedJobs.push({
              jobId: String(job.identifier?.value || job.name || Math.random()),
              title: job.title || job.name || 'Job Opening',
              location: job.jobLocation?.address?.addressLocality || 'Remote',
              employmentType: job.employmentType || 'Full-time',
              postedTimestamp: job.datePosted ? new Date(job.datePosted) : null,
              description: (job.description || '').substring(0, 500),
              url: job.url || targetUrl,
              source: 'Oracle Jobs'
            });
          });
        } catch (_) {}
      }
    });

    if (embeddedJobs.length > 0) return embeddedJobs;

    const linkJobs = [];
    const seen = new Set();
    $('a').each((_, el) => {
      const href = $(el).attr('href') || '';
      const text = $(el).text().trim();
      const isJobLink = href && (
        href.includes('/job/') || href.includes('/jobs/') || href.includes('/careers/') ||
        href.includes('/requisition') || href.includes('taleo') || href.includes('oracle')
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
            source: 'Oracle Jobs'
          });
        }
      }
    });

    return linkJobs;
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { fetchOracleJobs };
