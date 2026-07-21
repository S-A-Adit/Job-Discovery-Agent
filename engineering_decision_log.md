# Combined Architecture Decision Records & Engineering Trade‑offs

---

## Engineering Trade‑offs

### 1. Direct API Crawling vs. DOM Scraping

**Direct REST API Crawling (Lever, Greenhouse, Ashby, SmartRecruiters)**
- **Pros:** Extremely fast (under 1s), highly reliable, structured payload (no selector changes breaking layout).
- **Cons:** Dependent on vendor API endpoints remaining public and unauthenticated.
- **Decision:** Prioritize REST API endpoints for job retrieval. Fallback to Puppeteer DOM crawling only for custom company portals or Workday pages that require visual DOM rendering.

---

### 2. Local Embedding Storage & Calculations

**JSON Float Arrays in SQLite**
- **Pros:** Privacy-first (all resumes and matches remain local), zero hosting fees, zero network overhead compared to cloud vector databases (Pinecone/Weaviate).
- **Cons:** Vector similarity search (cosine distance) is computed in Node runtime memory rather than indexed database lookups.
- **Decision:** Store the vector floats as JSON strings in the SQLite `embedding` column of the `Job` model. Compute vector cosine similarity in memory upon dashboard query, as typical search volumes are limited to the user's active match feed (<10,000 active jobs).

---

### 3. Job Deduplication Mapping

**Cryptographic SHA-256 Composite Hash**
- **Pros:** 100% reliable identification of duplicate listings. Prevents database bloating from recurrent daily crawls.
- **Cons:** If a company modifies their job title slightly (e.g., "Software Engineer" to "Software Engineer - React"), it generates a new hash.
- **Decision:** Compute job hashes as `sha256(companyName + title + location + jobId)`. Store this in a unique `hash` column to enforce database-level deduplication.

---

### 4. Career Page Discovery Strategy

**Tavily Search Fallback vs. Direct ATS Probing**
- **Pros:** Using direct ATS probing (`atsDiscovery.js`) consumes zero Tavily search API quotas. Tavily fallbacks allow us to resolve unstructured websites.
- **Decision:** Operate a dual-pipeline discovery system. Use the forward pipeline (robots.txt, homepage crawl, Tavily fallback) for broad, unstructured lists, and run the reverse pipeline (`atsDiscovery.js`) to ingest pre-validated company pools instantly.

---

### 5. Tavily Credit Budget Management

**Why a Shared Singleton Module vs. Inline Counters?**
- **Pros:** A module-level singleton counter (`src/utils/creditTracker.js`) is shared across all pipelines in one Node process. Credits from `tavilySearch.js` (called by `run_discovery.js`) and from any future Tavily calls in `atsDiscovery.js` count toward the same session budget, preventing double-counting blind spots.
- **Cons:** Module-level state is process-scoped only; if two separate processes run simultaneously they will each have independent counters. This is acceptable since typical usage runs one pipeline at a time.
- **Decision:** Use a single `creditTracker.js` module exporting `incrementCredit`, `checkCreditThreshold`, `askPermission`, and `getSessionCredits`. Import it in every file that can trigger Tavily calls.

**Why TTY detection + `AUTO_APPROVE_TAVILY` env flag?**
- **Pros:** Interactive prompts are useful during manual developer runs but block automated CI/background processes indefinitely if not gated.
- **Decision:** Check `process.stdin.isTTY` before prompting. Automatically skip prompts when running in a non-interactive context. Provide `AUTO_APPROVE_TAVILY=true` as an explicit override for production scheduler runs.

---

## ADR‑001 – Why SQLite?

**Decision:** SQLite (`job-agent.db`)

**Alternatives:** PostgreSQL, MongoDB

**Reason:**
- Runs completely locally on the user's computer.
- Requires zero system configuration or background database service daemons.
- Matches our privacy-first design: resume content and target jobs remain local.
- High developer velocity and simple database backups.

**Trade‑offs:**
- Concurrency write locks can block if multiple background crawl tasks attempt to write simultaneously. Handled by scheduling runs sequentially.

---

## ADR‑002 – Why Prisma?

**Decision:** Prisma ORM

**Alternatives:** Sequelize, Knex.js, Raw SQL Queries

**Reason:**
- Strongly typed client client module generated under `src/generated/client` to isolate from other apps.
- Clear migrations system schema mapping.
- Clean relation management (e.g. `Company` to `Job` cascading deletes).

**Trade‑offs:**
- Extra dependency layer.
- SQLite client compilation requires localized directory configuration.

---

## ADR‑003 – Why Express?

**Decision:** Express.js

**Alternatives:** Fastify, Koa

**Reason:**
- Lightweight REST routing framework.
- Robust ecosystem of middlewares (CORS, body parser).
- Low setup overhead to serve local dashboard requests.

**Trade‑offs:**
- Standardized architecture must be manually configured (implemented modularly under `src/api/`).

---

## ADR‑004 – Why React + Vite?

**Decision:** React + Vite Frontend (Port 5173)

**Alternatives:** Next.js, HTML/JS Server-rendered Views

**Reason:**
- Static compilation makes it easy to serve locally.
- Lightning-fast development server (HMR).
- Component reuse for rendering dashboards, crawl telemetry graphs, and compatibility matching lists.

**Trade‑offs:**
- Requires launching a separate command task concurrently with the backend (managed via `npm run dev:job`).

---

## ADR‑005 – Why Google Gemini Embeddings?

**Decision:** Google Gemini Embeddings API (`text-embedding-004`)

**Alternatives:** OpenAI Embeddings, HuggingFace Local Models (transformers.js)

**Reason:**
- High semantic fidelity and alignment to developer resume matching.
- Free-tier accessibility for normal job search volumes.
- Simpler client-side code compared to loading large localized embedding models into browser runtime memory.

**Trade‑offs:**
- Requires outbound internet requests and active API key configuration.

---

## ADR‑006 – Why a Shared `creditTracker.js` Module?

**Decision:** Module-level singleton in `src/utils/creditTracker.js`

**Alternatives:** Inline counter per file, Global process environment variable, External Redis counter

**Reason:**
- Node.js module caching guarantees the same singleton instance is returned everywhere within a process — no external dependencies needed.
- Clean separation of concerns: all Tavily budget logic lives in one file, not duplicated across `tavilySearch.js` and `atsDiscovery.js`.
- Easy to extend: future pipelines only need to `require('../utils/creditTracker')` to participate in the shared budget.

**Trade‑offs:**
- State resets on every process restart. Persistent cross-session credit tracking would require writing to SQLite `Settings` table — a future enhancement if needed.
