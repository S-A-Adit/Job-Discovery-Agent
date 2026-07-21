const express = require('express');
const router = express.Router();
const prisma = require('../db');

/**
 * GET /api/stats
 * Dashboard summary statistics
 */
router.get('/', async (req, res) => {
  try {
    const totalJobs = await prisma.job.count({ where: { status: 'ACTIVE' } });
    const inactiveJobs = await prisma.job.count({ where: { status: 'INACTIVE' } });
    const totalCompanies = await prisma.company.count();

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(Date.now() - 72 * 60 * 60 * 1000);

    const newJobs24h = await prisma.job.count({ where: { status: 'ACTIVE', firstSeen: { gte: oneDayAgo } } });
    const newJobs72h = await prisma.job.count({ where: { status: 'ACTIVE', firstSeen: { gte: threeDaysAgo } } });

    const recentLogs = await prisma.crawlLog.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { company: { select: { name: true } } }
    });

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const logs = await prisma.crawlLog.findMany({ where: { createdAt: { gte: sevenDaysAgo } } });

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
        if (log.status === 'SUCCESS') { chartData[dateStr].success++; chartData[dateStr].newJobs += log.jobsNew; }
        else { chartData[dateStr].failure++; }
      }
    });

    res.json({ totalJobs, inactiveJobs, totalCompanies, newJobs24h, newJobs72h, recentLogs, chartData: Object.values(chartData) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
