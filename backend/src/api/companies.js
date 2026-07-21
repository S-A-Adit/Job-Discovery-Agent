const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const prisma = require('../db');
const { processCrawlForCompany } = require('../scraper/scraper');
const { findCareerPage } = require('../discovery/careerFinder');
const { detectAts } = require('../services/discovery-engine');
const { embedMissingJobs } = require('../services/recommendation');

// GET all companies
router.get('/', async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      include: { _count: { select: { jobs: { where: { status: 'ACTIVE' } } } } },
      orderBy: { name: 'asc' }
    });
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create company
router.post('/', async (req, res) => {
  const { name, careerPageUrl, sourceType, atsProvider, crawlFrequency, apiEndpoint, sourceFingerprint } = req.body;
  try {
    const company = await prisma.company.create({
      data: { name, careerPageUrl, sourceType, atsProvider, crawlFrequency, apiEndpoint, sourceFingerprint }
    });
    res.status(201).json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update company
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, careerPageUrl, sourceType, atsProvider, crawlFrequency, apiEndpoint, sourceFingerprint } = req.body;
  try {
    const company = await prisma.company.update({
      where: { id },
      data: { name, careerPageUrl, sourceType, atsProvider, crawlFrequency, apiEndpoint, sourceFingerprint }
    });
    res.json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE company
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.company.delete({ where: { id } });
    res.json({ message: 'Company removed from registry' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST manual crawl trigger
router.post('/:id/crawl', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await processCrawlForCompany(id);
    embedMissingJobs().catch(e => console.error('Bg embed error:', e.message));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST single company discover pipeline (careerFinder + ATS detection)
router.post('/discover-all', async (req, res) => {
  try {
    const companies = await prisma.company.findMany({ where: { status: 'ACTIVE' } });
    let count = 0;
    for (const c of companies) {
      if (!c.website) continue;
      await findCareerPage(c.id);
      await detectAts(c.id);
      count++;
    }
    res.json({ message: `Discovery pipeline ran for ${count} companies` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/discover-pipeline', async (req, res) => {
  const { id } = req.params;
  try {
    const pageResult = await findCareerPage(id);
    if (!pageResult.success) return res.status(400).json({ error: pageResult.error });
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

// POST seed company universe
router.post('/seed-universe', async (req, res) => {
  console.log('[API] Triggering multi-source company seed...');
  exec('node src/company/seedCompanies.js', (error, stdout, stderr) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Company seeding complete', log: stdout });
  });
});

module.exports = router;
