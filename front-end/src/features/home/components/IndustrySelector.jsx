import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  ShoppingCart, 
  Store,
  Factory,
  Wrench,
  Stethoscope,
  Truck
} from 'lucide-react';

const industries = [
  {
    id: 'construction',
    name: 'Construction',
    icon: Building2,
    headline: 'Project accounting built for builders.',
    desc: 'Track costs by project, manage subcontractor retentions, and handle progress billing with ease.',
    kpis: [
      { label: 'Job Costing', value: 'Live' },
      { label: 'Retainage', value: 'Automated' },
      { label: 'WIP Reports', value: '1-Click' }
    ]
  },
  {
    id: 'trading',
    name: 'Trading',
    icon: ShoppingCart,
    headline: 'High-volume trading, zero bottlenecks.',
    desc: 'Manage multi-currency transactions, landed costs, and complex supply chains seamlessly.',
    kpis: [
      { label: 'Multi-Currency', value: '160+' },
      { label: 'Landed Costs', value: 'Auto-alloc' },
      { label: 'B2B Portal', value: 'Included' }
    ]
  },
  {
    id: 'retail',
    name: 'Retail',
    icon: Store,
    headline: 'Omnichannel retail at your fingertips.',
    desc: 'Sync POS systems, manage multi-location inventory, and track branch-wise profitability.',
    kpis: [
      { label: 'POS Sync', value: 'Real-time' },
      { label: 'Locations', value: 'Unlimited' },
      { label: 'Stock Alerts', value: 'Smart' }
    ]
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    headline: 'From raw materials to finished goods.',
    desc: 'Complex BOMs, routing, production orders, and capacity planning natively integrated.',
    kpis: [
      { label: 'BOM Levels', value: 'Infinite' },
      { label: 'Routing', value: 'Dynamic' },
      { label: 'Scrap Tracking', value: 'Precise' }
    ]
  },
  {
    id: 'services',
    name: 'Services',
    icon: Wrench,
    headline: 'Time, expenses, and recurring billing.',
    desc: 'Automate subscription billing, track billable hours, and forecast resource utilization.',
    kpis: [
      { label: 'Recurring Invoices', value: 'Auto' },
      { label: 'Timesheets', value: 'Integrated' },
      { label: 'Utilization', value: 'Dashboard' }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: Stethoscope,
    headline: 'Secure, compliant financial care.',
    desc: 'HIPAA-ready infrastructure, department-wise budgets, and streamlined procurement.',
    kpis: [
      { label: 'Security', value: 'Bank-grade' },
      { label: 'Approvals', value: 'Multi-tier' },
      { label: 'Audits', value: 'Traceable' }
    ]
  },
  {
    id: 'logistics',
    name: 'Logistics',
    icon: Truck,
    headline: 'Keep your fleet and finances moving.',
    desc: 'Fleet maintenance accounting, route profitability, and integrated dispatch invoicing.',
    kpis: [
      { label: 'Asset Depreciation', value: 'Auto' },
      { label: 'Fuel Costs', value: 'Tracked' },
      { label: 'Waybills', value: 'Generated' }
    ]
  }
];

export default function IndustrySelector() {
  const [activeTab, setActiveTab] = useState(industries[0].id);

  const activeData = industries.find(ind => ind.id === activeTab);

  return (
    <section className="industry-section" id="solutions">
      <div className="section-container">
        <div className="section-header text-center">
          <h2>Engineered for your industry</h2>
          <p>VoWam adapts to your specific business model out of the box.</p>
        </div>

        <div className="industry-layout">
          {/* Tabs Sidebar */}
          <div className="industry-tabs">
            {industries.map((ind) => (
              <button 
                key={ind.id}
                className={`industry-tab ${activeTab === ind.id ? 'active' : ''}`}
                onClick={() => setActiveTab(ind.id)}
              >
                <ind.icon size={20} className="tab-icon" />
                <span>{ind.name}</span>
                {activeTab === ind.id && (
                  <motion.div 
                    layoutId="activeTabIndicator" 
                    className="tab-indicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="industry-content-wrapper glass-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="industry-content"
              >
                <div className="panel-header">
                  <activeData.icon size={48} className="panel-icon" />
                  <div>
                    <h3>{activeData.headline}</h3>
                    <p className="panel-desc">{activeData.desc}</p>
                  </div>
                </div>

                <div className="kpi-grid">
                  {activeData.kpis.map((kpi, idx) => (
                    <div key={idx} className="kpi-card">
                      <span className="kpi-label">{kpi.label}</span>
                      <span className="kpi-value">{kpi.value}</span>
                    </div>
                  ))}
                </div>

                <button className="btn btn-primary mt-auto self-start">
                  Explore {activeData.name} Solutions
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .industry-section {
          padding: 8rem 2rem;
          background: var(--color-bg-base);
          position: relative;
        }

        .section-container {
          width: 100%;
          padding: 0 4vw;
          margin: 0 auto;
        }

        .section-header {
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.15rem;
          color: var(--color-text-secondary);
        }

        .industry-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 3rem;
          min-height: 500px;
        }

        .industry-tabs {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .industry-tab {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          position: relative;
          text-align: left;
          transition: color 0.2s ease;
          border-radius: var(--border-radius-sm);
        }

        .industry-tab:hover {
          color: var(--color-text-primary);
          background: var(--color-bg-glass-hover);
        }

        .industry-tab.active {
          color: var(--color-text-primary);
        }

        .tab-icon {
          color: var(--color-accent-gold);
        }

        .tab-indicator {
          position: absolute;
          inset: 0;
          background: var(--color-bg-surface-elevated);
          border-left: 3px solid var(--color-accent-gold);
          border-radius: var(--border-radius-sm);
          z-index: -1;
        }

        .industry-content-wrapper {
          overflow: hidden;
        }

        .industry-content {
          padding: 4rem;
          min-height: 100%;
          display: flex;
          flex-direction: column;
        }

        .panel-header {
          display: flex;
          align-items: flex-start;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .panel-icon {
          color: var(--color-accent-gold);
          flex-shrink: 0;
        }

        .panel-header h3 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: var(--color-text-primary);
        }

        .panel-desc {
          font-size: 1.1rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .kpi-card {
          background: var(--color-bg-glass);
          border: 1px solid var(--color-border-subtle);
          padding: 1.5rem;
          border-radius: var(--border-radius-sm);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .kpi-label {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .kpi-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .mt-auto { margin-top: auto; }
        .self-start { align-self: flex-start; }

        @media (max-width: 900px) {
          .industry-layout {
            grid-template-columns: 1fr;
          }
          .industry-tabs {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 1rem;
          }
          .industry-tab {
            white-space: nowrap;
          }
          .tab-indicator {
            border-left: none;
            border-bottom: 3px solid var(--color-accent-gold);
          }
          .panel-header {
            flex-direction: column;
            gap: 1rem;
          }
          .kpi-grid {
            grid-template-columns: 1fr;
          }
          .industry-content {
            padding: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
