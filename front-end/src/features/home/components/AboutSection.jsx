import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="section-container">
        <div className="about-content glass-panel">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About VoWam
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            VoWam was built to bridge the gap between lightweight SME tools and heavyweight mid-market ERPs. We believe that every business, regardless of size, deserves NetSuite-grade accounting correctness with QuickBooks-grade time-to-value. 
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our mission is to empower growing enterprises with a single, unshakeable core ledger that adapts to their unique operational needs without months of expensive consulting.
          </motion.p>
        </div>
      </div>

      <style>{`
        .about-section {
          padding: 8rem 2rem;
          background: var(--color-bg-base);
        }

        .section-container {
          width: 100%;
          padding: 0 4vw;
          margin: 0 auto;
        }

        .about-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 4rem;
          text-align: center;
          border-radius: var(--border-radius-lg);
        }

        .about-content h2 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: var(--color-text-primary);
        }

        .about-content p {
          font-size: 1.25rem;
          line-height: 1.8;
          color: var(--color-text-secondary);
          margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
          .about-content {
            padding: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
