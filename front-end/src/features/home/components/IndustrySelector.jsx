import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  ShoppingCart, 
  UtensilsCrossed, 
  Globe2, 
  Sparkles, 
  Rocket, 
  Factory 
} from 'lucide-react';

const industries = [
  { id: 'construction', name: 'Construction', icon: Building2, kpis: ['Job Costing', 'BOQ', 'Progress Billing', 'WIP'] },
  { id: 'retail', name: 'Grocery / Retail', icon: ShoppingCart, kpis: ['POS Integration', 'Inventory', 'Multi-branch'] },
  { id: 'restaurant', name: 'Restaurant', icon: UtensilsCrossed, kpis: ['POS Sync', 'Inventory', 'Recipe Costing'] },
  { id: 'trading', name: 'Trading', icon: Globe2, kpis: ['Multi-currency', 'Purchase Cycles', 'Sales Cycles'] },
  { id: 'services', name: 'Cleaning / Services', icon: Sparkles, kpis: ['Service Contracts', 'Recurring Billing'] },
  { id: 'startups', name: 'Startups', icon: Rocket, kpis: ['Lean Accounting', 'Investor Reporting', 'Burn Rate'] },
  { id: 'manufacturing', name: 'Manufacturing+', icon: Factory, kpis: ['Built to grow into your next industry without a re-platform.'] },
];

export default function IndustrySelector() {
  const [activeTab, setActiveTab] = useState(industries[0]);

  return (
    <section className="industry-section">
      <div className="industry-container">
        <motion.div 
          className="industry-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2>One engine, many businesses.</h2>
          <p>Pick your industry, and your Chart of Accounts, dashboards, and workflows are ready. No consultants.</p>
        </motion.div>

        <div className="industry-layout">
          {/* Tabs Sidebar */}
          <div className="industry-tabs">
            {industries.map((industry) => (
              <button 
                key={industry.id}
                className={`industry-tab ${activeTab.id === industry.id ? 'active' : ''}`}
                onClick={() => setActiveTab(industry)}
              >
                <industry.icon size={20} className="tab-icon" />
                {industry.name}
                {activeTab.id === industry.id && (
                  <motion.div className="tab-indicator" layoutId="activeTabIndicator" />
                )}
              </button>
            ))}
          </div>

          {/* Dynamic Content Area */}
          <div className="industry-content glass-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="industry-panel"
              >
                <div className="panel-header">
                  <activeTab.icon size={48} className="panel-icon text-gradient" />
                  <h3>{activeTab.name} Out-of-the-Box</h3>
                </div>
                
                <div className="kpi-grid">
                  {activeTab.kpis.map((kpi, idx) => (
                    <div key={idx} className="kpi-card">
                      <div className="kpi-dot"></div>
                      <span className="kpi-text">{kpi}</span>
                    </div>
                  ))}
                </div>

                <div className="dashboard-mockup">
                  {/* Abstract dashboard lines */}
                  <div className="mockup-header">
                    <div className="mockup-skeleton w-32"></div>
                    <div className="mockup-skeleton w-16"></div>
                  </div>
                  <div className="mockup-chart">
                    <div className="chart-bar h-60"></div>
                    <div className="chart-bar h-80"></div>
                    <div className="chart-bar h-40"></div>
                    <div className="chart-bar h-90"></div>
                    <div className="chart-bar h-70"></div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .industry-section {
          padding: 8rem 2rem;
          background: var(--color-bg-surface);
        }

        .industry-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .industry-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .industry-header h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin-bottom: 1rem;
        }

        .industry-header p {
          font-size: 1.15rem;
          color: var(--color-text-secondary);
        }

        .industry-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 3rem;
          align-items: flex-start;
        }

        @media (max-width: 900px) {
          .industry-layout {
            grid-template-columns: 1fr;
          }
          
          .industry-tabs {
            display: flex;
            overflow-x: auto;
            padding-bottom: 1rem;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .industry-tabs::-webkit-scrollbar {
            display: none;
          }
          
          .industry-tab {
            white-space: nowrap;
          }
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
          padding: 1.2rem;
          border-radius: var(--border-radius-sm);
          color: var(--color-text-secondary);
          font-weight: 500;
          font-size: 1rem;
          text-align: left;
          position: relative;
          transition: color var(--transition-fast);
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

        .industry-content {
          padding: 3rem;
          min-height: 500px;
          display: flex;
          flex-direction: column;
        }

        .panel-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .panel-icon {
          color: var(--color-accent-gold);
        }

        .panel-header h3 {
          font-size: 2rem;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .kpi-card {
          background: var(--color-bg-glass);
          border: 1px solid var(--color-border-subtle);
          padding: 1.5rem;
          border-radius: var(--border-radius-sm);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .kpi-dot {
          width: 8px;
          height: 8px;
          background: var(--color-accent-cyan);
          border-radius: 50%;
        }

        .kpi-text {
          font-weight: 500;
          color: var(--color-text-primary);
        }

        /* Abstract Mockup */
        .dashboard-mockup {
          background: var(--color-bg-base);
          border-radius: var(--border-radius-md);
          border: 1px solid var(--color-border-subtle);
          padding: 2rem;
          margin-top: auto;
        }

        .mockup-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .mockup-skeleton {
          height: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        .w-32 { width: 120px; }
        .w-16 { width: 60px; }

        .mockup-chart {
          display: flex;
          align-items: flex-end;
          gap: 1rem;
          height: 120px;
        }

        .chart-bar {
          flex: 1;
          background: linear-gradient(to top, var(--color-accent-navy), var(--color-accent-gold));
          border-radius: 4px 4px 0 0;
          opacity: 0.8;
          transition: height 0.5s ease;
        }

        .h-60 { height: 60%; }
        .h-80 { height: 80%; }
        .h-40 { height: 40%; }
        .h-90 { height: 90%; }
        .h-70 { height: 70%; }
      `}</style>
    </section>
  );
}
