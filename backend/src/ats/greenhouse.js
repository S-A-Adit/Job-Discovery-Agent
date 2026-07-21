const { fetchJson } = require('./helpers');

async function fetchGreenhouse(companySlug, apiEndpoint) {
  const url = apiEndpoint || `https://boards-api.greenhouse.io/v1/boards/${companySlug}/jobs?content=true`;
  console.log(`[Greenhouse] Fetching from ${url}`);
  const data = await fetchJson(url);
  if (!data?.jobs) throw new Error('Invalid Greenhouse response structure');

  return data.jobs.map(job => ({
    jobId: job.id.toString(),
    title: job.title,
    location: job.location ? job.location.name : 'Remote',
    employmentType: job.departments?.length > 0 ? job.departments[0].name : 'Full-time',
    postedTimestamp: job.updated_at ? new Date(job.updated_at) : null,
    description: job.content || '',
    url: job.absolute_url,
    source: 'Greenhouse'
  }));
}

module.exports = { fetchGreenhouse };
