const { fetchJson } = require('./helpers');

async function fetchNetflix() {
  const url = 'https://jobs.netflix.com/api/search';
  console.log(`[Netflix] Fetching jobs via POST to ${url}`);
  const data = await fetchJson(url, {
    method: 'POST',
    body: JSON.stringify({
      query: {
        query: '*', location: [], department: [], skill: [], seniority: [],
        pid: '', Teams: [], 'Work Type': [], Region: []
      },
      userTitles: [], isThinProfile: false, veteranProgramDetails: [],
      enableTargetedResume: 0, jobCardConfig: null, facetDisplaySort: {}
    })
  });

  if (!data || !Array.isArray(data.records)) throw new Error('Invalid Netflix response structure');

  const postings = [];
  data.records.forEach(record => {
    if (record.postings && Array.isArray(record.postings)) {
      record.postings.forEach(p => postings.push({
        jobId: p.id.toString(),
        title: p.text,
        location: p.location || 'Remote',
        employmentType: p.commitment || 'Full-time',
        postedTimestamp: p.createdAt ? new Date(p.createdAt) : null,
        description: p.description || '',
        url: `https://jobs.netflix.com/jobs/${p.id}`,
        source: 'Netflix'
      }));
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

module.exports = { fetchNetflix };
