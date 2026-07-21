const crypto = require('crypto');
const prisma = require('../db');
const { crawlCompany } = require('../adapters');
const { enqueue } = require('../crawler/queue');

// Helper to generate a stable deduplication hash
function generateJobHash(companyName, title, location, jobId) {
  const input = `${companyName.toLowerCase()}|${title.toLowerCase()}|${(location || '').toLowerCase()}|${jobId}`;
  return crypto.createHash('sha256').update(input).digest('hex');
}

const KEEP_ROLES = [
  'software', 'machine learning', 'ai', 'research', 'backend', 'frontend', 'full stack', 'fullstack',
  'data', 'infrastructure', 'cloud', 'security', 'embedded', 'compiler', 'distributed systems',
  'platform', 'site reliability', 'sre', 'devops', 'applied scientist', 'research engineer',
  'ai engineer', 'ml engineer', 'mlops', 'systems engineer', 'algorithms engineer', 'product'
];

const REJECT_ROLES = [
  'sales', 'marketing', 'finance', 'hr', 'operations', 'legal', 'nursing', 'consulting', 'executive',
  'recruiter', 'support', 'customer success', 'account manager', 'sales engineer', 'business analyst',
  'talent acquisition', 'office manager', 'medical', 'clinician', 'lawyer', 'paralegal'
];

const KEEP_EXPERIENCE = [
  'intern', 'internship', 'university', 'student', 'campus', 'graduate', 'graduate program',
  'new grad', 'entry level', 'junior', 'associate', 'early career', 'level 1', 'level i', 'engineer i'
];

const REJECT_EXPERIENCE = [
  'senior', 'principal', 'lead', 'manager', 'director', 'staff', 'architect', 'head of', 'vp',
  'level 3', 'level 4', 'level 5', 'level iii', 'level iv', 'level v', 'engineer ii', 'engineer iii', 'engineer iv'
];

function matchesRole(title) {
  const t = title.toLowerCase();
  for (const word of REJECT_ROLES) {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(t)) return false;
  }
  for (const word of KEEP_ROLES) {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(t)) return true;
  }
  return false;
}

function matchesExperience(title, description = '') {
  const t = title.toLowerCase();
  const d = description.toLowerCase();

  for (const word of REJECT_EXPERIENCE) {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(t)) return false;
  }

  // Reject explicit high experience requirements in description
  const highExpRegex = /\b(?:[3-9]|\d{2})\+?\s*years?\b/i;
  const highExpRangeRegex = /\b[3-9]\s*-\s*\d+\s*years?\b/i;
  if (highExpRegex.test(d) || highExpRangeRegex.test(d)) {
    const lowExpRangeRegex = /\b(?:0|1|2)\s*-\s*(?:[3-5])\s*years?\b/i;
    if (!lowExpRangeRegex.test(d)) {
      return false;
    }
  }

  const hasKeepKeyword = KEEP_EXPERIENCE.some(word => new RegExp(`\\b${word}\\b`, 'i').test(t));
  const hasLowExpDesc = /\b(?:0|1|2)\s*-\s*(?:1|2|3)?\s*years?\s*(?:of\s*)?experience\b/i || /\b(?:0|1|2)\s*years?\s*(?:of\s*)?experience\b/i.test(d);
  
  if (hasKeepKeyword || hasLowExpDesc) {
    return true;
  }

  // Be slightly lenient if title has absolutely no seniority and no other reject signals
  return true;
}

function isPostedRecently(postedTimestamp, description = '', title = '') {
  const now = Date.now();
  if (postedTimestamp) {
    const ageMs = now - new Date(postedTimestamp).getTime();
    if (ageMs > 72 * 60 * 60 * 1000) {
      return false; 
    }
    return true;
  }

  const text = `${title} ${description}`.toLowerCase();
  
  if (text.includes('posted 4 days ago') || text.includes('posted 5 days ago') || text.includes('posted 30+ days ago') || text.includes('posted 1 week ago')) {
    return false;
  }

  if (text.includes('posted today') || text.includes('posted yesterday') || text.includes('posted 1 day ago') || text.includes('posted 2 days ago') || text.includes('posted 3 days ago') || text.includes('48 hours') || text.includes('72 hours')) {
    return true;
  }

  // Default to true if newly seen and no old/outdated indicators, to allow fresh fallback discovery
  return true;
}

/**
 * Normalizes a raw crawled job record. Returns null if filtered out.
 */
