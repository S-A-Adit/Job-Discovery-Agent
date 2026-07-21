/**
 * Internship / Entry-Level Role Filter
 * Determines whether a job title and description match the target audience.
 */

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
  'new grad', 'entry level', 'junior', 'associate', 'early career', 'level 1', 'level i',
  'engineer i', 'software engineer i', 'ml engineer i', 'ai engineer i', 'college hire', 'campus hire'
];

const REJECT_EXPERIENCE = [
  'senior', 'principal', 'lead', 'manager', 'director', 'staff', 'architect', 'head of', 'vp',
  'level 3', 'level 4', 'level 5', 'level iii', 'level iv', 'level v',
  'engineer ii', 'engineer iii', 'engineer iv'
];

/**
 * Returns true if the title matches a kept engineering/technical role
 * and does not match any rejected non-technical role.
 */
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

/**
 * Returns true if the title/description is consistent with 0-2 years of experience.
 * Rejects postings that explicitly require senior experience.
 */
function matchesExperience(title, description = '') {
  const t = title.toLowerCase();
  const d = description.toLowerCase();

  // Hard reject on senior experience in title
  for (const word of REJECT_EXPERIENCE) {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(t)) return false;
  }

  // Reject explicit high experience requirements in description (3+ years)
  const highExpRegex = /\b(?:[3-9]|\d{2})\+?\s*years?\b/i;
  const highExpRangeRegex = /\b[3-9]\s*-\s*\d+\s*years?\b/i;
  if (highExpRegex.test(d) || highExpRangeRegex.test(d)) {
    const lowExpRangeRegex = /\b(?:0|1|2)\s*-\s*(?:[3-5])\s*years?\b/i;
    if (!lowExpRangeRegex.test(d)) {
      return false;
    }
  }

  // Accept if positive keyword present in title
  const hasKeepKeyword = KEEP_EXPERIENCE.some(word => new RegExp(`\\b${word}\\b`, 'i').test(t));
  const hasLowExpDesc = /\b(?:0|1|2)\s*-\s*(?:1|2|3)?\s*years?\s*(?:of\s*)?experience\b/i.test(d)
    || /\b(?:0|1|2)\s*years?\s*(?:of\s*)?experience\b/i.test(d);

  if (hasKeepKeyword || hasLowExpDesc) {
    return true;
  }

  // No seniority signals found — accept by default (lenient pass)
  return true;
}

module.exports = { matchesRole, matchesExperience, KEEP_ROLES, REJECT_ROLES, KEEP_EXPERIENCE, REJECT_EXPERIENCE };
