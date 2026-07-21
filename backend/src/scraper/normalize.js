/**
 * Job Normalizer
 * Transforms a raw job record from any ATS adapter into a standardized schema,
 * applying role and experience filters. Returns null if the job is filtered out.
 */

const crypto = require('crypto');
const { matchesRole, matchesExperience } = require('../filters/internship');
const { isPostedRecently } = require('../filters/recentJobs');

function generateJobHash(companyName, title, location, jobId) {
  const input = `${companyName.toLowerCase()}|${title.toLowerCase()}|${(location || '').toLowerCase()}|${jobId}`;
  return crypto.createHash('sha256').update(input).digest('hex');
}

const SKILL_KEYWORDS = [
  'javascript', 'typescript', 'react', 'node', 'python', 'java', 'c++', 'aws',
  'docker', 'kubernetes', 'sql', 'nosql', 'rust', 'go', 'ruby', 'php',
  'pytorch', 'tensorflow', 'llm', 'cuda', 'spark', 'kafka', 'redis'
];

/**
 * Normalizes a raw ATS job record.
 * @returns {object|null} Normalized job, or null if filtered out.
 */
function normalizeJob(rawJob, company) {
  if (!matchesRole(rawJob.title)) return null;

  const desc = rawJob.description || '';
  if (!matchesExperience(rawJob.title, desc)) return null;
  if (!isPostedRecently(rawJob.postedTimestamp, desc, rawJob.title)) return null;

  const hash = generateJobHash(company.name, rawJob.title, rawJob.location, rawJob.jobId);

  const titleAndLoc = `${rawJob.title} ${rawJob.location}`.toLowerCase();
  const remote = titleAndLoc.includes('remote') || titleAndLoc.includes('anywhere') || titleAndLoc.includes('wfh');

  let salary = null;
  const salaryMatch = desc.match(/(\$\d{2,3}(?:,\d{3})*(?:\s*-\s*\$\d{2,3}(?:,\d{3})*|\s*k)?)/gi);
  if (salaryMatch) salary = salaryMatch[0];

  let experience = 'Entry-Level';
  const lowerTitle = rawJob.title.toLowerCase();
  if (lowerTitle.includes('intern')) experience = 'Internship';
  else if (lowerTitle.includes('grad') || lowerTitle.includes('new grad')) experience = 'New Grad';

  const foundSkills = SKILL_KEYWORDS.filter(skill => desc.toLowerCase().includes(skill));
  const skills = foundSkills.length > 0 ? foundSkills.join(', ') : null;

  return {
    companyId: company.id,
    companyName: company.name,
    jobId: rawJob.jobId,
    title: rawJob.title.trim(),
    location: (rawJob.location || 'Remote').trim(),
    employmentType: rawJob.employmentType || 'Full-time',
    postedTimestamp: rawJob.postedTimestamp ? new Date(rawJob.postedTimestamp) : null,
    description: desc,
    url: rawJob.url,
    source: rawJob.source || company.atsProvider || 'Crawler',
    hash,
    remote,
    salary,
    department: rawJob.employmentType || 'Engineering',
    skills,
    experience
  };
}

module.exports = { normalizeJob, generateJobHash };
