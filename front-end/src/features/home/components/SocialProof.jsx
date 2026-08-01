import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';

function AnimatedCounter({ from = 0, to, duration = 2, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.floor(value).toLocaleString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, duration, suffix]);

  return <span ref={ref}>{from}{suffix}</span>;
}

export default function SocialProof() {
  return (
    <section className="proof-section">
      <div className="proof-container">
        <motion.div 
          className="proof-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2>Numbers that speak for themselves.</h2>
        </motion.div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-number text-gradient">
              <AnimatedCounter to={50} suffix="M+" />
            </h3>
            <p className="stat-label">Transactions Posted</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number text-gradient">
              <AnimatedCounter to={100} suffix="%" />
            </h3>
            <p className="stat-label">Audit-Ready Accuracy</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number text-gradient">
              <AnimatedCounter to={15} suffix=" Min" />
            </h3>
            <p className="stat-label">Average Onboarding Time</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number text-gradient">
              <AnimatedCounter to={7} />
            </h3>
            <p className="stat-label">Pre-Configured Industries</p>
          </div>
        </div>
      </div>

      <style>{`
        .proof-section {
          padding: 8rem 2rem;
          background: var(--color-bg-base);
        }

        .proof-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .proof-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .proof-header h2 {
          font-size: clamp(2rem, 4vw, 3rem);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 3rem;
          text-align: center;
        }

        .stat-card {
          padding: 2rem;
        }

        .stat-number {
          font-size: 4rem;
          font-family: var(--font-family-heading);
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .stat-label {
          color: var(--color-text-secondary);
          font-size: 1.1rem;
          font-weight: 500;
        }
      `}</style>
    </section>
  );
}
