const { fetchJson } = require('./helpers');

function normalizeLeverJobs(postings) {
  return postings.map(job => ({
    jobId: job.id,
    title: job.text,
    location: job.categories?.location || 'Remote',
    employmentType: job.categories?.commitment || 'Full-time',
    postedTimestamp: job.createdAt ? new Date(job.createdAt) : null,
    description: job.descriptionHtml || job.description || '',
    url: job.hostedUrl,
    source: 'Lever'
  }));
}

async function fetchLever(companySlug, apiEndpoint) {
  const url = apiEndpoint || `https://api.lever.co/v0/postings/${companySlug}?group=team`;
  console.log(`[Lever] Fetching from ${url}`);
  const data = await fetchJson(url);

  if (!Array.isArray(data)) {
    if (data?.postings && Array.isArray(data.postings)) return normalizeLeverJobs(data.postings);
    throw new Error('Invalid Lever response structure');
  }

  const postings = [];
  data.forEach(group => {
    if (group.postings) postings.push(...group.postings);
    else if (group.id) postings.push(group);
  });

  return normalizeLeverJobs(postings);
}

module.exports = { fetchLever };
