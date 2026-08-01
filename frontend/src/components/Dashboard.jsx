import React from 'react';
import { Briefcase, Clock, Building2, RefreshCw } from 'lucide-react';

export default function Dashboard({ stats, fetchStats }) {
  if (!stats) return null;

  return (
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
  );
}
