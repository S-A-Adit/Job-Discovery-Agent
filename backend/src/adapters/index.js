const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

// Helper to fetch JSON from API endpoint
async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// Helper to launch a Puppeteer browser with safe defaults
async function launchBrowser() {
  return puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
}

/**
 * Greenhouse API Adapter
 */
async function fetchGreenhouse(companySlug, apiEndpoint) {
  const url = apiEndpoint || `https://boards-api.greenhouse.io/v1/boards/${companySlug}/jobs?content=true`;
  console.log(`[Adapter - Greenhouse] Fetching jobs from ${url}`);
  const data = await fetchJson(url);

  if (!data || !data.jobs) {
    throw new Error('Invalid Greenhouse response structure');
  }

  return data.jobs.map(job => ({
    jobId: job.id.toString(),
    title: job.title,
    location: job.location ? job.location.name : 'Remote',
    employmentType: job.departments && job.departments.length > 0 ? job.departments[0].name : 'Full-time',
    postedTimestamp: job.updated_at ? new Date(job.updated_at) : null,
    description: job.content || '',
    url: job.absolute_url,
    source: 'Greenhouse'
  }));
}

/**
 * Lever API Adapter
 */
async function fetchLever(companySlug, apiEndpoint) {
  const url = apiEndpoint || `https://api.lever.co/v0/postings/${companySlug}?group=team`;
  console.log(`[Adapter - Lever] Fetching jobs from ${url}`);
  const data = await fetchJson(url);

  if (!Array.isArray(data)) {
    if (data && Array.isArray(data.postings)) {
      return normalizeLeverJobs(data.postings);
    }
    throw new Error('Invalid Lever response structure');
  }

  // Handle Lever nested team structure if grouped
  const postings = [];
  data.forEach(group => {
    if (group.postings) {
      postings.push(...group.postings);
    } else if (group.id) {
      postings.push(group);
    }
  });

  return normalizeLeverJobs(postings);
}

function normalizeLeverJobs(postings) {
  return postings.map(job => ({
    jobId: job.id,
    title: job.text,
    location: job.categories ? job.categories.location : 'Remote',
    employmentType: job.categories ? job.categories.commitment : 'Full-time',
    postedTimestamp: job.createdAt ? new Date(job.createdAt) : null,
    description: job.descriptionHtml || job.description || '',
    url: job.hostedUrl,
    source: 'Lever'
  }));
}

/**
 * Ashby API Adapter
 */
async function fetchAshby(companySlug, apiEndpoint) {
  const url = apiEndpoint || `https://api.ashbyhq.com/draft/public-api/job-board/${companySlug}`;
  console.log(`[Adapter - Ashby] Fetching jobs from ${url}`);
  const data = await fetchJson(url);

  if (!data || !data.jobs) {
    throw new Error('Invalid Ashby response structure');
  }

  return data.jobs.map(job => ({
    jobId: job.id,
    title: job.title,
    location: job.location || 'Remote',
    employmentType: job.employmentType || 'Full-time',
    postedTimestamp: job.publishedAt ? new Date(job.publishedAt) : null,
    description: job.descriptionHtml || job.description || '',
    url: job.jobUrl,
    source: 'Ashby'
  }));
}

/**
 * Workday Adapter with Pagination
 * Supports: POST JSON endpoints exposed by company Workday instances.
 * Pages through results using offset until exhausted or safety cap reached.
 */
async function fetchWorkday(companySlug, apiEndpoint) {
  if (!apiEndpoint) {
    throw new Error('Workday requires an explicit apiEndpoint configured in the company registry');
  }

  console.log(`[Adapter - Workday] Fetching jobs from ${apiEndpoint}`);

  const PAGE_SIZE = 50;
  const MAX_PAGES = 10; // Safety cap: 500 jobs max per crawl
  const allJobs = [];
  let offset = 0;
  let totalFetched = 0;

  for (let page = 0; page < MAX_PAGES; page++) {
    const data = await fetchJson(apiEndpoint, {
      method: 'POST',
      body: JSON.stringify({
        appliedFacets: {},
        limit: PAGE_SIZE,
        offset,
        searchText: ''
      })
    });

    if (!data || !Array.isArray(data.jobPostings)) {
      if (page === 0) throw new Error('Invalid Workday response structure');
      break; // No more pages
    }

    if (data.jobPostings.length === 0) break;

    const origin = new URL(apiEndpoint).origin;

    for (const job of data.jobPostings) {
      const relativeUrl = job.externalPath || '';
      const jobUrl = relativeUrl.startsWith('http') ? relativeUrl : `${origin}${relativeUrl}`;
      const idMatch = relativeUrl.match(/_([A-Za-z0-9\-]+)$/);
      const jobId = idMatch ? idMatch[1] : job.bulletFields?.[2] || relativeUrl || job.title;

      allJobs.push({
        jobId,
        title: job.title,
        location: job.locationsText || job.bulletFields?.[0] || 'Remote',
        employmentType: job.timeType || job.bulletFields?.[1] || 'Full-time',
        postedTimestamp: job.postedDate ? new Date(job.postedDate) : null,
        description: job.title,
        url: jobUrl,
        source: 'Workday'
      });
    }

    totalFetched += data.jobPostings.length;
    console.log(`[Adapter - Workday] Page ${page + 1}: fetched ${data.jobPostings.length} jobs (total: ${totalFetched})`);

    // Check if we've reached the end
    const totalAvailable = data.total || 0;
    if (totalFetched >= totalAvailable || data.jobPostings.length < PAGE_SIZE) break;

    offset += PAGE_SIZE;
  }

  console.log(`[Adapter - Workday] Finished: ${allJobs.length} total jobs fetched from ${apiEndpoint}`);
  return allJobs;
}

