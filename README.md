# 🔍 Job Discovery Agent

An AI-powered job discovery crawler and dashboard featuring Greenhouse, Lever, Ashby, Workday, and Google Careers adapters, timestamp resolution, rate limiting, and a premium React-based dashboard.

## 📂 Structure
* **`backend/`**: Crawler service & Express API (Port `5001`, SQLite `job-agent.db`)
* **`frontend/`**: React + Vite Dashboard (Port `5173`)

## 🚀 Getting Started

### 📋 Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [Google Gemini API Key](https://ai.google.dev/) (required for job embeddings)
* [Tavily API Key](https://tavily.com/) (optional, for web-search fallbacks in career discovery)

### Step 1: Install Dependencies
From the root directory, install workspace packages:
```bash
npm install
```

### Step 2: Initialize Discovery Database
```bash
# Push schema & generate client for Job-Discovery-Agent
npm run prisma:migrate --workspace=backend

# Seed initial companies
npm run prisma:seed --workspace=backend
```

### Step 3: Start Discovery Suite
You can launch both the backend Express server (Port `5001`) and Vite frontend dashboard (Port `5173`) concurrently:
```bash
npm run dev
```

* **Backend API**: [http://localhost:5001/api](http://localhost:5001/api)
* **Frontend Dashboard**: [http://localhost:5173/](http://localhost:5173/)

## ⚙️ Discovery & Seeding Pipeline Scripts
For the Job-Discovery-Agent application, there are several CLI utility scripts located in `backend` to run the company seeding and discovery pipelines.

Navigate to `backend` before running these scripts:
```bash
cd backend
```

### 1. Seeding Companies
Seed the database from primary sources (Fortune 500, NASDAQ, S&P indices, and GitHub internship trackers):
```bash
node src/company/seedCompanies.js
# Optional dry-run flag:
node src/company/seedCompanies.js --dry-run
```

### 2. Advanced Source Discovery
Harvest additional tech companies from the CNCF Landscape, pycon/kubecon conference sponsors, and trending Product Hunt lists:
```bash
node src/company/discoverNewSources.js
```

### 3. ATS-First Reverse Discovery (Tavily-Free)
Extract hiring companies directly by probing public job board endpoints from Lever, Greenhouse, Ashby, Workday, and SmartRecruiters without using web search quota:
```bash
node src/company/atsDiscovery.js
```

### 4. Bulk CSV Import
Import a massive dataset (e.g., from Kaggle) and dynamically scrape the first N new companies safely:
```bash
node src/company/importCsv.js /path/to/dataset.csv 50
```

### 5. Manual Bite-Sized Batch Scraping
Manually churn through unscraped companies in bite-sized chunks so you can safely shut down your IDE when finished. It prioritizes new/unscraped companies and remembers where you left off.
```bash
# Morning (30 mins free): Churns through 100 new companies and exits
node src/company/scrapeBatch.js 100

# Evening (2 hours free): Churns through 400 different companies
node src/company/scrapeBatch.js 400
```

### 6. Career Page Finder & ATS Detection
Verify placeholders and discover career pages using the 4-phase finder (checking path patterns, robots.txt, homepage crawls, and Tavily fallbacks):
```bash
node scratch/run_discovery.js
```

### 7. Link Re-Verification (Url Alive Checks)
Run weekly verification checks on existing career URLs and re-discover pages if links return 4xx/5xx responses:
```bash
node src/company/enrichCompanies.js
```

### 8. Manual Crawler Test
Test crawl jobs for specific companies directly from the terminal:
```bash
node src/test-crawler.js Cloudflare
node src/test-crawler.js Figma
```

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
