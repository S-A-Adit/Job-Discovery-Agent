# 📄 Product Requirements Document (PRD): Job Discovery Agent

## 1. Document Control
*   **Product Name**: Job Discovery Agent
*   **Version**: 1.0.0
*   **Status**: Approved
*   **Target Release**: Q3 2026
*   **Authors**: DeepMind Antigravity Pair-Programmer

---

## 2. Problem Statement
For active job seekers, finding matching roles is a fragmented, manual process. Aggregator platforms (like LinkedIn or Indeed) are flooded with expired listings, sponsored ads, and "phantom" job postings. When users find openings, they must manually evaluate if their skills align, leading to massive fatigue and low application efficiency.

Existing scraping and aggregation systems fail due to:
1.  **High Search Engine/API Cost**: Running automated web search queries (like Google Search, Tavily) to verify careers pages exhausts API quotas instantly when scaled across thousands of companies.
2.  **Lack of Semantic Context**: Keyword matching (e.g., searching "React") fails to identify context, experience depth, or semantic compatibility with a candidate's specific background.
3.  **WAF Blocks**: Enterprise portals (especially Workday) leverage Cloudflare WAF protections that block standard programmatic HTTP crawls.
4.  **No Direct ATS Integration**: Scrapers parse front-end HTML tables, which regularly shift and break, instead of connecting directly to verified applicant tracking system (ATS) APIs.

---

## 3. Goals
The core objective of the Job Discovery Agent is to automate the extraction, normalization, and semantic ranking of job postings directly from primary ATS interfaces.

*   **ATS-First Reverse Discovery**: Index companies directly by probing public ATS board endpoints (Greenhouse, Lever, Ashby, Workday, SmartRecruiters) to avoid search engine usage entirely.
*   **Semantic Matching Engine**: Evaluate job description relevance using Gemini API vector embeddings to compute compatibility metrics against the seeker's resume.
*   **Obsolescence Verification**: Maintain registry health via automated, weekly link checking and self-healing career URL discovery.
*   **Anti-Bot Resiliency**: Employ headless browser crawlers to bypass scraper protection blocks on enterprise systems.
*   **Secure Local Storage**: Keep job lists, crawl logs, resume profiles, and API configuration keys safely stored on the user's local device inside SQLite database files.

---

## 4. Non-Goals
*   **Fully Autonomous Auto-Apply Submission**: The Job Discovery Agent does not submit applications. It collects and ranks matches, passing them to the browser extension for human-controlled filling.
*   **Hosted Cloud Database Aggregator**: We do not provide a centralized SaaS database hosting other users' jobs. It is a local tool running on the applicant's machine.
*   **Multi-User Tenant Access**: The system is designed for single-user operation using localized environment configurations.

---

## 5. User Personas

### Persona A: The Targeted Specialist (Taylor)
*   **Profile**: Senior ML Engineer seeking niche positions matching a specialized skill set (e.g., PyTorch, CUDA, distributed systems).
*   **Aspiration**: Wants to find highly compatible listings across 1,000+ tech companies and startups daily.
*   **Pain Points**: Tired of weeding through generic "Software Engineer" posts on LinkedIn. Needs to know instantly if the skills required map to their profile.

### Persona B: The High-Volume Explorer (Jordan)
*   **Profile**: New graduate seeking developer roles at active, venture-backed companies.
*   **Aspiration**: Needs to monitor hiring activity across the entire CNCF landscape and YC companies.
*   **Pain Points**: Finds that many tech companies have outdated careers pages or have closed their programs without updating job boards. Needs absolute confirmation that boards are active.

---

## 6. User Stories

*   **US-1: Automated Crawling Scheduler**
    *   *As a* job seeker,
    *   *I want* the agent to run background crawl schedules across my company registry,
    *   *So that* my dashboard is always updated with the freshest job openings without manual intervention.
*   **US-2: Semantic Compatibility Score**
    *   *As a* targeted applicant,
    *   *I want* to see a percentage similarity ranking comparing my uploaded resume with crawled job postings,
    *   *So that* I can focus my energy on the best matching roles.
*   **US-3: Cryptographic Deduplication**
    *   *As a* user,
    *   *I want* the agent to ignore jobs I have already seen or that have been crawled previously,
    *   *So that* I do not waste time reviewing duplicate listings.
