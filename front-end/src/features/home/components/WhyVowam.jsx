import { motion } from 'framer-motion';
import { Cloud, Zap, ShieldCheck, Users, BarChart3, Rocket, CheckCircle2 } from 'lucide-react';

const benefits = [
  { icon: Cloud, title: 'Cloud-based', desc: 'Access your financials from anywhere. No local servers, no maintenance.' },
  { icon: Zap, title: 'Fast Implementation', desc: 'Go live in days, not months. Pre-configured templates get you started instantly.' },
  { icon: ShieldCheck, title: 'Secure', desc: 'Bank-grade encryption, automated backups, and strict row-level security.' },
  { icon: Users, title: 'Multi-user', desc: 'Granular permissions and unlimited collaborative access for your whole team.' },
  { icon: BarChart3, title: 'Real-time Reports', desc: 'Live dashboards that update the second a transaction is posted.' },
  { icon: Rocket, title: 'Built for Modern Businesses', desc: 'API-first architecture ready to scale with your most ambitious goals.' }
];

export default function WhyVowam() {
  return (
    <section className="why-section" id="why-vowam">
      <div className="section-container">
        <div className="section-header text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose VoWam?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The agility of a modern startup combined with the power of a legacy ERP.
          </motion.p>
        </div>

        <div className="benefits-grid">
          {benefits.map((item, idx) => (
            <motion.div 
              key={idx}
              className="benefit-card glass-panel"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="b-icon-box">
                <item.icon size={24} className="b-icon" />
              </div>
              <div className="b-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Box */}
        <motion.div 
          className="comparison-box glass-panel"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="comp-col">
            <h4 className="text-muted">Legacy ERPs</h4>
            <ul>
              <li><XCircleIcon /> Months of implementation</li>
              <li><XCircleIcon /> Heavy reliance on consultants</li>
              <li><XCircleIcon /> Clunky, outdated interfaces</li>
              <li><XCircleIcon /> Massive upfront license costs</li>
            </ul>
          </div>
          <div className="comp-col highlight">
            <h4 className="text-gold">VoWam</h4>
            <ul>
              <li><CheckCircle2 className="text-gold" size={20} /> Go live in 15 minutes</li>
              <li><CheckCircle2 className="text-gold" size={20} /> Intuitive, self-serve setup</li>
              <li><CheckCircle2 className="text-gold" size={20} /> Beautiful, modern consumer-grade UI</li>
              <li><CheckCircle2 className="text-gold" size={20} /> Transparent SaaS pricing</li>
            </ul>
          </div>
        </motion.div>
      </div>

      <style>{`
        .why-section {
          padding: 8rem 2rem;
          background: var(--color-bg-surface);
        }

        .section-container {
          width: 100%;
          padding: 0 4vw;
          margin: 0 auto;
        }

        .section-header {
          margin-bottom: 5rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.15rem;
          color: var(--color-text-secondary);
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 5rem;
        }

        .benefit-card {
          display: flex;
          gap: 1.5rem;
          padding: 2rem;
          background: var(--color-bg-base);
        }

        .b-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--color-accent-gold-glow);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .b-icon {
          color: var(--color-accent-gold-dark);
        }

        .b-content h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--color-text-primary);
        }

        .b-content p {
          color: var(--color-text-secondary);
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .comparison-box {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          max-width: 1000px;
          margin: 0 auto;
          background: var(--color-bg-base);
        }

        .comp-col {
          padding: 4rem;
        }

        .comp-col.highlight {
          background: var(--color-bg-surface-elevated);
          border-left: 1px solid var(--color-border-subtle);
        }

        .comp-col h4 {
          font-size: 1.5rem;
          margin-bottom: 2rem;
        }

        .text-muted { color: var(--color-text-muted); }
        .text-gold { color: var(--color-accent-gold); }

        .comp-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .comp-col ul li {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.1rem;
          color: var(--color-text-secondary);
        }

        .comp-col.highlight ul li {
          color: var(--color-text-primary);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .comparison-box {
            grid-template-columns: 1fr;
          }
          .comp-col {
            padding: 2rem;
          }
          .comp-col.highlight {
            border-left: none;
            border-top: 1px solid var(--color-border-subtle);
          }
        }
      `}</style>
    </section>
  );
}

function XCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  );
}