/**
 * Google Careers Adapter (Search API)
 */
async function fetchGoogleCareers(companySlug, apiEndpoint) {
  const url = apiEndpoint || `https://careers.google.com/api/v1/jobs/search/?q=&company=Google`;
  console.log(`[Adapter - Google Careers] Fetching jobs from ${url}`);
  const data = await fetchJson(url);

  if (!data || !Array.isArray(data.jobs)) {
    throw new Error('Invalid Google Careers response structure');
  }

  return data.jobs.map(job => {
    const rawId = job.id || '';
    const jobId = rawId.replace('jobs/', '');

    return {
      jobId,
      title: job.title,
      location: job.locations && job.locations.length > 0
        ? job.locations.map(l => l.display).join(', ')
        : 'Remote',
      employmentType: 'Full-time',
      postedTimestamp: job.created ? new Date(job.created) : null,
      description: job.description || '',
      url: `https://careers.google.com/jobs/results/${jobId}/`,
      source: 'Google Careers'
    };
  });
}

/**
 * SmartRecruiters Adapter
 * Public API: https://api.smartrecruiters.com/v1/companies/{slug}/postings
 */
async function fetchSmartRecruiters(companySlug, apiEndpoint) {
  const url = apiEndpoint || `https://api.smartrecruiters.com/v1/companies/${companySlug}/postings?limit=100`;
  console.log(`[Adapter - SmartRecruiters] Fetching jobs from ${url}`);
  const data = await fetchJson(url, {
    headers: {
      'Accept': 'application/json'
    }
  });

  // SmartRecruiters returns { content: [...], totalFound: N }
  if (!data || !Array.isArray(data.content)) {
    throw new Error('Invalid SmartRecruiters response structure');
  }

  return data.content.map(job => {
    const location = job.location
      ? [job.location.city, job.location.region, job.location.country].filter(Boolean).join(', ')
      : 'Remote';

    return {
      jobId: job.id,
      title: job.name,
      location: location || 'Remote',
      employmentType: job.typeOfEmployment?.label || 'Full-time',
      postedTimestamp: job.releasedDate ? new Date(job.releasedDate) : null,
      description: job.customField?.find(f => f.fieldLabel === 'Description')?.valueLabel || '',
      url: `https://careers.smartrecruiters.com/${companySlug}/${job.id}`,
      source: 'SmartRecruiters'
    };
  });
}

/**
 * iCIMS Adapter
 * iCIMS does not expose a universal public API. Strategy:
 * 1. Use Puppeteer to load the career page.
 * 2. Intercept XHR/fetch responses for JSON job data.
 * 3. If no structured data found, fall back to link scraping via Cheerio.
 */
