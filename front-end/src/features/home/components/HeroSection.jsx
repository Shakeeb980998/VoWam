import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          One Core Ledger.<br />
          <span className="text-gradient">Reshaped for Every Business.</span>
        </motion.h1>

        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          Go from signup to your first posted, balanced transaction in under 15 minutes. NetSuite-grade accounting correctness with QuickBooks-grade time-to-value. Zero consultants required.
        </motion.p>

        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <button className="btn btn-primary btn-lg">Start Free</button>
          <button className="btn btn-outline btn-lg">Watch how it works</button>
        </motion.div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 2rem 4rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: -30%;
          left: 50%;
          transform: translateX(-50%);
          width: 80vw;
          height: 80vw;
          background: radial-gradient(circle, var(--color-accent-navy) 0%, transparent 70%);
          opacity: 0.5;
          z-index: -1;
        }

        .hero-content {
          max-width: 900px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-title {
          font-size: clamp(3rem, 6vw, 4.5rem);
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
          color: var(--color-text-primary);
        }

        .hero-subtitle {
          font-size: clamp(1.1rem, 2vw, 1.25rem);
          color: var(--color-text-secondary);
          max-width: 750px;
          margin-bottom: 3rem;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-lg {
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: var(--border-radius-sm);
        }

        .btn-primary {
          background: var(--color-accent-gold);
          color: #000;
          box-shadow: 0 4px 15px var(--color-accent-gold-glow);
          transition: all var(--transition-fast);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          background: var(--color-accent-gold-light);
          box-shadow: 0 6px 20px rgba(247, 224, 137, 0.4);
        }

        .btn-outline {
          border: 1px solid var(--color-border-subtle);
          color: var(--color-text-primary);
          transition: all var(--transition-fast);
        }

        .btn-outline:hover {
          background: var(--color-bg-surface-elevated);
          border-color: var(--color-border-focus);
        }
      `}</style>
    </section>
  );
}
