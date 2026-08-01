import { motion } from 'framer-motion';
import { FileText, Calculator, PieChart, CheckSquare, Globe, ScrollText } from 'lucide-react';

const features = [
  { icon: FileText, title: 'Financial Reporting', desc: 'Live P&L, Balance Sheet, and Cash Flow querying directly from posted journals.' },
  { icon: Calculator, title: 'VAT & Corporate Tax', desc: 'FTA-compliant tax computation with completely transparent, reviewable adjustments.' },
  { icon: PieChart, title: 'Budgeting & Forecasting', desc: 'Compare actuals vs. budgets in real-time without exporting to external sheets.' },
  { icon: CheckSquare, title: 'Approval Workflows', desc: 'OCR-assisted invoice capture with multi-tier approval routing before posting.' },
  { icon: Globe, title: 'Multi-Branch & Currency', desc: 'Consolidate multiple branches and currencies natively within your single ledger.' },
  { icon: ScrollText, title: 'Immutable Audit Trail', desc: 'Entries are never deleted. Every number drills down to its exact source transaction.' }
];

export default function FeatureGrid() {
  return (
    <section className="features-section">
      <div className="features-container">
        <motion.div 
          className="features-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2>The power of a heavy-weight ERP.</h2>
          <p>Without the heavy-weight implementation timeline.</p>
        </motion.div>

        <div className="features-grid">
          {features.map((feat, idx) => (
            <motion.div 
              key={idx}
              className="feat-card glass-panel"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10, borderColor: 'var(--color-border-focus)' }}
            >
              <div className="feat-icon text-gradient">
                <feat.icon size={32} />
              </div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .features-section {
          padding: 8rem 2rem;
          background: var(--color-bg-base);
          position: relative;
        }

        .features-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .features-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .features-header h2 {
          font-size: clamp(2rem, 3.5vw, 2.5rem);
          margin-bottom: 1rem;
        }

        .features-header p {
          font-size: 1.15rem;
          color: var(--color-text-secondary);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .feat-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform 0.3s ease, border-color 0.3s ease;
          background: var(--color-bg-surface);
        }

        .feat-icon {
          width: 56px;
          height: 56px;
          background: rgba(212, 175, 55, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: var(--color-accent-gold);
        }

        .feat-card h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
        }

        .feat-card p {
          color: var(--color-text-secondary);
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
