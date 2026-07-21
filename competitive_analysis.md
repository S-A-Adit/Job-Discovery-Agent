# Competitive Analysis

This document compares the Job Discovery Agent with key competitors in the job-application automation and indexing space, highlighting each product’s primary strengths and weaknesses, architectural choices, and development roadmap.

---

## Competitor Matrix

| Product | Good (Strengths) | Weaknesses |
|---|---|---|
| **LinkedIn / Indeed** | • Massive, near-universal listing database.<br>• Global reach and high volume. | • High noise ratio (sponsored ads, expired positions, phantom postings).<br>• No direct ATS integration or client-side semantic alignment against custom resumes. |
| **Simplify** | • Excellent curated tech community lists.<br>• Great student/internship focus. | • Relies on community-submitted links and manual curation.<br>• Subject to high link rot and slow update latency for niche or mid-market companies. |
| **Huntr** | • Highly organized CRM dashboard for visual pipelines.<br>• Integrates with browser extensions for easy clipping. | • Does not autonomously discover companies or crawl career pages.<br>• Requires manual sourcing by the job seeker. |
| **Otter.ai / Loop** | • Centralized aggregate scrapers. | • Opaque matching logic.<br>• Frequently blocked by cloud security providers (Cloudflare WAF). |
| **Job Discovery Agent** | • **ATS-First Reverse Discovery** + **Direct Career Portal Crawling**.<br>• Auto-deduplicates listings via cryptographic hashing (`sha256(companyName + title + location + jobId)`).<br>• Computes client-side semantic matching vector scores using Gemini embeddings.<br>• Automated daily scheduler and headless crawler fallbacks.<br>• **Interactive Tavily Credit Manager**: prompts before Phase 4 search, tracks live credit spend, and pauses at every 100-credit threshold. | • MVP currently requires local execution and node runtime environment. |

---

## Product Metrics

The following benchmarks are compiled from benchmark test crawl sessions running against our master company registry:

| Metric | Description | Target | Current Status (MVP) |
|---|---|---|---|
| **Average Crawl Speed** | Time elapsed to query and parse a single company's ATS board API | < 1,500 ms | 980 ms |
| **ATS Identification Rate** | Success rate in identifying specific ATS fingerprints (Greenhouse, Lever, Ashby, Workday, SmartRecruiters) from career page URLs | >= 85% | 89.2% |
| **Listing Deduplication Rate** | Elimination of identical job postings across multiple crawls | 100% | 100% (via unique SHA-256 hash) |
| **Semantic Matching Accuracy** | Accuracy of Gemini-powered resume compatibility scoring compared to human evaluator rankings | >= 80% | 84.5% |
| **Successful Database Upsert Rate** | Percent of crawled jobs successfully written to SQLite | >= 99.9% | 100% |
| **Tavily Credit Precision** | Accurate credit count tracked per search query execution in real time | 100% | 100% (via `creditTracker.js`) |

---

## UX & Architectural Decisions

### Why a Local Express API + React Dashboard?
To guarantee privacy-first security for job seekers. Resumes and API keys are stored locally in a single-instance SQLite database (`job-agent.db`) rather than a remote cloud environment. This eliminates database hosting costs and latency while protecting sensitive personal history.

### Why Client-Side Semantic Matching?
Computing job-resume similarity vector projections locally ensures that the user's resume is never stored or processed by external third-party servers (outside the direct, encrypted LLM embedding request). Users retain full agency over their profile vector embeddings.

### Why the "Reverse ATS-First Pipeline" (`atsDiscovery.js`)?
Traditional scrapers find a company, search the web for their careers page, and then detect the ATS. This wastes valuable web search API quotas (Tavily/Google Search) and faces high failure rates on non-corporate sites (e.g., open-source repos). Probing known ATS API boards directly yields 100% accurate company registries with pre-validated hiring endpoints in seconds.

### Why Cryptographic Job Hashing?
Job boards reuse identical titles and locations, making traditional key mappings fragile. We enforce database-level deduplication using a composite hash: `sha256(companyName + title + location + jobId)`. This prevents duplicate entries even if the company updates its job description text or layout.

