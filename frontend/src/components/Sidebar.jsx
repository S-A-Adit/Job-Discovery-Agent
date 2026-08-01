import React from 'react';
import { LayoutDashboard, Briefcase, Building2, ListTodo, Settings as SettingsIcon } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
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
  );
}
