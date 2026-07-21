const fs = require('fs');
const path = require('path');
const dotenvPath = fs.existsSync(path.join(__dirname, '../../../.env'))
  ? path.join(__dirname, '../../../.env')
  : (fs.existsSync(path.join(__dirname, '../../.env')) ? path.join(__dirname, '../../.env') : path.join(__dirname, '.env'));
require('dotenv').config({ path: dotenvPath });
const express = require('express');
const cors = require('cors');
const prisma = require('./db');
// Scheduler — use new modular scheduler if available, fallback to legacy
let startScheduler, stopScheduler;
try {
  ({ startScheduler, stopScheduler } = require('./scheduler/scheduler'));
} catch (_) {
  ({ startScheduler, stopScheduler } = require('./crawler/scheduler'));
}
const { generateEmbedding, embedMissingJobs } = require('./services/recommendation');
const { exec } = require('child_process');

// API route modules
const statsRouter = require('./api/stats');
const companiesRouter = require('./api/companies');
const jobsRouter = require('./api/jobs');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Boot background scheduler
startScheduler();

// Cleanup on shutdown
process.on('SIGTERM', () => {
  stopScheduler();
  process.exit(0);
});

// ── Modular API Routers ─────────────────────────────────────────────────────
// These supersede the old inline route handlers below. The old handlers
// remain as a safety net until all clients have migrated.
app.use('/api/stats', statsRouter);
app.use('/api/companies', companiesRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/logs', jobsRouter); // logs are also exposed via jobs router at /logs


/**
 * GET /api/stats
 * Dashboard summary statistics
 */
app.get('/api/stats', async (req, res) => {
  try {
    const totalJobs = await prisma.job.count({ where: { status: 'ACTIVE' } });
    const inactiveJobs = await prisma.job.count({ where: { status: 'INACTIVE' } });
    const totalCompanies = await prisma.company.count();
    
    // New jobs in last 24h and 72h
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(Date.now() - 72 * 60 * 60 * 1000);
    
    const newJobs24h = await prisma.job.count({
      where: { status: 'ACTIVE', firstSeen: { gte: oneDayAgo } }
    });
    
    const newJobs72h = await prisma.job.count({
      where: { status: 'ACTIVE', firstSeen: { gte: threeDaysAgo } }
    });

    // Recent crawl logs
    const recentLogs = await prisma.crawlLog.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { company: { select: { name: true } } }
    });

    // Chart data: successful vs failed crawls in last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const logs = await prisma.crawlLog.findMany({
      where: { createdAt: { gte: sevenDaysAgo } }
    });

    // Group logs by date
    const chartData = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      chartData[dateStr] = { date: dateStr, success: 0, failure: 0, newJobs: 0 };
    }

    logs.forEach(log => {
      const dateStr = log.createdAt.toISOString().split('T')[0];
      if (chartData[dateStr]) {
        if (log.status === 'SUCCESS') {
          chartData[dateStr].success++;
          chartData[dateStr].newJobs += log.jobsNew;
        } else {
          chartData[dateStr].failure++;
        }
      }
    });

    res.json({
      totalJobs,
      inactiveJobs,
      totalCompanies,
      newJobs24h,
      newJobs72h,
      recentLogs,
      chartData: Object.values(chartData)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Company Registry API (CRUD)
 */
app.get('/api/companies', async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      include: {
        _count: {
          select: { jobs: { where: { status: 'ACTIVE' } } }
        }
      },
      orderBy: { name: 'asc' }
    });
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/companies', async (req, res) => {
  const { name, careerPageUrl, sourceType, atsProvider, crawlFrequency, apiEndpoint, sourceFingerprint } = req.body;
  try {
    const company = await prisma.company.create({
      data: {
        name,
        careerPageUrl,
        sourceType,
        atsProvider,
        crawlFrequency,
        apiEndpoint,
        sourceFingerprint
      }
    });
    res.status(201).json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/companies/:id', async (req, res) => {
  const { id } = req.params;
  const { name, careerPageUrl, sourceType, atsProvider, crawlFrequency, apiEndpoint, sourceFingerprint } = req.body;
  try {
    const company = await prisma.company.update({
      where: { id },
      data: {
        name,
        careerPageUrl,
        sourceType,
        atsProvider,
        crawlFrequency,
        apiEndpoint,
        sourceFingerprint
      }
    });
    res.json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/companies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.company.delete({ where: { id } });
    res.json({ message: "Company removed from registry" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Manual Crawl Trigger
 */
app.post('/api/companies/:id/crawl', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await processCrawlForCompany(id);
    // Background embed check
    embedMissingJobs().catch(e => console.error("Bg embed error:", e.message));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Single Company: Discover Career Page & Detect ATS
 */
app.post('/api/companies/:id/discover-pipeline', async (req, res) => {
  const { id } = req.params;
  try {
    const pageResult = await discoverCareerPage(id);
    if (!pageResult.success) {
      return res.status(400).json({ error: pageResult.error });
    }
    const atsResult = await detectAts(id);
    res.json({
      careerPageUrl: pageResult.url,
      confidence: pageResult.confidence,
      foundBy: pageResult.method,
      atsProvider: atsResult.atsProvider,
      apiEndpoint: atsResult.apiEndpoint,
      sourceFingerprint: atsResult.sourceFingerprint
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Run Pipeline on All Companies
 */
app.post('/api/companies/discover-all', async (req, res) => {
  try {
    const companies = await prisma.company.findMany();
    let count = 0;
    for (const c of companies) {
      if (!c.website) continue;
      await discoverCareerPage(c.id);
      await detectAts(c.id);
      count++;
    }
    res.json({ message: `Successfully ran discovery pipeline for ${count} companies` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Trigger Company Universe Seeding
 */
app.post('/api/companies/seed-universe', async (req, res) => {
  console.log('[API] Triggering seed company universe...');
  exec('node src/discover-universe.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error seeding universe: ${error}`);
      return res.status(500).json({ error: error.message });
    }
    console.log(`Seeding output: ${stdout}`);
    res.json({ message: 'Company universe seeded successfully', log: stdout });
  });
});


/**
 * Jobs API (Search, Filtering & Semantic Matching)
 */
app.get('/api/jobs', async (req, res) => {
  const { search, companyId, source, freshness, semantic, query, experience, remote, category } = req.query;
  try {
    // Build DB filters using AND array to avoid OR collisions
    const conditions = [{ status: 'ACTIVE' }];

    if (companyId) {
      conditions.push({ companyId });
    }
    if (source) {
      conditions.push({ source });
    }
    if (experience) {
      conditions.push({ experience });
    }
    if (remote === 'true') {
      conditions.push({ remote: true });
    } else if (remote === 'false') {
      conditions.push({ remote: false });
    }
    if (freshness) {
      let hours = null;
      if (freshness === '24h') hours = 24;
      else if (freshness === '48h') hours = 48;
      else if (freshness === '72h') hours = 72;
      
      if (hours) {
        conditions.push({
          firstSeen: {
            gte: new Date(Date.now() - hours * 60 * 60 * 1000)
          }
        });
      }
    }
    if (search) {
      conditions.push({
        OR: [
          { title: { contains: search } },
          { location: { contains: search } },
          { description: { contains: search } }
        ]
      });
    }
    if (category) {
      const lowerCat = category.toLowerCase();
      if (lowerCat === 'ai/ml') {
        conditions.push({
          OR: [
            { title: { contains: 'machine learning' } },
            { title: { contains: 'ml' } },
            { title: { contains: 'ai' } },
            { title: { contains: 'deep learning' } },
            { title: { contains: 'nlp' } },
            { title: { contains: 'computer vision' } },
            { title: { contains: 'applied scientist' } }
          ]
        });
      } else if (lowerCat === 'research') {
        conditions.push({ title: { contains: 'research' } });
      } else if (lowerCat === 'security') {
        conditions.push({ title: { contains: 'security' } });
      } else if (lowerCat === 'devops') {
        conditions.push({
          OR: [
            { title: { contains: 'devops' } },
            { title: { contains: 'sre' } },
            { title: { contains: 'site reliability' } },
            { title: { contains: 'infrastructure' } },
            { title: { contains: 'cloud' } },
            { title: { contains: 'platform' } }
          ]
        });
      } else if (lowerCat === 'data') {
        conditions.push({
          OR: [
            { title: { contains: 'data' } },
            { title: { contains: 'analytics' } },
            { title: { contains: 'database' } }
          ]
        });
      } else if (lowerCat === 'swe') {
        conditions.push({
          OR: [
            { title: { contains: 'software' } },
            { title: { contains: 'developer' } },
            { title: { contains: 'engineer' } },
            { title: { contains: 'frontend' } },
            { title: { contains: 'backend' } },
            { title: { contains: 'full stack' } },
            { title: { contains: 'fullstack' } }
          ]
        });
      }
    }

    const where = { AND: conditions };

    const jobs = await prisma.job.findMany({
      where,
      orderBy: { firstSeen: 'desc' }
    });

    // Handle semantic matching
    if (semantic === 'true') {
      const settings = await prisma.settings.findUnique({ where: { id: 'singleton' } });
      let comparisonEmbedding = null;

      if (query) {
        // Semantic search query
        console.log(`[Semantic API] Generating query embedding for: "${query}"`);
        comparisonEmbedding = await generateEmbedding(query);
      } else if (settings) {
        // Resume matching
        const data = JSON.parse(settings.dataJson);
        if (data.resumeEmbedding) {
          comparisonEmbedding = data.resumeEmbedding;
        }
      }

      if (comparisonEmbedding) {
        const rankedJobs = await rankJobsAgainstResume(comparisonEmbedding, jobs);
        return res.json(rankedJobs);
      }
    }

    // Default return with 0 match score
    res.json(jobs.map(j => ({ ...j, matchScore: null })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Settings API
 */
app.get('/api/settings', async (req, res) => {
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

app.post('/api/settings', async (req, res) => {
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

/**
 * GET /api/logs
 * Retrieve all crawling log history
 */
app.get('/api/logs', async (req, res) => {
  try {
    const logs = await prisma.crawlLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { company: { select: { name: true } } }
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`[Server] Job Discovery Agent listening on port ${PORT}`);
});
