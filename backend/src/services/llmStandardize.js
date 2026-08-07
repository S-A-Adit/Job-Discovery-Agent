const prisma = require('../db');

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
 * Standardize job fields using Gemini API.
 * Retries up to 3 times with exponential backoff on 429 / server errors.
 */
async function standardizeJobFields(title, description) {
  const { apiKey, model } = await getApiKeyAndModel();
  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Go to settings to set it.');
  }

  // Truncate overly long descriptions to save tokens
  const cleanDescription = (description || '').substring(0, 15000);
  const MAX_RETRIES = 3;

  const systemPrompt = `You are a strict JSON data extractor for job descriptions. 
Read the following job title and description and extract these exact fields into a valid JSON object. 
DO NOT include markdown formatting, backticks, or the word "json". Output ONLY the raw JSON object.

Fields:
- remote (boolean): true if the job is explicitly remote, work from home, or anywhere.
- salary (string or null): Extract the salary range if present (e.g. '$100k - $120k'). Null if missing.
- department (string): The general department, e.g., 'Engineering', 'Sales', 'Product', 'Marketing'.
- skills (string or null): A comma-separated list of core technical skills or tools mentioned (e.g., 'React, Python, AWS'). Null if none.
- experience (string): STRICTLY pick one of these exact buckets: 'Intern', 'Entry-Level', 'Mid-Level', 'Senior', 'Director/Executive'. If unclear, use 'Entry-Level' for 0-2 yrs, 'Mid-Level' for 3-5 yrs, 'Senior' for 5+ yrs.

Title: ${title}

Description: ${cleanDescription}
`;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: {
            temperature: 0.1, // Keep it deterministic
            responseMimeType: 'application/json'
          }
        })
      }
    );

    if (response.ok) {
      const result = await response.json();
      const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!rawText) {
        throw new Error('Invalid LLM response structure');
      }
      
      try {
        const parsed = JSON.parse(rawText.trim());
        return parsed;
      } catch (e) {
        console.error('[LLM] Failed to parse JSON from response:', rawText);
        throw new Error('LLM did not return valid JSON');
      }
    }

    const isRateLimit = response.status === 429;
    const isServerError = response.status >= 500;

    if ((isRateLimit || isServerError) && attempt < MAX_RETRIES) {
      const baseDelay = isRateLimit ? 15000 : 5000;
      const delay = baseDelay * Math.pow(3, attempt) + Math.floor(Math.random() * 2000);
      console.warn(`[LLM] API returned ${response.status} on attempt ${attempt + 1}. Retrying in ${Math.round(delay / 1000)}s...`);
      await new Promise(r => setTimeout(r, delay));
      continue;
    }

    const errorText = await response.text();
    throw new Error(`LLM API failed: ${response.status} - ${errorText}`);
  }
}

module.exports = {
  standardizeJobFields
};
