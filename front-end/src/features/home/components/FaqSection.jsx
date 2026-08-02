import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "How fast can we implement VoWam?",
    a: "Unlike legacy ERPs that take months, VoWam can be deployed in just days. Our guided setup allows you to import master data and begin posting transactions in under 15 minutes."
  },
  {
    q: "Is VoWam suitable for multi-entity businesses?",
    a: "Absolutely. VoWam was built for scale. You can manage unlimited branches, subsidiaries, and companies from a single dashboard, with 1-click financial consolidation."
  },
  {
    q: "How secure is my financial data?",
    a: "We use bank-grade AES-256 encryption, continuous automated backups, and database-level row tenancy isolation. Your data is never mixed with another organization's data."
  },
  {
    q: "Do you integrate with other software?",
    a: "Yes! VoWam has an API-first architecture, meaning it seamlessly connects with CRMs, payment gateways, and custom internal tools you already use."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section" id="faq">
      <div className="section-container">
        <div className="section-header text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              className={`faq-item glass-panel ${openIndex === idx ? 'open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <button 
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              >
                <span>{faq.q}</span>
                <ChevronDown 
                  size={20} 
                  className="faq-icon" 
                  style={{ transform: openIndex === idx ? 'rotate(180deg)' : 'rotate(0)' }} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="faq-answer-wrapper"
                  >
                    <div className="faq-answer">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .faq-section {
          padding: 8rem 2rem;
          background: var(--color-bg-base);
        }

        .section-container {
          width: 100%;
          padding: 0 4vw;
          margin: 0 auto;
        }

        .section-header {
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          background: var(--color-bg-base);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--border-radius-md);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item.open {
          background: var(--color-bg-surface-elevated);
          border-color: var(--color-accent-gold);
        }

        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--color-text-primary);
          text-align: left;
        }

        .faq-icon {
          color: var(--color-accent-gold);
          transition: transform 0.3s ease;
        }

        .faq-answer-wrapper {
          overflow: hidden;
        }

        .faq-answer {
          padding: 0 2rem 2rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
          font-size: 1.05rem;
        }
      `}</style>
    </section>
  );
}
