import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import JobList from './components/JobList';
import CompanyList from './components/CompanyList';
import Logs from './components/Logs';
import Settings from './components/Settings';
import { ExternalLink } from 'lucide-react';

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
      fetchJobs();
    } catch (err) {
      alert("Error updating settings: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Panel */}
      <main className="main-content">
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && stats && (
          <Dashboard stats={stats} fetchStats={fetchStats} />
        )}

        {/* TAB 2: JOB FEED */}
        {activeTab === 'jobs' && (
          <JobList 
            jobs={jobs} 
            loading={loading} 
            filters={filters} 
            setFilters={setFilters} 
            companies={companies} 
            fetchJobs={fetchJobs} 
            settings={settings} 
            setSelectedJob={setSelectedJob} 
            setJobModalOpen={setJobModalOpen} 
          />
        )}

        {/* TAB 3: COMPANY REGISTRY */}
        {activeTab === 'companies' && (
          <CompanyList 
            companies={companies} 
            fetchCompanies={fetchCompanies} 
            fetchStats={fetchStats} 
            setEditingCompany={setEditingCompany} 
            setCompanyForm={setCompanyForm} 
            setCompanyModalOpen={setCompanyModalOpen} 
            crawlingId={crawlingId} 
            triggerCrawl={triggerCrawl} 
          />
        )}

        {/* TAB 4: CRAWLER LOGS */}
        {activeTab === 'logs' && (
          <Logs logs={logs} fetchLogs={fetchLogs} />
        )}

        {/* TAB 5: SETTINGS */}
        {activeTab === 'settings' && (
          <Settings 
            settingsForm={settingsForm} 
            setSettingsForm={setSettingsForm} 
            handleSaveSettings={handleSaveSettings} 
            settings={settings} 
          />
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
