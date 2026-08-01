const express = require('express');
const router = express.Router();
const prisma = require('../db');
const { generateEmbedding } = require('../services/recommendation');
const { embedMissingJobs } = require('../services/recommendation');

// GET /api/settings
router.get('/', async (req, res) => {
  try {
    const settings = await prisma.settings.findUnique({ where: { id: 'singleton' } });
    if (!settings) {
      return res.status(404).json({ error: "Settings singleton not found" });
    }
    const decryptedSettings = JSON.parse(settings.dataJson);
    // Don't leak full key to client (mask it)
    if (decryptedSettings.GEMINI_API_KEY) {
      const key = decryptedSettings.GEMINI_API_KEY;
      decryptedSettings.GEMINI_API_KEY_MASKED = key.substring(0, 8) + '...' + key.substring(key.length - 8);
      // Omit full key
      delete decryptedSettings.GEMINI_API_KEY;
    }
    res.json(decryptedSettings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/settings
router.post('/', async (req, res) => {
  const { GEMINI_API_KEY, GEMINI_MODEL, resumeText, preferences } = req.body;
  try {
    const settings = await prisma.settings.findUnique({ where: { id: 'singleton' } });
    let currentConfig = settings ? JSON.parse(settings.dataJson) : {};

    // Only update key if supplied
    if (GEMINI_API_KEY && !GEMINI_API_KEY.includes('...')) {
      currentConfig.GEMINI_API_KEY = GEMINI_API_KEY;
    }
    if (GEMINI_MODEL) {
      currentConfig.GEMINI_MODEL = GEMINI_MODEL;
    }
    if (preferences) {
      currentConfig.preferences = preferences;
    }

    // If resume text is modified, generate and update embedding
    if (resumeText !== undefined && resumeText !== currentConfig.resumeText) {
      currentConfig.resumeText = resumeText;
      if (resumeText.trim()) {
        console.log("[Settings API] Generating embedding for new resume text...");
        try {
          const emb = await generateEmbedding(resumeText);
          currentConfig.resumeEmbedding = emb;
        } catch (e) {
          console.error("Embedding generation failed for resume:", e.message);
          // Keep old embedding if we fail, or null it out
        }
      } else {
        currentConfig.resumeEmbedding = null;
      }
    }

    await prisma.settings.upsert({
      where: { id: 'singleton' },
      update: { dataJson: JSON.stringify(currentConfig) },
      create: { id: 'singleton', dataJson: JSON.stringify(currentConfig) }
    });

    // Trigger asynchronous embed updating for jobs that are currently missing them
    embedMissingJobs().catch(e => console.error("Bg embedding error:", e.message));

    // Send back masked config
    if (currentConfig.GEMINI_API_KEY) {
      const key = currentConfig.GEMINI_API_KEY;
      currentConfig.GEMINI_API_KEY_MASKED = key.substring(0, 8) + '...' + key.substring(key.length - 8);
      delete currentConfig.GEMINI_API_KEY;
    }
    res.json(currentConfig);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
