import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Settings({ settingsForm, setSettingsForm, handleSaveSettings, settings }) {
  return (
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
  );
}