function normalizeJob(rawJob, company) {
  if (!matchesRole(rawJob.title)) {
    return null;
  }

  const desc = rawJob.description || '';
  if (!matchesExperience(rawJob.title, desc)) {
    return null;
  }

  if (!isPostedRecently(rawJob.postedTimestamp, desc, rawJob.title)) {
    return null;
  }

  const hash = generateJobHash(company.name, rawJob.title, rawJob.location, rawJob.jobId);
  
  // Extract remote status
  const titleAndLoc = `${rawJob.title} ${rawJob.location}`.toLowerCase();
  const remote = titleAndLoc.includes('remote') || titleAndLoc.includes('anywhere') || titleAndLoc.includes('wfh');

  // Parse salary if present in description
  let salary = null;
  const salaryRegex = /(\$\d{2,3}(?:,\d{3})*(?:\s*-\s*\$\d{2,3}(?:,\d{3})*|\s*k)?)/gi;
  const salaryMatch = desc.match(salaryRegex);
  if (salaryMatch) {
    salary = salaryMatch[0];
  }

  // Parse experience level
  let experience = 'Entry-Level';
  const lowerTitle = rawJob.title.toLowerCase();
  if (lowerTitle.includes('intern')) {
    experience = 'Internship';
  } else if (lowerTitle.includes('grad')) {
    experience = 'New Grad';
  }

  // Extract skills from description
  const skillKeywords = ['javascript', 'typescript', 'react', 'node', 'python', 'java', 'c++', 'aws', 'docker', 'kubernetes', 'sql', 'nosql', 'rust', 'go', 'ruby', 'php'];
  const foundSkills = skillKeywords.filter(skill => desc.toLowerCase().includes(skill));
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

/**
 * Main function to crawl a company and process its jobs.
 * Enforces per-domain rate limiting queue.
 */
async function processCrawlForCompany(companyId) {
  const startTime = Date.now();
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company) {
    throw new Error(`Company not found: ${companyId}`);
  }

  console.log(`[Crawler] Queuing crawl for ${company.name}...`);
  let jobsFound = 0;
  let jobsNew = 0;
  let errorMsg = null;

  try {
    // Run within the 15-second rate limiting queue
    const rawJobs = await enqueue(company.careerPageUrl, async () => {
      return await crawlCompany(company);
    });

    jobsFound = rawJobs.length;
    console.log(`[Crawler] Found ${jobsFound} jobs for ${company.name}`);

    // Process all jobs in a single transaction or loop
    const runTimestamp = new Date();

    for (const rawJob of rawJobs) {
      const normalized = normalizeJob(rawJob, company);
      if (!normalized) continue;
      
      // Look up by unique hash (deduplication)
      const existingJob = await prisma.job.findUnique({
        where: { hash: normalized.hash }
      });

      if (existingJob) {
        // Update last seen
        await prisma.job.update({
          where: { hash: normalized.hash },
          data: {
            lastSeen: runTimestamp,
            status: 'ACTIVE',
            url: normalized.url, // In case URLs change slightly
            description: normalized.description || existingJob.description
          }
        });
      } else {
        // Create new job - firstSeen defaults to now
        await prisma.job.create({
          data: {
            ...normalized,
            firstSeen: runTimestamp,
            lastSeen: runTimestamp,
            status: 'ACTIVE'
          }
        });
        jobsNew++;
      }
    }

    // Mark jobs that were NOT seen in this run as INACTIVE
    const updateResult = await prisma.job.updateMany({
      where: {
        companyId: company.id,
        lastSeen: { lt: runTimestamp },
        status: 'ACTIVE'
      },
      data: {
        status: 'INACTIVE'
      }
    });

    if (updateResult.count > 0) {
      console.log(`[Crawler] Marked ${updateResult.count} jobs as INACTIVE (filled) for ${company.name}`);
    }

    // Update company last successful crawl
    await prisma.company.update({
      where: { id: companyId },
      data: { lastSuccessfulCrawl: runTimestamp }
    });

    // Write crawl log
    await prisma.crawlLog.create({
      data: {
        companyId: company.id,
        status: 'SUCCESS',
        jobsFound,
        jobsNew,
        durationMs: Date.now() - startTime
      }
    });

    // Prune jobs older than 72 hours
    await pruneOldJobs();

    return { success: true, jobsFound, jobsNew };
  } catch (err) {
    errorMsg = err.message;
    console.error(`[Crawler] Error crawling ${company.name}:`, err);

    await prisma.crawlLog.create({
      data: {
        companyId: company.id,
        status: 'FAILURE',
        jobsFound: 0,
        jobsNew: 0,
        errorMessage: errorMsg,
        durationMs: Date.now() - startTime
      }
    });

    return { success: false, error: errorMsg };
  }
}

/**
 * Deletes all jobs in the database older than 72 hours.
 */
async function pruneOldJobs() {
  const cutoff = new Date(Date.now() - 72 * 60 * 60 * 1000);
  const result = await prisma.job.deleteMany({
    where: {
      OR: [
        { firstSeen: { lt: cutoff } },
        { status: 'INACTIVE' }
      ]
    }
  });
  if (result.count > 0) {
    console.log(`[Crawler] Pruned ${result.count} old or inactive jobs.`);
  }
}

module.exports = {
  processCrawlForCompany,
  generateJobHash,
  normalizeJob,
  pruneOldJobs
};
