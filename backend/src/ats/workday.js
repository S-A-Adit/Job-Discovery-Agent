const { fetchJson } = require('./helpers');
const { fetchFallback } = require('./fallback');

async function fetchWorkday(companySlug, apiEndpoint) {
  if (!apiEndpoint) throw new Error('Workday requires an explicit apiEndpoint');

  console.log(`[Workday] Fetching from ${apiEndpoint}`);

  const PAGE_SIZE = 50;
  const MAX_PAGES = 10;
  const allJobs = [];
  let offset = 0;
  let totalFetched = 0;

  for (let page = 0; page < MAX_PAGES; page++) {
    let data;
    try {
      data = await fetchJson(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify({ appliedFacets: {}, limit: PAGE_SIZE, offset, searchText: '' })
      });
    } catch (err) {
      console.warn(`[Workday] API failed: ${err.message}. WAF block likely. Using Puppeteer fallback.`);
      const origin = new URL(apiEndpoint).origin;
      return fetchFallback(origin); // Fallback to scraping the site directly
    }

    if (!data || !Array.isArray(data.jobPostings)) {
      if (page === 0) throw new Error('Invalid Workday response structure');
      break;
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
    console.log(`[Workday] Page ${page + 1}: ${data.jobPostings.length} jobs (total: ${totalFetched})`);
    if (totalFetched >= (data.total || 0) || data.jobPostings.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
  }

  console.log(`[Workday] Finished: ${allJobs.length} jobs from ${apiEndpoint}`);
  return allJobs;
}

module.exports = { fetchWorkday };