*   **US-4: Career URL Re-Verification (Self-Healing)**
    *   *As a* crawler manager,
    *   *I want* the system to check if stored career links are broken and automatically attempt to re-discover them,
    *   *So that* my company registry remains clean and functional.
*   **US-5: Tavily-Free Direct Ingestion**
    *   *As an* API manager,
    *   *I want* the system to register companies directly from ATS databases without running search engine calls,
    *   *So that* I do not exhaust my web search API credits.
*   **US-6: Interactive Credit Budget Control**
    *   *As a* user running large-scale discovery sessions,
    *   *I want* to be prompted before any Tavily search credits are consumed and notified at every 100-credit milestone,
    *   *So that* I can make informed decisions about whether to continue spending credits or stop the pipeline.

---

## 7. MVP Scope

### 1. Seeding & Discovery Engines (`src/company/`)
*   `seedCompanies.js`: Multi-source seeder pulling from Fortune indices and active GitHub trackers.
*   `discoverNewSources.js`: Scans the CNCF landscape, sponsor records, and Product Hunt.
*   `atsDiscovery.js` & `slugSources.js`: Direct ATS-first company extraction via API board probing. Prompts user before each provider probe section using the shared credit tracker.
*   `enrichCompanies.js`: Weekly link verifier to clean out broken or dead career sites.

### 2. Credit Budget Manager (`src/utils/creditTracker.js`)
*   Module-level singleton shared across all pipelines in a single Node process.
*   `askPermission(prompt)` — interactive y/n stdin prompt before Phase 4 triggers; auto-approves in non-TTY environments or when `AUTO_APPROVE_TAVILY=true` is set.
*   `incrementCredit(query)` — increments the session counter and prints a live running total after each successful Tavily API call.
*   `checkCreditThreshold()` — pauses the pipeline and prompts to continue or stop at every 100-credit mark. Throws `CRAWLER_PAUSED_BY_USER` on denial.
*   `getSessionCredits()` — read-only getter used for summary output at the end of pipeline runs.

### 2. Career Page Finder & ATS Detection (`src/discovery/`)
*   `careerFinder.js`: Orchestrator checking path structures, robots.txt, and fallback searches.
*   `homepageCrawler.js`: Page scanner checking for embedded ATS fingerprints.

### 3. Job Crawler & Adapters (`src/ats/`, `src/scraper/`, `src/scheduler/`)
*   Provider-specific adapters for Greenhouse, Lever, Ashby, Workday, and SmartRecruiters.
*   Cryptographic hash generator mapping `sha256(companyName + title + location + jobId)` for unique database keys.
*   Background queue manager (`scheduler.js`) triggering crawler processes based on company schedules.

### 4. Semantic Matcher & Local API Server (`src/services/`, `src/api/`, `src/server.js`)
*   Google Gemini similarity calculations and resume vector embeddings.
*   Modular Express routers exposing `/api/companies`, `/api/jobs`, `/api/stats`, and `/api/logs`.

### 5. Premium Dashboard UI (`frontend/`)
*   React dashboard displaying company registry stats, compatibility matches, and crawl telemetry.

---

## 8. Future Scope
*   **Direct Sync Handshake**: Passing high-compatibility matches directly to the chrome extension database to auto-launch the application window.
*   **Push Alerts**: Integrating Slack/Discord webhooks to notify the user of >85% vector similarity score matches immediately upon database ingestion.
*   **Cover Letter Drafter**: Generating dynamic, context-aware cover letters directly within the dashboard using the crawled job description.

---

## 9. Success Metrics
*   **Crawl Latency**: Average company board crawl time under 1.5 seconds.
*   **Zero Search Credit Waste**: 100% of companies processed through `atsDiscovery.js` require zero search engine queries.
*   **Perfect Matching Alignment**: Semantic scoring maps closely to human rating evaluations (target matching alignment >= 85%).
*   **Listing Deduplication Integrity**: Zero duplicated listings written to the SQLite database.
*   **Credit Tracking Accuracy**: Session Tavily credit count matches actual Tavily API call count with 100% precision, verified by comparing `getSessionCredits()` output against the Tavily usage dashboard.
