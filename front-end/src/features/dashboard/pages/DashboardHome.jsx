import React from 'react';

export default function DashboardHome() {
  return (
    <div className="dashboard-home">
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening today.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <div className="stat-value">$124,500</div>
          <div className="stat-trend positive">+12% from last month</div>
        </div>
        
        <div className="stat-card">
          <h3>Active Subscriptions</h3>
          <div className="stat-value">1,432</div>
          <div className="stat-trend positive">+5% from last month</div>
        </div>

        <div className="stat-card">
          <h3>Pending Invoices</h3>
          <div className="stat-value">42</div>
          <div className="stat-trend negative">-3% from last month</div>
        </div>
      </div>

      <style>{`
        .dashboard-home {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .page-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--color-text-primary);
          margin-bottom: 0.25rem;
        }

        .page-header p {
          color: var(--color-text-secondary);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .stat-card {
          background: var(--color-bg-base);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--border-radius-md);
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .stat-card h3 {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          margin-bottom: 0.75rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-text-primary);
          margin-bottom: 0.5rem;
        }

        .stat-trend {
          font-size: 0.85rem;
          font-weight: 500;
        }

        .stat-trend.positive {
          color: #16a34a;
        }

        .stat-trend.negative {
          color: #dc2626;
        }
      `}</style>
    </div>
  );
}
