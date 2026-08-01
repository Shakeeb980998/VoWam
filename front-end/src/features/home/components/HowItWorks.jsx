import { motion } from 'framer-motion';
import { UserPlus, Settings2, ShieldCheck, TrendingUp } from 'lucide-react';

const steps = [
  { icon: UserPlus, title: 'Sign Up', desc: 'Create your account securely.' },
  { icon: Settings2, title: 'Pick Industry', desc: 'Select your sector to auto-configure accounts and KPIs.' },
  { icon: ShieldCheck, title: 'Review Schema', desc: 'Approve your customized, isolated tenant database setup.' },
  { icon: TrendingUp, title: 'Post Transactions', desc: 'Start posting balanced entries in under 15 minutes.' },
];

export default function HowItWorks() {
  return (
    <section className="timeline-section">
      <div className="timeline-container">
        <motion.div 
          className="timeline-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2>From signup to your first balanced entry.</h2>
          <p>Zero consultants. Zero implementation delays.</p>
        </motion.div>

        <div className="timeline-steps">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              className="timeline-step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.2 }}
            >
              <div className="step-icon glass-panel">
                <step.icon size={28} className="text-gradient" />
              </div>
              <div className="step-content">
                <h4>{idx + 1}. {step.title}</h4>
                <p>{step.desc}</p>
              </div>
              {idx < steps.length - 1 && <div className="step-connector"></div>}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .timeline-section {
          padding: 8rem 2rem;
          background: var(--color-bg-base);
        }

        .timeline-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .timeline-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .timeline-header h2 {
          font-size: clamp(2rem, 3.5vw, 2.5rem);
          margin-bottom: 1rem;
        }

        .timeline-header p {
          font-size: 1.15rem;
          color: var(--color-text-secondary);
        }

        .timeline-steps {
          display: flex;
          justify-content: space-between;
          position: relative;
        }

        @media (max-width: 900px) {
          .timeline-steps {
            flex-direction: column;
            gap: 3rem;
          }
          
          .step-connector {
            display: none;
          }
        }

        .timeline-step {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          padding: 0 1rem;
        }

        .step-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          z-index: 2;
          background: var(--color-bg-surface-elevated);
        }

        .step-connector {
          position: absolute;
          top: 36px;
          left: 50%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, var(--color-accent-gold) 0%, transparent 100%);
          opacity: 0.3;
          z-index: 1;
        }

        .step-content h4 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--color-text-primary);
        }

        .step-content p {
          color: var(--color-text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
}
