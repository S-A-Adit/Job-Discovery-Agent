/**
 * ATS Dispatcher — routes company crawl requests to the correct adapter.
 * This is a clean replacement for the monolithic adapters/index.js.
 */

const { fetchGreenhouse } = require('./greenhouse');
const { fetchLever } = require('./lever');
const { fetchAshby } = require('./ashby');
const { fetchWorkday } = require('./workday');
const { fetchSmartRecruiters } = require('./smartrecruiters');
const { fetchICIMS } = require('./icims');
const { fetchOracleJobs } = require('./oracle');
const { fetchNetflix } = require('./netflix');
const { fetchGoogleCareers } = require('./google');
const { fetchFallback } = require('./fallback');
const { fetchJson } = require('./helpers');

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
      // Try a custom JSON API endpoint if configured
      if (
        company.apiEndpoint &&
        (company.apiEndpoint.includes('/api') || company.apiEndpoint.includes('.json'))
      ) {
        try {
          console.log(`[ATS Dispatcher] Trying custom API for ${company.name}`);
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
          console.warn(`[ATS Dispatcher] Custom API failed for ${company.name}:`, e.message);
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
  fetchSmartRecruiters,
  fetchICIMS,
  fetchOracleJobs,
  fetchNetflix,
  fetchGoogleCareers,
  fetchFallback
};
