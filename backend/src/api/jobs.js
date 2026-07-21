const express = require('express');
const router = express.Router();
const prisma = require('../db');
const { generateEmbedding, rankJobsAgainstResume } = require('../services/recommendation');

// GET /api/jobs — Search, filter, semantic matching
router.get('/', async (req, res) => {
  const { search, companyId, source, freshness, semantic, query, experience, remote, category } = req.query;
  try {
    const conditions = [{ status: 'ACTIVE' }];

    if (companyId)   conditions.push({ companyId });
    if (source)      conditions.push({ source });
    if (experience)  conditions.push({ experience });
    if (remote === 'true')  conditions.push({ remote: true });
    if (remote === 'false') conditions.push({ remote: false });

    if (freshness) {
      const hours = freshness === '24h' ? 24 : freshness === '48h' ? 48 : freshness === '72h' ? 72 : null;
      if (hours) conditions.push({ firstSeen: { gte: new Date(Date.now() - hours * 3600 * 1000) } });
    }

    if (search) {
      conditions.push({ OR: [
        { title: { contains: search } },
        { location: { contains: search } },
        { description: { contains: search } }
      ] });
    }

    if (category) {
      const lowerCat = category.toLowerCase();
      if (lowerCat === 'ai/ml') {
        conditions.push({ OR: [
          { title: { contains: 'machine learning' } }, { title: { contains: 'ml' } },
          { title: { contains: 'ai' } }, { title: { contains: 'deep learning' } },
          { title: { contains: 'nlp' } }, { title: { contains: 'computer vision' } },
          { title: { contains: 'applied scientist' } }
        ] });
      } else if (lowerCat === 'research') {
        conditions.push({ title: { contains: 'research' } });
      } else if (lowerCat === 'security') {
        conditions.push({ title: { contains: 'security' } });
      } else if (lowerCat === 'devops') {
        conditions.push({ OR: [
          { title: { contains: 'devops' } }, { title: { contains: 'sre' } },
          { title: { contains: 'site reliability' } }, { title: { contains: 'infrastructure' } },
          { title: { contains: 'cloud' } }, { title: { contains: 'platform' } }
        ] });
      } else if (lowerCat === 'data') {
        conditions.push({ OR: [
          { title: { contains: 'data' } }, { title: { contains: 'analytics' } },
          { title: { contains: 'database' } }
        ] });
      } else if (lowerCat === 'swe') {
        conditions.push({ OR: [
          { title: { contains: 'software' } }, { title: { contains: 'developer' } },
          { title: { contains: 'engineer' } }, { title: { contains: 'frontend' } },
          { title: { contains: 'backend' } }, { title: { contains: 'full stack' } },
          { title: { contains: 'fullstack' } }
        ] });
      }
    }

    const jobs = await prisma.job.findMany({ where: { AND: conditions }, orderBy: { firstSeen: 'desc' } });

    if (semantic === 'true') {
      const settings = await prisma.settings.findUnique({ where: { id: 'singleton' } });
      let comparisonEmbedding = null;

      if (query) {
        comparisonEmbedding = await generateEmbedding(query);
      } else if (settings) {
        const data = JSON.parse(settings.dataJson);
        if (data.resumeEmbedding) comparisonEmbedding = data.resumeEmbedding;
      }

      if (comparisonEmbedding) {
        const rankedJobs = await rankJobsAgainstResume(comparisonEmbedding, jobs);
        return res.json(rankedJobs);
      }
    }

    res.json(jobs.map(j => ({ ...j, matchScore: null })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/logs — Crawl history
router.get('/logs', async (req, res) => {
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

module.exports = router;
