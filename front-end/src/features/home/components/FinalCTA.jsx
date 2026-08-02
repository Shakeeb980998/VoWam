export default function FinalCTA() {
  return (
    <section className="final-cta" id="contact">
      <div className="cta-content">
        <h2>Ready to reshape your ledger?</h2>
        <p>Join the future of multi-tenant enterprise accounting.</p>
        <button className="btn btn-primary btn-lg">Start Free Trial</button>
      </div>

      <style>{`
        .final-cta {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, var(--color-accent-navy) 0%, var(--color-bg-base) 100%);
          text-align: center;
          border-top: 1px solid rgba(212, 175, 55, 0.2);
        }

        .cta-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .final-cta h2 {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: var(--color-text-primary);
        }

        .final-cta p {
          color: var(--color-text-secondary);
          font-size: 1.25rem;
          margin-bottom: 3rem;
        }
      `}</style>
    </section>
  );
}
