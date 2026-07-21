const { fetchJson } = require('./helpers');

async function fetchGoogleCareers(companySlug, apiEndpoint) {
  const url = apiEndpoint || `https://careers.google.com/api/v1/jobs/search/?q=&company=Google`;
  console.log(`[Google Careers] Fetching from ${url}`);
  const data = await fetchJson(url);
  if (!data || !Array.isArray(data.jobs)) throw new Error('Invalid Google Careers response structure');

  return data.jobs.map(job => {
    const rawId = job.id || '';
    const jobId = rawId.replace('jobs/', '');
    return {
      jobId,
      title: job.title,
      location: job.locations?.length > 0
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

module.exports = { fetchGoogleCareers };
