import { motion } from 'framer-motion';
import { BookOpen, CreditCard, Banknote, Package, Users, Receipt, LineChart, Building2, BrainCircuit } from 'lucide-react';

const features = [
  { icon: BookOpen, title: 'General Ledger', desc: 'The indisputable core of your financial data, balancing perfectly every time.' },
  { icon: CreditCard, title: 'Accounts Payable', desc: 'Automate vendor bills, track liabilities, and streamline payment runs.' },
  { icon: Banknote, title: 'Accounts Receivable', desc: 'Generate smart invoices, track customer payments, and reduce DSO.' },
  { icon: Package, title: 'Inventory', desc: 'Real-time stock valuation, multi-warehouse tracking, and COGS automation.' },
  { icon: Users, title: 'Payroll', desc: 'Integrated payroll runs that automatically post to your ledger and employee accounts.' },
  { icon: Receipt, title: 'VAT & Tax', desc: 'Automated tax calculations, return generation, and compliance tracking.' },
  { icon: LineChart, title: 'Financial Reports', desc: 'Live P&L, Balance Sheet, and custom multidimensional reporting engines.' },
  { icon: Building2, title: 'Multi-company', desc: 'Manage unlimited entities and consolidate financials in a single click.' },
  { icon: BrainCircuit, title: 'AI Insights (Future)', desc: 'Predictive cash flow, anomaly detection, and automated smart reconciliations.' },
];

export default function FeatureGrid() {
  return (
    <section className="features-section" id="features">
      <div className="section-container">
        <div className="section-header text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Core Enterprise Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything you need to run your entire business from a single source of truth.
          </motion.p>
        </div>

        <div className="features-grid">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              className="feature-card glass-panel"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <div className="feature-icon-wrapper">
                <feature.icon size={28} className="feature-icon" />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .features-section {
          padding: 8rem 2rem;
          background: var(--color-bg-base);
        }

        .section-container {
          width: 100%;
          padding: 0 4vw;
          margin: 0 auto;
        }

        .section-header {
          margin-bottom: 5rem;
          max-width: 700px;
          margin-inline: auto;
        }
        
        .section-header h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.15rem;
          color: var(--color-text-secondary);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          background: var(--color-bg-surface-elevated);
        }

        .feature-icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          background: var(--color-bg-surface);
          border: 1px solid var(--color-border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon-wrapper {
          background: var(--color-accent-gold-glow);
          border-color: var(--color-accent-gold);
        }

        .feature-icon {
          color: var(--color-accent-gold);
        }

        .feature-title {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .feature-desc {
          color: var(--color-text-secondary);
          line-height: 1.6;
          font-size: 0.95rem;
        }
      `}</style>
    </section>
  );
}
