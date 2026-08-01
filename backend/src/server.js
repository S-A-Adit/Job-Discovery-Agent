const fs = require('fs');
const path = require('path');
const dotenvPath = fs.existsSync(path.join(__dirname, '../../../.env'))
  ? path.join(__dirname, '../../../.env')
  : (fs.existsSync(path.join(__dirname, '../../.env')) ? path.join(__dirname, '../../.env') : path.join(__dirname, '.env'));
require('dotenv').config({ path: dotenvPath });
const express = require('express');
const cors = require('cors');

// Scheduler — use new modular scheduler if available, fallback to legacy
let startScheduler, stopScheduler;
try {
  ({ startScheduler, stopScheduler } = require('./scheduler/scheduler'));
} catch (_) {
  ({ startScheduler, stopScheduler } = require('./crawler/scheduler'));
}

// API route modules
const statsRouter = require('./api/stats');
const companiesRouter = require('./api/companies');
const jobsRouter = require('./api/jobs');
const settingsRouter = require('./api/settings');

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
app.use('/api/stats', statsRouter);
app.use('/api/companies', companiesRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/logs', jobsRouter); // logs are also exposed via jobs router at /logs

app.listen(PORT, () => {
  console.log(`[Server] Job Discovery Agent listening on port ${PORT}`);
});
