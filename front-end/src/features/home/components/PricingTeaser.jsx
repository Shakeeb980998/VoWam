import { motion } from 'framer-motion';

export default function PricingTeaser() {
  return (
    <section className="pricing-teaser" id="pricing">
      <div className="pricing-container">
        <motion.div 
          className="pricing-card glass-panel"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2>Enterprise capabilities. SME pricing.</h2>
          <p>We believe correct accounting shouldn't cost as much as your core business operations. Flexible pricing tailored to your scale.</p>
          <button className="btn btn-primary btn-lg">Talk to Sales</button>
        </motion.div>
      </div>

      <style>{`
        .pricing-teaser {
          padding: 4rem 2rem 8rem;
          background: var(--color-bg-base);
        }

        .pricing-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .pricing-card {
          text-align: center;
          padding: 4rem 2rem;
          background: var(--color-bg-surface-elevated);
          border-color: var(--color-border-focus);
        }

        .pricing-card h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .pricing-card p {
          color: var(--color-text-secondary);
          font-size: 1.1rem;
          margin-bottom: 2.5rem;
          max-width: 600px;
          margin-inline: auto;
        }
      `}</style>
    </section>
  );
}
