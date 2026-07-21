import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Building2, 
  ListTodo, 
  Settings as SettingsIcon, 
  Search, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Edit, 
  ExternalLink, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  MapPin, 
  Clock, 
  Sparkles, 
  ChevronRight,
  Filter
} from 'lucide-react';

const API_BASE = 'http://localhost:5001/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [logs, setLogs] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [crawlingId, setCrawlingId] = useState(null);
  
  // Modals
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Form States
  const [companyForm, setCompanyForm] = useState({
    name: '',
    careerPageUrl: '',
    sourceType: 'ATS',
    atsProvider: 'Greenhouse',
    crawlFrequency: '1h',
    apiEndpoint: '',
    sourceFingerprint: ''
  });

  const [settingsForm, setSettingsForm] = useState({
    GEMINI_API_KEY: '',
    GEMINI_API_KEY_MASKED: '',
    GEMINI_MODEL: 'gemini-2.0-flash',
    resumeText: '',
    preferences: {
      desiredRoles: [],
      desiredLocations: [],
      matchThreshold: 0.65
    }
  });

  // Filter States
  const [filters, setFilters] = useState({
    search: '',
    companyId: '',
    source: '',
    freshness: '',
    semantic: false,
    query: '',
    experience: '',
    remote: '',
    category: ''
  });

  // Fetch Stats
  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error("Error fetching stats:", e);
    }
  };

  // Fetch Companies
  const fetchCompanies = async () => {
    try {
      const res = await fetch(`${API_BASE}/companies`);
      const data = await res.json();
      setCompanies(data);
    } catch (e) {
      console.error("Error fetching companies:", e);
    }
  };

  // Fetch Jobs
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.companyId) queryParams.append('companyId', filters.companyId);
      if (filters.source) queryParams.append('source', filters.source);
      if (filters.freshness) queryParams.append('freshness', filters.freshness);
      if (filters.experience) queryParams.append('experience', filters.experience);
      if (filters.remote) queryParams.append('remote', filters.remote);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.semantic) {
        queryParams.append('semantic', 'true');
        if (filters.query) queryParams.append('query', filters.query);
      }

      const res = await fetch(`${API_BASE}/jobs?${queryParams.toString()}`);
      const data = await res.json();
      setJobs(data);
    } catch (e) {
      console.error("Error fetching jobs:", e);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Logs
  const fetchLogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/logs`);
      const data = await res.json();
      setLogs(data);
    } catch (e) {
      console.error("Error fetching logs:", e);
    }
  };

  // Fetch Settings
  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      const data = await res.json();
      setSettings(data);
      setSettingsForm({
        GEMINI_API_KEY: '',
        GEMINI_API_KEY_MASKED: data.GEMINI_API_KEY_MASKED || '',
        GEMINI_MODEL: data.GEMINI_MODEL || 'gemini-2.0-flash',
        resumeText: data.resumeText || '',
        preferences: data.preferences || { desiredRoles: [], desiredLocations: [], matchThreshold: 0.65 }
      });
    } catch (e) {
      console.error("Error fetching settings:", e);
    }
  };

  // Initial Boot
  useEffect(() => {
    fetchStats();
    fetchCompanies();
    fetchJobs();
    fetchLogs();
    fetchSettings();
  }, []);

  // Update jobs when filters update
  useEffect(() => {
    fetchJobs();
  }, [filters.companyId, filters.source, filters.freshness, filters.semantic, filters.experience, filters.remote, filters.category]);

  // Handle Manual Crawl
  const triggerCrawl = async (id, name) => {
    setCrawlingId(id);
    try {
      const res = await fetch(`${API_BASE}/companies/${id}/crawl`, { method: 'POST' });
      const data = await res.json();
      alert(`Crawl completed for ${name}! Found: ${data.jobsFound}, New: ${data.jobsNew}`);
      fetchStats();
      fetchCompanies();
      fetchJobs();
      fetchLogs();
    } catch (e) {
      alert(`Crawl failed for ${name}: ${e.message}`);
    } finally {
      setCrawlingId(null);
    }
  };

  // Save Company
  const handleSaveCompany = async (e) => {
    e.preventDefault();
    try {
      const url = editingCompany 
        ? `${API_BASE}/companies/${editingCompany.id}` 
        : `${API_BASE}/companies`;
      const method = editingCompany ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyForm)
      });

      if (!res.ok) throw new Error("Failed to save company");

      setCompanyModalOpen(false);
      setEditingCompany(null);
      setCompanyForm({
        name: '',
        careerPageUrl: '',
        sourceType: 'ATS',
        atsProvider: 'Greenhouse',
        crawlFrequency: '1h',
        apiEndpoint: '',
        sourceFingerprint: ''
      });
      fetchCompanies();
      fetchStats();
    } catch (err) {
      alert(err.message);
    }
  };

  // Edit Company open
  const openEditCompany = (company) => {
    setEditingCompany(company);
    setCompanyForm({
      name: company.name,
      careerPageUrl: company.careerPageUrl,
      sourceType: company.sourceType,
      atsProvider: company.atsProvider || 'Greenhouse',
      crawlFrequency: company.crawlFrequency,
      apiEndpoint: company.apiEndpoint || '',
      sourceFingerprint: company.sourceFingerprint || ''
    });
    setCompanyModalOpen(true);
  };

  // Delete Company
  const deleteCompany = async (id, name) => {
    if (!confirm(`Are you sure you want to delete ${name} from registry?`)) return;
    try {
      const res = await fetch(`${API_BASE}/companies/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCompanies();
        fetchStats();
      }
    } catch (e) {
      alert("Error deleting company");
    }
  };

  // Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        GEMINI_MODEL: settingsForm.GEMINI_MODEL,
        resumeText: settingsForm.resumeText,
        preferences: settingsForm.preferences
      };
      if (settingsForm.GEMINI_API_KEY) {
        payload.GEMINI_API_KEY = settingsForm.GEMINI_API_KEY;
      }

      const res = await fetch(`${API_BASE}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      alert("Settings updated successfully!");
      setSettings(data);
      setSettingsForm(prev => ({
        ...prev,
        GEMINI_API_KEY: '',
        GEMINI_API_KEY_MASKED: data.GEMINI_API_KEY_MASKED || ''
      }));
      fetchJobs(); // Reload jobs as embedding matching might have changed
    } catch (err) {
      alert("Error updating settings: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Quick helper to determine freshness text
  const getFreshnessTag = (firstSeenDate) => {
    const hours = (Date.now() - new Date(firstSeenDate).getTime()) / 3600000;
    if (hours < 24) return <span className="badge badge-fresh">New (&lt;24h)</span>;
    if (hours < 72) return <span className="badge badge-ats">New (&lt;72h)</span>;
    return null;
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo-icon">🚀</div>
          <div>JobDiscovery.ai</div>
        </div>

        <nav className="nav-links">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>
          <button 
            className={`nav-item ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            <Briefcase size={18} />
            Job Discovery Feed
          </button>
          <button 
            className={`nav-item ${activeTab === 'companies' ? 'active' : ''}`}
            onClick={() => setActiveTab('companies')}
          >
            <Building2 size={18} />
            Company Registry
          </button>
          <button 
            className={`nav-item ${activeTab === 'logs' ? 'active' : ''}`}
            onClick={() => setActiveTab('logs')}
          >
            <ListTodo size={18} />
            Crawler Logs
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <SettingsIcon size={18} />
            AI & Crawler Settings
          </button>
        </nav>

        <div className="sidebar-footer">
          <div>Isolated adjacent app</div>
          <div>API Port: 5001</div>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="main-content">
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && stats && (
          <div>
            <header className="page-header">
              <div>
                <h1 className="page-title">Discovery Dashboard</h1>
                <p className="page-subtitle">Continuous background job acquisition and normalization status</p>
              </div>
              <button className="btn btn-primary" onClick={fetchStats}>
                <RefreshCw size={16} /> Refresh
              </button>
            </header>

            {/* Metrics cards */}
            <div className="metrics-grid">
              <div className="card metric-card">
                <div className="metric-header">
                  <span>ACTIVE OPPORTUNITIES</span>
                  <span className="metric-icon-wrapper"><Briefcase size={16} /></span>
                </div>
                <div className="metric-value">{stats.totalJobs}</div>
                <div className="metric-footer" style={{ color: 'var(--success)' }}>
                  Active listings tracked
                </div>
              </div>

              <div className="card metric-card">
                <div className="metric-header">
                  <span>NEW IN LAST 24H</span>
                  <span className="metric-icon-wrapper"><Clock size={16} /></span>
                </div>
                <div className="metric-value">{stats.newJobs24h}</div>
                <div className="metric-footer" style={{ color: 'var(--success)' }}>
                  Fresh opportunities
                </div>
              </div>

              <div className="card metric-card">
                <div className="metric-header">
                  <span>NEW IN LAST 72H</span>
                  <span className="metric-icon-wrapper"><Clock size={16} /></span>
                </div>
                <div className="metric-value">{stats.newJobs72h}</div>
                <div className="metric-footer" style={{ color: 'var(--primary-color)' }}>
                  Target alert window
                </div>
              </div>

              <div className="card metric-card">
                <div className="metric-header">
                  <span>REGISTERED SOURCES</span>
                  <span className="metric-icon-wrapper"><Building2 size={16} /></span>
                </div>
                <div className="metric-value">{stats.totalCompanies}</div>
                <div className="metric-footer" style={{ color: 'var(--text-secondary)' }}>
                  Endpoints monitored
                </div>
              </div>
            </div>

            {/* Charts & Activity Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '2rem', marginTop: '2rem' }}>
              
              {/* Custom SVG Line Chart */}
              <div className="card">
                <h3 className="card-title">Crawl Stats & Fresh Jobs (Last 7 Days)</h3>
                <div style={{ position: 'relative', height: '220px', width: '100%', marginTop: '1.5rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  {stats.chartData.map((day, idx) => {
                    // Maximum value finder
                    const maxVal = Math.max(...stats.chartData.map(d => d.newJobs + d.success + d.failure)) || 1;
                    const successPct = ((day.success) / maxVal) * 160;
                    const jobsPct = ((day.newJobs) / maxVal) * 160;

                    return (
                      <div key={day.date} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                        <div style={{ position: 'relative', width: '100%', height: '170px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '6px' }}>
                          {/* Jobs height bar */}
                          <div 
                            style={{ 
                              width: '12px', 
                              height: `${Math.max(jobsPct, 4)}px`, 
                              background: 'linear-gradient(to top, var(--success), #34d399)',
                              borderRadius: '4px 4px 0 0',
                              position: 'relative'
                            }}
                            title={`${day.newJobs} new jobs`}
                          />
                          {/* Crawl height bar */}
                          <div 
                            style={{ 
                              width: '12px', 
                              height: `${Math.max(successPct, 4)}px`, 
                              background: 'linear-gradient(to top, var(--primary-color), var(--accent-color))',
                              borderRadius: '4px 4px 0 0',
                              position: 'relative'
                            }}
                            title={`${day.success} successful crawls`}
                          />
                        </div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                          {day.date.substring(5)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--success)' }}></div>
                    <span>New Jobs Discovered</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--primary-color)' }}></div>
                    <span>Successful Crawls</span>
                  </div>
                </div>
              </div>

              {/* Recent Crawl Output logs */}
              <div className="card" style={{ maxHeight: '315px', overflowY: 'auto' }}>
                <h3 className="card-title"><Clock size={16} /> Recent Crawl Status</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                  {stats.recentLogs.slice(0, 5).map(log => (
                    <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                      <div>
                        <strong>{log.company?.name}</strong>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                          {new Date(log.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        {log.status === 'SUCCESS' ? (
                          <span style={{ color: 'var(--success)' }}>Success (+{log.jobsNew})</span>
                        ) : (
                          <span style={{ color: 'var(--error)' }}>Failed</span>
                        )}
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{log.durationMs}ms</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: JOB FEED */}
        {activeTab === 'jobs' && (
          <div>
            <header className="page-header">
              <div>
                <h1 className="page-title">Job Discovery Feed</h1>
                <p className="page-subtitle">Search, filter, and match direct-sourced opportunities</p>
              </div>
            </header>

            {/* Search and Filters Bar */}
            <div className="card" style={{ marginBottom: '2rem' }}>
              <div className="search-bar-row">
                <div className="form-group" style={{ margin: 0, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                    <Search size={16} />
                  </span>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ paddingLeft: '2.25rem' }} 
                    placeholder="Search keywords (e.g. React, Engineer)..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && fetchJobs()}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <select 
                    className="form-control"
                    value={filters.companyId}
                    onChange={(e) => setFilters(prev => ({ ...prev, companyId: e.target.value }))}
                  >
                    <option value="">All Companies</option>
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <select 
                    className="form-control"
                    value={filters.freshness}
                    onChange={(e) => setFilters(prev => ({ ...prev, freshness: e.target.value }))}
                  >
                    <option value="">Any Time</option>
                    <option value="24h">Last 24 Hours</option>
                    <option value="48h">Last 48 Hours</option>
                    <option value="72h">Last 72 Hours</option>
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <select 
                    className="form-control"
                    value={filters.experience}
                    onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value }))}
                  >
                    <option value="">All Experience</option>
                    <option value="Internship">Internship</option>
                    <option value="New Grad">New Grad</option>
                    <option value="Entry-Level">Entry-Level</option>
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <select 
                    className="form-control"
                    value={filters.remote}
                    onChange={(e) => setFilters(prev => ({ ...prev, remote: e.target.value }))}
                  >
                    <option value="">All Styles</option>
                    <option value="true">Remote Only</option>
                    <option value="false">On-site / Hybrid Only</option>
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <select 
                    className="form-control"
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="">All Categories</option>
                    <option value="SWE">SWE</option>
                    <option value="AI/ML">AI / ML</option>
                    <option value="Data">Data</option>
                    <option value="Research">Research</option>
                    <option value="Security">Security</option>
                    <option value="DevOps">DevOps / Infra</option>
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <select 
                    className="form-control"
                    value={filters.source}
                    onChange={(e) => setFilters(prev => ({ ...prev, source: e.target.value }))}
                  >
                    <option value="">All Sources</option>
                    <option value="Greenhouse">Greenhouse</option>
                    <option value="Lever">Lever</option>
                    <option value="Ashby">Ashby</option>
                    <option value="Workday">Workday</option>
                    <option value="SmartRecruiters">SmartRecruiters</option>
                    <option value="iCIMS">iCIMS</option>
                    <option value="Google Careers">Google Careers</option>
                    <option value="Oracle Jobs">Oracle Jobs</option>
                    <option value="Fallback Scraper">Fallback Scraper</option>
                  </select>
                </div>

                <button className="btn btn-primary" onClick={fetchJobs}>
                  Search
                </button>
              </div>

              {/* AI Semantic Match Options */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
                  <input 
                    type="checkbox" 
                    checked={filters.semantic}
                    onChange={(e) => setFilters(prev => ({ ...prev, semantic: e.target.checked }))}
                    style={{ accentColor: 'var(--primary-color)', width: '16px', height: '16px' }}
                  />
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary-color)' }}>
                    <Sparkles size={16} /> Enable AI Semantic Matching
                  </span>
                </label>

                {filters.semantic && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexGrow: 1 }}>
                    <input 
                      type="text" 
                      className="form-control"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                      placeholder="Optional semantic query (e.g. React Native, remote internships) - defaults to settings resume"
                      value={filters.query}
                      onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                      onKeyDown={(e) => e.key === 'Enter' && fetchJobs()}
                    />
                    {!settings?.resumeEmbedding && !filters.query && (
                      <span style={{ color: 'var(--warning)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <AlertCircle size={14} /> Resume not uploaded yet
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Jobs feed loading */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem' }}>
                <RefreshCw size={36} className="logo-icon" style={{ animation: 'spin 1.5s linear infinite', margin: '0 auto 1rem auto' }} />
                <p style={{ color: 'var(--text-secondary)' }}>Retrieving normalized jobs database...</p>
              </div>
            ) : (
              <div className="job-cards-list">
                {jobs.length === 0 ? (
                  <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    <Briefcase size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                    <p>No active job listings found matching filters.</p>
                  </div>
                ) : (
                  jobs.map(job => (
                    <div key={job.id} className="card job-card">
                      <div className="job-card-main">
                        <div className="job-title-row">
                          <span className="job-title-text">{job.title}</span>
                          <span className="badge badge-ats">{job.source}</span>
                          {getFreshnessTag(job.firstSeen)}
                        </div>

                        <div className="job-meta-row">
                          <div className="job-meta-item">
                            <Building2 size={14} />
                            <strong>{job.companyName}</strong>
                          </div>
                          <div className="job-meta-item">
                            <MapPin size={14} />
                            {job.location}
                          </div>
                          {job.employmentType && (
                            <div className="job-meta-item">
                              <Clock size={14} />
                              {job.employmentType}
                            </div>
                          )}
                          <div className="job-meta-item">
                            <Clock size={14} />
                            First seen: {new Date(job.firstSeen).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="job-desc-snippet">
                          {job.description ? job.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...' : 'No description text captured.'}
                        </div>
                      </div>

                      <div className="job-card-actions">
                        {job.matchScore !== null && job.matchScore > 0 && (
                          <div className="match-score-radial">
                            <span className="match-score-number">{job.matchScore}%</span>
                            <span className="match-score-label">AI MATCH</span>
                          </div>
                        )}
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            className="btn btn-secondary"
                            onClick={() => { setSelectedJob(job); setJobModalOpen(true); }}
                          >
                            View Details
                          </button>
                          <a 
                            href={job.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-primary"
                          >
                            Apply Direct <ExternalLink size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: COMPANY REGISTRY */}
        {activeTab === 'companies' && (
          <div>
            <header className="page-header">
              <div>
                <h1 className="page-title">Company Registry</h1>
                <p className="page-subtitle">Deterministic registry of company career boards tracked by scheduler</p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  className="btn btn-secondary"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const res = await fetch(`${API_BASE}/companies/seed-universe`, { method: 'POST' });
                      const data = await res.json();
                      alert("Seeded company universe successfully!");
                      fetchCompanies();
                      fetchStats();
                    } catch (e) {
                      alert("Failed to seed: " + e.message);
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  ✨ Seed Universe
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const res = await fetch(`${API_BASE}/companies/discover-all`, { method: 'POST' });
                      const data = await res.json();
                      alert(data.message);
                      fetchCompanies();
                      fetchStats();
                    } catch (e) {
                      alert("Failed: " + e.message);
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  🔍 Discover Pages & ATS (All)
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setEditingCompany(null);
                    setCompanyForm({
                      name: '',
                      careerPageUrl: '',
                      sourceType: 'ATS',
                      atsProvider: 'Greenhouse',
                      crawlFrequency: '1h',
                      apiEndpoint: '',
                      sourceFingerprint: ''
                    });
                    setCompanyModalOpen(true);
                  }}
                >
                  <Plus size={16} /> Register Company Page
                </button>
              </div>
            </header>

            <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
              <table className="registry-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Source Type</th>
                    <th>ATS / Adapter</th>
                    <th>Frequency</th>
                    <th>Last Crawled</th>
                    <th>Active Jobs</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map(company => (
                    <tr key={company.id}>
                      <td>
                        <strong>{company.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          <a href={company.careerPageUrl} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                            {company.careerPageUrl.substring(0, 40)}...
                          </a>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ats">{company.sourceType}</span>
                      </td>
                      <td>
                        <code>{company.atsProvider || 'Custom'}</code>
                      </td>
                      <td>{company.crawlFrequency}</td>
                      <td>
                        {company.lastSuccessfulCrawl 
                          ? new Date(company.lastSuccessfulCrawl).toLocaleString() 
                          : 'Never'}
                      </td>
                      <td style={{ fontWeight: 600 }}>{company._count?.jobs || 0}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <button 
                            className="btn btn-secondary"
                            style={{ padding: '4px 8px' }}
                            title="Run Discovery Pipeline"
                            onClick={async () => {
                              try {
                                const res = await fetch(`${API_BASE}/companies/${company.id}/discover-pipeline`, { method: 'POST' });
                                const data = await res.json();
                                alert(`Discovery completed! Career Url: ${data.careerPageUrl}, ATS: ${data.atsProvider}`);
                                fetchCompanies();
                              } catch (e) {
                                alert("Failed discovery: " + e.message);
                              }
                            }}
                          >
                            ⚙️ Discover
                          </button>
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '4px 8px' }}
                            title="Run Crawler Now"
                            disabled={crawlingId === company.id}
                            onClick={() => triggerCrawl(company.id, company.name)}
                          >
                            <RefreshCw size={14} className={crawlingId === company.id ? 'spin-icon' : ''} /> 
                            {crawlingId === company.id ? 'Scraping...' : 'Crawl'}
                          </button>
                          <button 
                            className="btn btn-secondary"
                            style={{ padding: '4px 8px' }}
                            title="Edit"
                            onClick={() => openEditCompany(company)}
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            className="btn btn-danger"
                            style={{ padding: '4px 8px' }}
                            title="Remove"
                            onClick={() => deleteCompany(company.id, company.name)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CRAWLER LOGS */}
        {activeTab === 'logs' && (
          <div>
            <header className="page-header">
              <div>
                <h1 className="page-title">Crawler Logs</h1>
                <p className="page-subtitle">Audit trails of all scheduled and manual crawl sessions</p>
              </div>
              <button className="btn btn-secondary" onClick={fetchLogs}>
                <RefreshCw size={16} /> Refresh Logs
              </button>
            </header>

            <div className="card" style={{ padding: 0 }}>
              {logs.map(log => (
                <div key={log.id} className="log-item">
                  <div className="log-details">
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <strong>{log.company?.name}</strong>
                      <span className="badge badge-ats" style={{ fontSize: '0.65rem' }}>
                        {new Date(log.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {log.errorMessage ? (
                      <div style={{ color: 'var(--error)', fontSize: '0.8rem', marginTop: '4px' }}>
                        Error: {log.errorMessage}
                      </div>
                    ) : (
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '4px' }}>
                        Jobs Found: {log.jobsFound} | New Discovered: <strong>{log.jobsNew}</strong>
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="log-status">
                      {log.status === 'SUCCESS' ? (
                        <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle size={14} /> SUCCESS
                        </span>
                      ) : (
                        <span style={{ color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <XCircle size={14} /> FAILURE
                        </span>
                      )}
                    </span>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'right', marginTop: '4px' }}>
                      Time: {log.durationMs}ms
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SETTINGS */}
        {activeTab === 'settings' && (
          <div>
            <header className="page-header">
              <div>
                <h1 className="page-title">AI & Crawler Settings</h1>
                <p className="page-subtitle">Configure Gemini models, API keys, and matching preferences</p>
              </div>
            </header>

            <form onSubmit={handleSaveSettings} className="settings-grid">
              
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 className="card-title">API & Match Settings</h3>
                
                <div className="form-group">
                  <label className="form-label">GEMINI API KEY</label>
                  <input 
                    type="password"
                    className="form-control"
                    placeholder={settingsForm.GEMINI_API_KEY_MASKED || "Enter your Gemini API key (starts with AIza...)"}
                    value={settingsForm.GEMINI_API_KEY}
                    onChange={(e) => setSettingsForm(prev => ({ ...prev, GEMINI_API_KEY: e.target.value }))}
                  />
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Used to generate embeddings for semantic queries and job descriptions. Masked value is active if loaded.
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label">GEMINI MODEL</label>
                  <select 
                    className="form-control"
                    value={settingsForm.GEMINI_MODEL}
                    onChange={(e) => setSettingsForm(prev => ({ ...prev, GEMINI_MODEL: e.target.value }))}
                  >
                    <option value="gemini-2.0-flash">gemini-2.0-flash (Recommended)</option>
                    <option value="gemini-1.5-pro">gemini-1.5-pro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">RESUME TEXT (For semantic job matching)</label>
                  <textarea 
                    className="form-control"
                    placeholder="Paste your raw resume text or professional bio here..."
                    value={settingsForm.resumeText}
                    onChange={(e) => setSettingsForm(prev => ({ ...prev, resumeText: e.target.value }))}
                  />
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    When updating this field, a fresh embedding will be generated dynamically.
                  </p>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>
                  Save & Update Configurations
                </button>
              </div>

              {/* Sidebar Info Card */}
              <div className="card" style={{ height: 'fit-content' }}>
                <h3 className="card-title" style={{ color: 'var(--primary-color)' }}>
                  <Sparkles size={16} /> Semantic Engine Status
                </h3>
                
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                  <div>
                    <strong>Embedding Status:</strong>{' '}
                    {settings?.resumeEmbedding ? (
                      <span style={{ color: 'var(--success)' }}>Active (Vector Generated)</span>
                    ) : (
                      <span style={{ color: 'var(--warning)' }}>Inactive (No Resume Vector)</span>
                    )}
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    <h4 style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>Deduplication Strategy:</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Every incoming post creates a hash: <code>SHA-256(company|title|location|id)</code>.
                      If already seen, we only update <code>lastSeen</code>.
                      If not found in the latest sweep, we mark it as <code>INACTIVE</code>.
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    <h4 style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>Crawl Safety:</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Rate limiter guarantees a minimum 15-second throttle between requests targeting the same domain.
                    </p>
                  </div>
                </div>
              </div>

            </form>
          </div>
        )}

      </main>

      {/* MODAL 1: REGISTER/EDIT COMPANY */}
      {companyModalOpen && (
        <div className="modal-backdrop" onClick={() => setCompanyModalOpen(false)}>
          <div className="card modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="card-title">{editingCompany ? 'Edit Monitored Company' : 'Register New Company Page'}</h3>
            <form onSubmit={handleSaveCompany} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required 
                  value={companyForm.name} 
                  onChange={(e) => setCompanyForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Career Page URL (Public Site)</label>
                <input 
                  type="url" 
                  className="form-control" 
                  required 
                  value={companyForm.careerPageUrl} 
                  onChange={(e) => setCompanyForm(prev => ({ ...prev, careerPageUrl: e.target.value }))}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Source Type</label>
                  <select 
                    className="form-control"
                    value={companyForm.sourceType}
                    onChange={(e) => setCompanyForm(prev => ({ ...prev, sourceType: e.target.value }))}
                  >
                    <option value="ATS">ATS Endpoint</option>
                    <option value="Career Site">Public Career Site</option>
                    <option value="Custom Portal">Custom Portal</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">ATS Provider / Adapter</label>
                  <select 
                    className="form-control"
                    value={companyForm.atsProvider}
                    onChange={(e) => setCompanyForm(prev => ({ ...prev, atsProvider: e.target.value }))}
                  >
                    <optgroup label="Standard ATS">
                      <option value="Greenhouse">Greenhouse</option>
                      <option value="Lever">Lever</option>
                      <option value="Ashby">Ashby</option>
                      <option value="Workday">Workday</option>
                      <option value="SmartRecruiters">SmartRecruiters</option>
                      <option value="iCIMS">iCIMS</option>
                    </optgroup>
                    <optgroup label="Career Portals">
                      <option value="Google Careers">Google Careers</option>
                      <option value="Oracle">Oracle Jobs / Oracle Recruiting Cloud</option>
                      <option value="Taleo">Taleo (Oracle Legacy)</option>
                    </optgroup>
                    <optgroup label="Fallback">
                      <option value="Fallback">HTML Fallback Scraper</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Crawl Frequency</label>
                  <select 
                    className="form-control"
                    value={companyForm.crawlFrequency}
                    onChange={(e) => setCompanyForm(prev => ({ ...prev, crawlFrequency: e.target.value }))}
                  >
                    <option value="15m">15 Minutes (Large Tech)</option>
                    <option value="1h">1 Hour (Mid Size)</option>
                    <option value="6h">6 Hours (Small Size)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Adapter Fingerprint / Slug</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. openai, stripe, anthropic"
                    value={companyForm.sourceFingerprint} 
                    onChange={(e) => setCompanyForm(prev => ({ ...prev, sourceFingerprint: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Custom API Endpoint URL (Optional)</label>
                <input 
                  type="url" 
                  className="form-control" 
                  placeholder="https://api.greenhouse.io/v1/boards/... (auto-filled if empty)"
                  value={companyForm.apiEndpoint} 
                  onChange={(e) => setCompanyForm(prev => ({ ...prev, apiEndpoint: e.target.value }))}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setCompanyModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCompany ? 'Save Changes' : 'Register Company'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: VIEW JOB DETAILS */}
      {jobModalOpen && selectedJob && (
        <div className="modal-backdrop" onClick={() => setJobModalOpen(false)}>
          <div className="card modal-content" style={{ maxWidth: '800px', maxHeight: '85vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <div>
                <h2 className="job-title-text" style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{selectedJob.title}</h2>
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <span><strong>{selectedJob.companyName}</strong></span>
                  <span>{selectedJob.location}</span>
                  <span>{selectedJob.employmentType}</span>
                </div>
              </div>
              {selectedJob.matchScore !== null && selectedJob.matchScore > 0 && (
                <div className="match-score-radial" style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '8px 12px', borderRadius: '8px' }}>
                  <span className="match-score-number" style={{ fontSize: '1.25rem' }}>{selectedJob.matchScore}%</span>
                  <span className="match-score-label" style={{ fontSize: '0.65rem' }}>AI MATCH</span>
                </div>
              )}
            </div>

            <div style={{ padding: '1.5rem 0', fontSize: '0.95rem', lineHeight: '1.6', color: '#e2e8f0', whiteSpace: 'pre-wrap', maxHeight: '50vh', overflowY: 'auto' }}>
              {selectedJob.description ? (
                // If it contains html tags, render cleanly or strip tags
                selectedJob.description.includes('<') ? (
                  <div dangerouslySetInnerHTML={{ __html: selectedJob.description }} />
                ) : (
                  selectedJob.description
                )
              ) : (
                'No detailed description captured for this posting.'
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <button className="btn btn-secondary" onClick={() => setJobModalOpen(false)}>
                Close
              </button>
              <a 
                href={selectedJob.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
              >
                Apply Direct <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Inline styles for keyframe animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin-icon {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
