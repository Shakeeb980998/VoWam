import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ProblemSolution() {
  return (
    <section className="ps-section">
      <div className="ps-container">
        <motion.div 
          className="ps-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2>Stop bolting reports onto broken data.</h2>
          <p>Spreadsheets and lightweight SaaS tools turn your financials into a guessing game.</p>
        </motion.div>

        <div className="ps-grid">
          {/* Problem Card */}
          <motion.div 
            className="ps-card problem glass-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="ps-icon-wrapper problem-icon">
              <XCircle size={32} />
            </div>
            <h3>The Old Way</h3>
            <ul className="ps-list">
              <li>Disconnected tools for inventory, payroll, and core accounting.</li>
              <li>Unbalanced journal entries failing silently in the background.</li>
              <li>Reports are manually compiled exports, not live data.</li>
              <li>Requires a consultant to configure a simple Chart of Accounts.</li>
            </ul>
          </motion.div>

          <div className="ps-arrow">
            <ArrowRight size={48} className="text-gradient" />
          </div>

          {/* Solution Card */}
          <motion.div 
            className="ps-card solution glass-panel"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="ps-icon-wrapper solution-icon">
              <CheckCircle2 size={32} />
            </div>
            <h3>The VoWam Way</h3>
            <ul className="ps-list">
              <li><strong className="text-gold">One ledger.</strong> Everything runs off a single, live database.</li>
              <li>Zero unbalanced entries. Enforced at the database level.</li>
              <li>Every number traces directly back to a journal line.</li>
              <li>Pick your industry and start posting in 15 minutes.</li>
            </ul>
          </motion.div>
        </div>
      </div>

      <style>{`
        .ps-section {
          padding: 8rem 2rem;
          background: var(--color-bg-base);
          position: relative;
        }

        .ps-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .ps-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .ps-header h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin-bottom: 1rem;
          color: var(--color-text-primary);
        }

        .ps-header p {
          font-size: 1.15rem;
          color: var(--color-text-secondary);
        }

        .ps-grid {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        @media (max-width: 900px) {
          .ps-grid {
            flex-direction: column;
          }
          .ps-arrow {
            transform: rotate(90deg);
          }
        }

        .ps-card {
          flex: 1;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .problem {
          border-color: rgba(239, 68, 68, 0.2);
        }

        .solution {
          border-color: var(--color-border-focus);
          background: var(--color-bg-surface-elevated);
        }

        .ps-icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .problem-icon {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .solution-icon {
          background: var(--color-accent-gold-glow);
          color: var(--color-accent-gold);
        }

        .ps-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .ps-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .ps-list li {
          color: var(--color-text-secondary);
          line-height: 1.6;
          position: relative;
          padding-left: 1.5rem;
        }

        .ps-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--color-text-muted);
        }

        .solution .ps-list li::before {
          color: var(--color-accent-gold);
        }

        .text-gold {
          color: var(--color-accent-gold);
        }
      `}</style>
    </section>
  );
}
