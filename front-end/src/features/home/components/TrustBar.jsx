import { motion } from 'framer-motion';

export default function TrustBar() {
  const badges = [
    "UAE FTA-Ready",
    "Bank-Grade Encryption",
    "99.99% Uptime",
    "SOC 2 Compliant",
    "Zero Unbalanced Entries"
  ];

  return (
    <section className="trust-bar-section">
      <motion.div 
        className="trust-bar-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="trust-text">Trusted by growing enterprises globally</p>
        <div className="trust-badges">
          {badges.map((badge, idx) => (
            <div key={idx} className="trust-badge">
              <span className="trust-dot"></span>
              {badge}
            </div>
          ))}
        </div>
      </motion.div>

      <style>{`
        .trust-bar-section {
          padding: 2rem 2rem 4rem;
          border-bottom: 1px solid var(--color-border-subtle);
          background: linear-gradient(to bottom, transparent, rgba(0, 31, 84, 0.1));
        }

        .trust-bar-container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .trust-text {
          color: var(--color-text-muted);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
        }

        .trust-badges {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
        }

        .trust-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text-secondary);
          font-weight: 500;
          font-size: 1rem;
        }

        .trust-dot {
          width: 8px;
          height: 8px;
          background: var(--color-accent-gold);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--color-accent-gold-glow);
        }
      `}</style>
    </section>
  );
}
