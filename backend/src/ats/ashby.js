const { fetchJson } = require('./helpers');

async function fetchAshby(companySlug, apiEndpoint) {
  const url = apiEndpoint || `https://api.ashbyhq.com/draft/public-api/job-board/${companySlug}`;
  console.log(`[Ashby] Fetching from ${url}`);
  const data = await fetchJson(url);
  if (!data?.jobs) throw new Error('Invalid Ashby response structure');

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

module.exports = { fetchAshby };
