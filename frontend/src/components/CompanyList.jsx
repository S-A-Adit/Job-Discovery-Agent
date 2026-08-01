import React from 'react';
import { Plus, RefreshCw, Trash2, Edit } from 'lucide-react';

const API_BASE = 'http://localhost:5001/api';

export default function CompanyList({
  companies,
  fetchCompanies,
  fetchStats,
  setEditingCompany,
  setCompanyForm,
  setCompanyModalOpen,
  crawlingId,
  triggerCrawl
}) {
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

  return (
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
              try {
                const res = await fetch(`${API_BASE}/companies/seed-universe`, { method: 'POST' });
                await res.json();
                alert("Seeded company universe successfully!");
                fetchCompanies();
                fetchStats();
              } catch (e) {
                alert("Failed to seed: " + e.message);
              }
            }}
          >
            ✨ Seed Universe
          </button>
          <button 
            className="btn btn-secondary"
            onClick={async () => {
              try {
                const res = await fetch(`${API_BASE}/companies/discover-all`, { method: 'POST' });
                const data = await res.json();
                alert(data.message);
                fetchCompanies();
                fetchStats();
              } catch (e) {
                alert("Failed: " + e.message);
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
  );
}
