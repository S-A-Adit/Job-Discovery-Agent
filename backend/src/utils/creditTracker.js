/**
 * Tavily Credit Tracker — Shared Session State
 *
 * Tracks Tavily API credits consumed across all pipelines in a single
 * Node.js process session (run_discovery.js, atsDiscovery.js, etc.).
 *
 * Usage:
 *   const { incrementCredit, checkCreditThreshold, askPermission, getSessionCredits } = require('../utils/creditTracker');
 */

let sessionCreditsUsed = 0;

/**
 * Returns the number of credits consumed in this session so far.
 */
function getSessionCredits() {
  return sessionCreditsUsed;
}

/**
 * Increments the session credit counter by 1 and prints the running total.
 * Call this ONCE per Tavily search query that actually executes.
 *
 * @param {string} queryLabel - A short description for the log output
 */
function incrementCredit(queryLabel = '') {
  sessionCreditsUsed++;
  const label = queryLabel ? ` ("${queryLabel}")` : '';
  console.log(`  [Tavily Cost]${label} 1 credit used. Session total: ${sessionCreditsUsed} credits.`);
}

/**
 * Prompts user for y/n confirmation via stdin.
 * Auto-approves if:
 *   - Not running in a TTY (background task / piped input)
 *   - AUTO_APPROVE_TAVILY=true is set in environment
 *
 * @param {string} promptText
 * @returns {Promise<boolean>}
 */
async function askPermission(promptText) {
  if (!process.stdin.isTTY || process.env.AUTO_APPROVE_TAVILY === 'true') {
    return true;
  }
  const readline = require('readline/promises');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await rl.question(promptText);
    return answer.toLowerCase().trim().startsWith('y');
  } catch (_) {
    return false;
  } finally {
    rl.close();
  }
}

/**
 * Checks if the 100-credit threshold has been reached.
 * If so, pauses the pipeline and prompts the user to continue or stop.
 *
 * @throws {Error} Throws 'CRAWLER_PAUSED_BY_USER' if user chooses to stop.
 */
async function checkCreditThreshold() {
  if (sessionCreditsUsed > 0 && sessionCreditsUsed % 100 === 0) {
    console.log(`\n  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`  [Tavily Threshold] ⚠  ${sessionCreditsUsed} search credits consumed this session.`);
    console.log(`  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
    const cont = await askPermission(`  Continue using Tavily search credits? (y/n): `);
    if (!cont) {
      console.log(`  [Tavily] Session stopped by user at ${sessionCreditsUsed} credits.`);
      throw new Error('CRAWLER_PAUSED_BY_USER');
    }
    console.log(`  [Tavily] Resuming. Credits so far: ${sessionCreditsUsed}`);
  }
}

module.exports = {
  getSessionCredits,
  incrementCredit,
  askPermission,
  checkCreditThreshold
};
