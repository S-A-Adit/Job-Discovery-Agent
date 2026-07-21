const domainQueues = {};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Exponential backoff with full jitter.
 * @param {number} attempt - Zero-indexed retry attempt number.
 * @param {number} baseMs - Base delay in milliseconds.
 * @param {number} maxMs - Maximum delay cap in milliseconds.
 */
function backoffDelay(attempt, baseMs = 30000, maxMs = 120000) {
  const exponential = baseMs * Math.pow(2, attempt);
  const capped = Math.min(exponential, maxMs);
  // Add full jitter: random delay between 0 and capped
  return Math.floor(Math.random() * capped);
}

class Queue {
  constructor() {
    this.queue = [];
    this.running = false;
    this.lastRun = 0;
  }

  async add(taskFn, maxRetries = 3) {
    return new Promise((resolve, reject) => {
      this.queue.push({ taskFn, resolve, reject, maxRetries });
      this.process();
    });
  }

  async process() {
    if (this.running) return;
    this.running = true;

    while (this.queue.length > 0) {
      const { taskFn, resolve, reject, maxRetries } = this.queue.shift();

      // Enforce minimum 15-second interval between requests on this domain
      const now = Date.now();
      const timeSinceLastRun = now - this.lastRun;
      const minDelay = 15000;

      if (timeSinceLastRun < minDelay) {
        const waitTime = minDelay - timeSinceLastRun;
        console.log(`[Rate Limiter] Throttling: sleeping for ${waitTime}ms before next task`);
        await sleep(waitTime);
      }

      this.lastRun = Date.now();

      // Attempt task with retry + exponential backoff
      let lastErr = null;
      let succeeded = false;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          const result = await taskFn();
          resolve(result);
          succeeded = true;
          break;
        } catch (err) {
          lastErr = err;
          const isRateLimit =
            err.message?.includes('429') ||
            err.message?.includes('Too Many') ||
            err.message?.includes('rate limit');

          if (attempt < maxRetries) {
            const delay = backoffDelay(attempt, isRateLimit ? 60000 : 30000);
            console.warn(
              `[Rate Limiter] Attempt ${attempt + 1} failed for task: ${err.message}. ` +
              `Retrying in ${Math.round(delay / 1000)}s (${maxRetries - attempt} retries left)...`
            );
            await sleep(delay);
            // Update lastRun after the backoff sleep so the next domain task
            // doesn't unnecessarily wait the full 15s again on top of the backoff
            this.lastRun = Date.now();
          } else {
            console.error(`[Rate Limiter] Task failed after ${maxRetries + 1} attempts: ${err.message}`);
          }
        }
      }

      if (!succeeded) {
        reject(lastErr);
      }
    }

    this.running = false;
  }
}

function getQueue(domain) {
  if (!domainQueues[domain]) {
    domainQueues[domain] = new Queue();
  }
  return domainQueues[domain];
}

/**
 * Enqueue a task under a specific domain or URL to apply rate limiting and retry logic.
 * @param {string} urlOrDomain - The URL or domain name to group safety limiters.
 * @param {Function} taskFn - The async function carrying out the actual request.
 * @param {number} [maxRetries=3] - Maximum number of retry attempts on failure.
 * @returns {Promise<any>}
 */
async function enqueue(urlOrDomain, taskFn, maxRetries = 3) {
  let domain = 'default';
  try {
    const parsed = new URL(urlOrDomain);
    domain = parsed.hostname;
  } catch (_) {
    domain = urlOrDomain;
  }
  return getQueue(domain).add(taskFn, maxRetries);
}

module.exports = { enqueue };