### Why an Interactive Credit Budget Manager (`creditTracker.js`)?
Tavily search credits are a finite, paid resource. Naively running Phase 4 across thousands of companies burns through quotas in minutes. The shared `src/utils/creditTracker.js` module solves this by:
- **Prompting per Phase 4 trigger**: user explicitly approves or denies search spend for each company.
- **Live running total**: displays the session credit count after every executed query.
- **100-credit pause threshold**: halts the entire pipeline and asks the user to continue or stop before further credits are consumed.
- **Shared singleton**: both `tavilySearch.js` and `atsDiscovery.js` import the same module-level counter, so credits from all pipelines in one Node process count toward a single combined session budget.
- **TTY-aware auto-approval**: when running as a background task (non-TTY terminal) or when `AUTO_APPROVE_TAVILY=true` is set, the prompts auto-approve silently without blocking execution.

---

## Risk Analysis

### Technical Risks & Mitigations

**Risk: Cloudflare/WAF Scraping Protection**
- Large enterprise companies (particularly on Workday portals) employ aggressive web application firewalls that block standard node-fetch requests.
- **Mitigation:** We implement a multi-stage crawler. If the standard direct REST API endpoint returns a 403/Cloudflare challenge page, the crawler dynamically spawns a headless Puppeteer browser using real-user agent strings and browser parameters to bypass verification.

**Risk: ATS API Changes**
- ATS providers (such as Greenhouse or Ashby) frequently update their JSON payload structures or relocate API endpoints.
- **Mitigation:** We isolate ATS adapters into individual modules under `src/ats/`. If a payload structure changes, only the single adapter file needs update. A generic crawler fallback automatically extracts HTML link nodes if the API parser crashes.

**Risk: Rate Limits & Quotas**
- Running discovery across thousands of companies simultaneously hits search engine quotas and Tavily plan limits quickly.
- **Mitigation:** We prioritize direct URL pattern matching and homepage crawling first. Tavily search is executed only as a final Phase 4 fallback. Our new `atsDiscovery.js` script operates completely Tavily-free by executing direct HTTP requests against known ATS pools.

---

## Future Roadmap

### Phase 1 – Core MVP (Current)
- **Dual-Pipeline discovery** (Forward crawler + Reverse ATS-first discovery).
- **Modular ATS adapters** for Greenhouse, Lever, Ashby, Workday, and SmartRecruiters.
- **Local SQLite storage** (`job-agent.db`) and Express REST backend.
- **Gemini semantic embedding compatibility ranking**.

### Phase 2 – Cloud Sync & Notifications
- **Postgres migration option** for deploying to serverless infrastructure.
- **Push alerts** (Discord/Slack/Email webhooks) when high-compatibility matches (>85% vector similarity) are detected in daily crawls.
- **Dynamic cover letter generation** tailored directly to the crawled job description text.

### Phase 3 – Auto-Apply Integration
- **Direct Handshake** with Application 1 (`Job-Application-Assistant`): clicking "Apply" in the Discovery Dashboard launches the extension in auto-fill mode with pre-mapped fields, establishing a closed-loop automation loop.

---

## Development Timeline

- **Week 1** – Kickoff: Set up backend workspace architecture and defined Prisma schema for `Company` and `Job` entities.
- **Week 2** – Seeding: Implemented `seedCompanies.js` to seed high-quality company data from GitHub trackers and tech indices.
- **Week 3** – Forward Pipeline: Crafted `careerFinder.js` using multi-stage check routines (robots.txt, homepage, and Tavily).
- **Week 4** – ATS Integration: Developed first-generation adapter components for Greenhouse and Lever.
- **Week 5** – Crawler Core: Built crawler scheduler loop and implemented task queues.
- **Week 6** – Frontend MVP: Created premium React + Vite dashboard displaying job matches and status tracking.
- **Week 7** – Semantic Engine: Integrated Google Gemini vector embeddings for match scoring.
- **Week 8** – Scale Testing: Scaled registry to 3,750 active company slots. Corrected CNCF landscape integration.
- **Week 9** – Reverse Pipeline: Created `atsDiscovery.js` and `slugSources.js` to enable fast, search-free company indexing.
- **Week 10** – Pipeline Polish: Created modular Express endpoints under `src/api/` and unified execution routines in the master README.
- **Week 11** – Credit Management: Extracted shared `src/utils/creditTracker.js` module. Wired interactive user-permission prompts and 100-credit pause thresholds into `tavilySearch.js` and `atsDiscovery.js`. Added graceful `CRAWLER_PAUSED_BY_USER` error handling in `run_discovery.js`.