async function fetchICIMS(companySlug, careerPageUrl, apiEndpoint) {
  const targetUrl = apiEndpoint || careerPageUrl;
  console.log(`[Adapter - iCIMS] Loading page with Puppeteer: ${targetUrl}`);

  let browser;
  const capturedJobs = [];

  try {
    browser = await launchBrowser();
    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    // Intercept API responses that look like iCIMS job listings
    page.on('response', async (response) => {
      const url = response.url();
      const contentType = response.headers()['content-type'] || '';

      // iCIMS job feeds typically go through paths like /iims/... or return application/json
      if (
        contentType.includes('application/json') &&
        (url.includes('/jobs') || url.includes('/postings') || url.includes('/search') || url.includes('icims'))
      ) {
        try {
          const json = await response.json();
          // iCIMS JSON typically has a searchResults or jobs array
          const items = json?.searchResults || json?.jobs || json?.items || (Array.isArray(json) ? json : null);
          if (items && items.length > 0) {
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
        } catch (_) {
          // Non-JSON or parsing error — skip
        }
      }
    });

    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    // If XHR capture found jobs, return them
    if (capturedJobs.length > 0) {
      console.log(`[Adapter - iCIMS] Captured ${capturedJobs.length} jobs from XHR interception`);
      return capturedJobs;
    }

    // Fallback: scrape HTML for job links
    console.log('[Adapter - iCIMS] No XHR jobs captured, falling back to link scraping');
    const html = await page.content();
    const $ = cheerio.load(html);
    const linkJobs = [];
    const seen = new Set();

    $('a').each((_, el) => {
      const href = $(el).attr('href') || '';
      const text = $(el).text().trim();
      const isJobLink = href && (
        href.includes('/job/') ||
        href.includes('/jobs/') ||
        href.includes('/careers/') ||
        href.includes('/icims') ||
        href.includes('/posting/')
      );

      if (isJobLink && text.length > 5 && text.length < 120) {
        let fullUrl = href;
        try { fullUrl = new URL(href, targetUrl).toString(); } catch (_) {}
        if (!seen.has(fullUrl)) {
          seen.add(fullUrl);
          const parsedId = Buffer.from(fullUrl).toString('base64').substring(0, 16);
          linkJobs.push({
            jobId: parsedId,
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

/**
 * Oracle Jobs Adapter (Oracle Recruiting Cloud + Taleo)
 *
 * Strategy:
 * 1. Try direct JSON endpoint if provided (Oracle Recruiting Cloud exposes REST APIs)
 * 2. If not, use Puppeteer to load the page and intercept XHR responses
 * 3. Try to find embedded JSON in <script> tags (common in Taleo)
 * 4. Fallback to link scraping
 *
 * Both Oracle Recruiting Cloud and Taleo formats are handled internally.
 */
async function fetchOracleJobs(companySlug, careerPageUrl, apiEndpoint) {
  // If a direct JSON endpoint is given, try it first
  if (apiEndpoint) {
    try {
      console.log(`[Adapter - Oracle] Trying direct JSON endpoint: ${apiEndpoint}`);
      const data = await fetchJson(apiEndpoint);

      // Oracle Recruiting Cloud format
      if (data && Array.isArray(data.requisitionList)) {
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

      // Taleo format (older Oracle ATS)
      if (data && Array.isArray(data.requisitions)) {
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
      console.warn(`[Adapter - Oracle] Direct endpoint failed (${e.message}), falling back to browser`);
    }
  }

  // Browser-based approach: Puppeteer XHR interception + embedded JSON detection
  const targetUrl = careerPageUrl;
  console.log(`[Adapter - Oracle] Loading career page via Puppeteer: ${targetUrl}`);
  let browser;
  const capturedJobs = [];

  try {
    browser = await launchBrowser();
    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    // Intercept API calls from Oracle/Taleo pages
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
          if (items && items.length > 0) {
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
      console.log(`[Adapter - Oracle] Captured ${capturedJobs.length} jobs via XHR interception`);
      return capturedJobs;
    }

    // Try to extract embedded JSON-LD or application state from script tags
    const html = await page.content();
    const $ = cheerio.load(html);
    let embeddedJobs = [];

    $('script').each((_, el) => {
      const content = $(el).html() || '';
      // Look for JSON-LD job postings
      if (content.includes('"@type":"JobPosting"') || content.includes('"@type": "JobPosting"')) {
        try {
          const jsonStr = content.trim();
          const parsed = JSON.parse(jsonStr);
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

    if (embeddedJobs.length > 0) {
      console.log(`[Adapter - Oracle] Extracted ${embeddedJobs.length} jobs from embedded JSON-LD`);
      return embeddedJobs;
    }

    // Final fallback: link scraping
    console.log('[Adapter - Oracle] Falling back to link scraping');
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

/**
 * Generic Fallback Adapter using Puppeteer + Cheerio
 */
async function fetchFallback(url) {
  console.log(`[Adapter - Fallback] Fetching jobs from ${url} using Puppeteer`);
  let browser;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    const html = await page.content();
    const $ = cheerio.load(html);
    const jobs = [];

    $('a').each((_, el) => {
      const link = $(el).attr('href');
      const text = $(el).text().trim();

      const isJobLink = link && (
        link.includes('/job/') ||
        link.includes('/jobs/') ||
        link.includes('/careers/') ||
        link.includes('/posting/') ||
        link.includes('careers.')
      );

      if (isJobLink && text.length > 5 && text.length < 100) {
        let fullUrl = link;
        try { fullUrl = new URL(link, url).toString(); } catch (_) {}

        const parsedId = Buffer.from(fullUrl).toString('base64').substring(0, 16);
        jobs.push({
          jobId: parsedId,
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

    // Deduplicate by URL
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

/**
 * Netflix Adapter
 */
async function fetchNetflix() {
  const url = 'https://jobs.netflix.com/api/search';
  console.log(`[Adapter - Netflix] Fetching jobs from ${url} via POST`);
  const data = await fetchJson(url, {
    method: 'POST',
    body: JSON.stringify({
      query: {
        query: '*',
        location: [],
        department: [],
        skill: [],
        seniority: [],
        pid: '',
        Teams: [],
        'Work Type': [],
        Region: []
      },
      userTitles: [],
      isThinProfile: false,
      veteranProgramDetails: [],
      enableTargetedResume: 0,
      jobCardConfig: null,
      facetDisplaySort: {}
    })
  });

  if (!data || !Array.isArray(data.records)) {
    throw new Error('Invalid Netflix response structure');
  }

  const postings = [];
  data.records.forEach(record => {
    // Netflix API returns listings under record.postings or directly in record
    if (record.postings && Array.isArray(record.postings)) {
      record.postings.forEach(p => {
        postings.push({
          jobId: p.id.toString(),
          title: p.text,
          location: p.location || 'Remote',
          employmentType: p.commitment || 'Full-time',
          postedTimestamp: p.createdAt ? new Date(p.createdAt) : null,
          description: p.description || '',
          url: `https://jobs.netflix.com/jobs/${p.id}`,
          source: 'Netflix'
        });
      });
    } else if (record.id) {
      postings.push({
        jobId: record.id.toString(),
        title: record.text,
        location: record.location || 'Remote',
        employmentType: record.commitment || 'Full-time',
        postedTimestamp: record.created_at ? new Date(record.created_at) : null,
        description: record.description || '',
        url: `https://jobs.netflix.com/jobs/${record.id}`,
        source: 'Netflix'
      });
    }
  });

  return postings;
}

/**
 * Main dispatcher: routes to the correct adapter based on atsProvider.
 */
async function crawlCompany(company) {
  const provider = (company.atsProvider || '').toLowerCase().trim();

  switch (provider) {
    case 'greenhouse':
      return fetchGreenhouse(company.sourceFingerprint, company.apiEndpoint);

    case 'lever':
      return fetchLever(company.sourceFingerprint, company.apiEndpoint);

    case 'ashby':
      return fetchAshby(company.sourceFingerprint, company.apiEndpoint);

    case 'workday':
      return fetchWorkday(company.sourceFingerprint, company.apiEndpoint);

    case 'google careers':
    case 'google':
      return fetchGoogleCareers(company.sourceFingerprint, company.apiEndpoint);

    case 'netflix':
      return fetchNetflix();

    case 'smartrecruiters':
      return fetchSmartRecruiters(company.sourceFingerprint, company.apiEndpoint);

    case 'icims':
      return fetchICIMS(company.sourceFingerprint, company.careerPageUrl, company.apiEndpoint);

    case 'oracle':
    case 'oracle recruiting cloud':
    case 'taleo':
    case 'oracle jobs':
      return fetchOracleJobs(company.sourceFingerprint, company.careerPageUrl, company.apiEndpoint);

    default: {
      // If a structured JSON API endpoint is configured, try it before falling back
      if (
        company.apiEndpoint &&
        (company.apiEndpoint.includes('/api') || company.apiEndpoint.includes('.json'))
      ) {
        try {
          console.log(`[Adapter - Dispatcher] Attempting custom API fetch for ${company.name}`);
          const data = await fetchJson(company.apiEndpoint);
          if (Array.isArray(data)) {
            return data.map((j, i) => ({
              jobId: j.id || j.jobId || i.toString(),
              title: j.title || j.name || 'Job Opening',
              location: j.location || 'Remote',
              employmentType: j.type || 'Full-time',
              postedTimestamp: j.date ? new Date(j.date) : new Date(),
              description: j.description || '',
              url: j.url || company.careerPageUrl,
              source: 'Custom API'
            }));
          }
        } catch (e) {
          console.warn(`Custom API fetch failed for ${company.name}, falling back:`, e.message);
        }
      }

      return fetchFallback(company.careerPageUrl);
    }
  }
}

module.exports = {
  crawlCompany,
  fetchGreenhouse,
  fetchLever,
  fetchAshby,
  fetchWorkday,
  fetchGoogleCareers,
  fetchSmartRecruiters,
  fetchICIMS,
  fetchOracleJobs,
  fetchFallback
};
