import { motion } from 'framer-motion';
import { Database, Lock, Eye } from 'lucide-react';

const securityItems = [
  { icon: Database, title: 'RLS Tenancy Isolation', desc: 'Database-enforced row-level security. Your data never touches another tenant.' },
  { icon: Lock, title: 'Bank-Grade Encryption', desc: 'AES-256 encryption at rest and in transit.' },
  { icon: Eye, title: 'Comprehensive Audit Logging', desc: 'Every action is tracked, immutable, and strictly reviewable.' }
];

export default function SecurityStrip() {
  return (
    <section className="security-section">
      <div className="security-container">
        {securityItems.map((item, idx) => (
          <motion.div 
            key={idx}
            className="sec-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.2 }}
          >
            <item.icon size={40} className="sec-icon text-gradient" />
            <div className="sec-content">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .security-section {
          padding: 4rem 2rem;
          background: var(--color-bg-surface-elevated);
          border-top: 1px solid var(--color-border-subtle);
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .security-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
        }

        .sec-item {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
        }

        .sec-icon {
          color: var(--color-accent-gold);
          flex-shrink: 0;
        }

        .sec-content h4 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: var(--color-text-primary);
        }

        .sec-content p {
          color: var(--color-text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
}
