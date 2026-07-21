const { fetchJson } = require('./helpers');

async function fetchSmartRecruiters(companySlug, apiEndpoint) {
  const url = apiEndpoint || `https://api.smartrecruiters.com/v1/companies/${companySlug}/postings?limit=100`;
  console.log(`[SmartRecruiters] Fetching from ${url}`);
  const data = await fetchJson(url, { headers: { Accept: 'application/json' } });
  if (!data || !Array.isArray(data.content)) throw new Error('Invalid SmartRecruiters response structure');

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

module.exports = { fetchSmartRecruiters };
