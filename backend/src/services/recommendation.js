const prisma = require('../db');

function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function getApiKeyAndModel() {
  const settings = await prisma.settings.findUnique({ where: { id: 'singleton' } });
  if (settings) {
    try {
      const config = JSON.parse(settings.dataJson);
      if (config.GEMINI_API_KEY) {
        return {
          apiKey: config.GEMINI_API_KEY,
          model: config.GEMINI_MODEL || 'gemini-2.0-flash'
        };
      }
    } catch (_) {}
  }
  return {
    apiKey: process.env.GEMINI_API_KEY || '',
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash'
  };
}

/**
 * Generate embedding vector using Gemini API.
 * Retries up to 3 times with exponential backoff on 429 / server errors.
 */
async function generateEmbedding(text) {
  const { apiKey } = await getApiKeyAndModel();
  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Go to settings to set it.');
  }

  const cleanText = text.substring(0, 8000);
  const MAX_RETRIES = 3;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'models/text-embedding-004',
          content: {
            parts: [{ text: cleanText }]
          }
        })
      }
    );

    if (response.ok) {
      const result = await response.json();
      if (!result?.embedding?.values) {
        throw new Error('Invalid embedding response structure');
      }
      return result.embedding.values;
    }

    const isRateLimit = response.status === 429;
    const isServerError = response.status >= 500;

    if ((isRateLimit || isServerError) && attempt < MAX_RETRIES) {
      // Exponential backoff: 5s, 15s, 45s with jitter
      const baseDelay = isRateLimit ? 15000 : 5000;
      const delay = baseDelay * Math.pow(3, attempt) + Math.floor(Math.random() * 2000);
      console.warn(
        `[Embedding] API returned ${response.status} on attempt ${attempt + 1}. ` +
        `Retrying in ${Math.round(delay / 1000)}s...`
      );
      await new Promise(r => setTimeout(r, delay));
      continue;
    }

    const errorText = await response.text();
    throw new Error(`Embedding API failed: ${response.status} - ${errorText}`);
  }
}

/**
 * Ensures all ACTIVE jobs have embeddings.
 * Processes in small batches with rate-limit-aware delays.
 * Reduced batch size (5) and increased inter-call sleep (1500ms) for safety.
 */
async function embedMissingJobs() {
  const { apiKey } = await getApiKeyAndModel();
  if (!apiKey) {
    console.log('[Embedding] Skipping embedding: API key not set.');
    return;
  }

  // Process in batches of 5 (conservative to avoid rate limits)
  const BATCH_SIZE = 5;
  const INTER_CALL_SLEEP_MS = 1500;

  const unembeddedJobs = await prisma.job.findMany({
    where: {
      status: 'ACTIVE',
      embedding: null
    },
    take: BATCH_SIZE
  });

  if (unembeddedJobs.length === 0) return;

  console.log(`[Embedding] Found ${unembeddedJobs.length} jobs needing embeddings. Processing...`);

  for (const job of unembeddedJobs) {
    try {
      const textToEmbed = [
        `Title: ${job.title}`,
        `Company: ${job.companyName}`,
        `Location: ${job.location}`,
        `Type: ${job.employmentType}`,
        `Description: ${job.description || ''}`
      ].join('\n');

      const embedding = await generateEmbedding(textToEmbed);

      await prisma.job.update({
        where: { id: job.id },
        data: { embedding: JSON.stringify(embedding) }
      });

      console.log(`[Embedding] Embedded job: "${job.title}" at ${job.companyName}`);

      // Rate-limit-safe delay between embedding calls
      await new Promise(r => setTimeout(r, INTER_CALL_SLEEP_MS));
    } catch (e) {
      console.error(`[Embedding] Failed to embed job ${job.id} ("${job.title}"):`, e.message);
      // Continue with remaining jobs even if one fails
    }
  }
}

/**
 * Compare a resume embedding with job embeddings and return ranked jobs.
 */
/**
 * Compare a resume embedding with job embeddings and return ranked jobs.
 * Incorporates freshness, remote status, and company sources.
 */
async function rankJobsAgainstResume(resumeEmbeddingJson, jobsList) {
  if (!resumeEmbeddingJson) return jobsList.map(j => ({ ...j, matchScore: 0 }));

  const resumeVector = Array.isArray(resumeEmbeddingJson)
    ? resumeEmbeddingJson
    : JSON.parse(resumeEmbeddingJson);

  // Fetch all company sources to apply tier/source boosts
  const companySources = await prisma.companySource.findMany();
  const sourceMap = {};
  companySources.forEach(s => {
    if (!sourceMap[s.companyId]) sourceMap[s.companyId] = [];
    sourceMap[s.companyId].push(s.sourceName);
  });

  return jobsList.map(job => {
    let baseScore = 0;
    if (job.embedding) {
      try {
        const jobVector = JSON.parse(job.embedding);
        baseScore = cosineSimilarity(resumeVector, jobVector) * 100;
      } catch (e) {
        console.error('Error parsing job embedding:', e.message);
      }
    }

    // Apply boosts
    let finalScore = baseScore;

    // 1. Freshness boost
    const hoursOld = (Date.now() - new Date(job.firstSeen).getTime()) / (1000 * 60 * 60);
    if (hoursOld <= 24) {
      finalScore += 15;
    } else if (hoursOld <= 48) {
      finalScore += 10;
    } else if (hoursOld <= 72) {
      finalScore += 5;
    }

    // 2. Remote boost (if job is remote)
    if (job.remote) {
      finalScore += 10;
    }

    // 3. Company tier / source boost (Fortune 500, YC, NASDAQ-100)
    const sources = sourceMap[job.companyId] || [];
    if (sources.includes('Fortune 500 Tech') || sources.includes('NASDAQ-100') || sources.includes('YC Companies')) {
      finalScore += 15;
    }

    // Cap at 100
    finalScore = Math.min(Math.round(finalScore), 100);

    return {
      ...job,
      matchScore: finalScore
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

module.exports = {
  generateEmbedding,
  embedMissingJobs,
  rankJobsAgainstResume,
  cosineSimilarity
};
