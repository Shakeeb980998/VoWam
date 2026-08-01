import { motion } from 'framer-motion';
import { Bot, LineChart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const briefText = "Good morning. Yesterday, total revenue closed at $14,250 across 3 branches. Receivables from 'TechCorp' are now 15 days overdue. Based on posted data, cash flow remains stable for the upcoming payroll run.";

export default function AILayerShowcase() {
  const [displayedText, setDisplayedText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (hasStarted) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(briefText.substring(0, i));
        i++;
        if (i > briefText.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [hasStarted]);

  return (
    <section className="ai-section" ref={sectionRef}>
      <div className="ai-container">
        <div className="ai-grid">
          <motion.div 
            className="ai-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2>AI that explains, <br/><span className="text-gradient">never guesses.</span></h2>
            <p>Your AI CFO delivers a nightly "Daily Finance Brief" in plain business language.</p>
            <ul className="ai-trust-list">
              <li><Bot size={20} className="text-gold" /> Only reads posted, deterministic data</li>
              <li><LineChart size={20} className="text-gold" /> Never invents a number</li>
              <li><Shield size={20} className="text-gold" /> Never executes transactions</li>
            </ul>
          </motion.div>

          <motion.div 
            className="ai-demo glass-panel"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="demo-header">
              <Bot size={24} className="text-gold" />
              <span>Daily Finance Brief</span>
            </div>
            <div className="demo-body">
              <p className="typing-text">
                {displayedText}
                <span className="cursor">|</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .ai-section {
          padding: 8rem 2rem;
          background: var(--color-bg-surface);
        }

        .ai-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .ai-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        @media (max-width: 900px) {
          .ai-grid {
            grid-template-columns: 1fr;
          }
        }

        .ai-content h2 {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }

        .ai-content p {
          font-size: 1.25rem;
          color: var(--color-text-secondary);
          margin-bottom: 2rem;
        }

        .ai-trust-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .ai-trust-list li {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--color-text-primary);
          font-weight: 500;
        }

        .text-gold {
          color: var(--color-accent-gold);
        }

        .ai-demo {
          border-color: var(--color-border-focus);
          background: var(--color-bg-surface-elevated);
          overflow: hidden;
        }

        .demo-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--color-border-subtle);
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 600;
          color: var(--color-accent-gold);
          background: rgba(0,0,0,0.2);
        }

        .demo-body {
          padding: 2rem;
          min-height: 250px;
        }

        .typing-text {
          font-family: 'Inter', monospace; /* Monospace feel for AI typing */
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--color-text-primary);
        }

        .cursor {
          animation: blink 1s step-end infinite;
          color: var(--color-accent-gold);
        }

        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}

// Inline fallback for Shield icon missed in imports
function Shield(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  )
}
