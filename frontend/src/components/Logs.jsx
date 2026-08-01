import React from 'react';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';

export default function Logs({ logs, fetchLogs }) {
  return (
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
  );
}
