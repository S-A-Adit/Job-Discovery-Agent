/**
 * Recent Job Filter
 * Determines whether a job was posted within the last 72 hours.
 *
 * Priority order per spec:
 * 1. Structured posting date (postedTimestamp field)
 * 2. JSON-LD JobPosting datePosted (parsed from description)
 * 3. Relative text ("posted today", "posted yesterday", "48 hours", etc.)
 * 4. Default: accept (newly discovered jobs are presumed fresh)
 */

const CUTOFF_HOURS = 72;

/**
 * Attempts to extract a datePosted value from JSON-LD embedded in a description string.
 */
function extractJsonLdDate(text) {
  try {
    const match = text.match(/"datePosted"\s*:\s*"([^"]+)"/);
    if (match) {
      const d = new Date(match[1]);
      if (!isNaN(d.getTime())) return d;
    }
  } catch (_) {}
  return null;
}

/**
 * Returns true if the job was posted within CUTOFF_HOURS.
 */
function isPostedRecently(postedTimestamp, description = '', title = '') {
  const now = Date.now();
  const cutoffMs = CUTOFF_HOURS * 60 * 60 * 1000;

  // Priority 1: Structured posting date from ATS
  if (postedTimestamp) {
    const ageMs = now - new Date(postedTimestamp).getTime();
    return ageMs <= cutoffMs;
  }

  // Priority 2: JSON-LD datePosted embedded in description
  const jsonLdDate = extractJsonLdDate(description);
  if (jsonLdDate) {
    const ageMs = now - jsonLdDate.getTime();
    return ageMs <= cutoffMs;
  }

  // Priority 3: Relative text signals
  const text = `${title} ${description}`.toLowerCase();

  // Explicit stale signals — reject
  if (
    text.includes('posted 4 days ago') ||
    text.includes('posted 5 days ago') ||
    text.includes('posted 30+ days ago') ||
    text.includes('posted 1 week ago') ||
    text.includes('posted 2 weeks ago') ||
    text.includes('posted last week') ||
    text.includes('posted last month')
  ) {
    return false;
  }

  // Explicit fresh signals — accept
  if (
    text.includes('posted today') ||
    text.includes('posted yesterday') ||
    text.includes('posted 1 day ago') ||
    text.includes('posted 2 days ago') ||
    text.includes('posted 3 days ago') ||
    text.includes('just posted') ||
    text.includes('48 hours') ||
    text.includes('72 hours')
  ) {
    return true;
  }

  // Priority 4: No signals — default accept (newly seen jobs are presumed fresh)
  return true;
}

module.exports = { isPostedRecently, CUTOFF_HOURS };
