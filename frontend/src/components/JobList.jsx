import React from 'react';
import { Search, RefreshCw, Briefcase, Building2, MapPin, Clock, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

export default function JobList({ 
  jobs, 
  loading, 
  filters, 
  setFilters, 
  companies, 
  fetchJobs, 
  settings, 
  setSelectedJob, 
  setJobModalOpen 
}) {
  const getFreshnessTag = (firstSeenDate) => {
    const hours = (Date.now() - new Date(firstSeenDate).getTime()) / 3600000;
    if (hours < 24) return <span className="badge badge-fresh">New (&lt;24h)</span>;
    if (hours < 72) return <span className="badge badge-ats">New (&lt;72h)</span>;
    return null;
  };

  return (
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
          <RefreshCw size={36} className="logo-icon spin-icon" style={{ margin: '0 auto 1rem auto' }} />
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
  );
}
