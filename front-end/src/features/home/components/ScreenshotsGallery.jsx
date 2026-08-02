import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const screenshots = [
  { id: 'dashboard', name: 'Dashboard' },
  { id: 'invoices', name: 'Invoices' },
  { id: 'payroll', name: 'Payroll' },
  { id: 'inventory', name: 'Inventory' },
  { id: 'reports', name: 'Financial Reports' },
  { id: 'mobile', name: 'Mobile View' },
];

export default function ScreenshotsGallery() {
  const [activeScreen, setActiveScreen] = useState(screenshots[0].id);

  return (
    <section className="gallery-section" id="screenshots">
      <div className="section-container">
        <div className="section-header text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            A closer look inside.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Consumer-grade design for enterprise-grade tasks.
          </motion.p>
        </div>

        <div className="gallery-nav">
          {screenshots.map((screen) => (
            <button
              key={screen.id}
              className={`gallery-btn ${activeScreen === screen.id ? 'active' : ''}`}
              onClick={() => setActiveScreen(screen.id)}
            >
              {screen.name}
              {activeScreen === screen.id && (
                <motion.div 
                  layoutId="galleryIndicator" 
                  className="gallery-indicator"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="gallery-viewport glass-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="gallery-mockup"
            >
              <div className="mockup-placeholder">
                <div className="placeholder-icon">📷</div>
                <p>Placeholder for <strong>{screenshots.find(s => s.id === activeScreen)?.name}</strong> interface.</p>
                <span className="text-muted">(Drop your screenshot image here)</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .gallery-section {
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
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.15rem;
          color: var(--color-text-secondary);
        }

        .gallery-nav {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .gallery-btn {
          padding: 0.75rem 1.5rem;
          border-radius: var(--border-radius-pill);
          color: var(--color-text-secondary);
          font-weight: 500;
          font-size: 1rem;
          position: relative;
          transition: color 0.3s ease;
        }

        .gallery-btn:hover {
          color: var(--color-text-primary);
        }

        .gallery-btn.active {
          color: var(--color-text-primary);
        }

        .gallery-indicator {
          position: absolute;
          inset: 0;
          background: var(--color-bg-surface-elevated);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--border-radius-pill);
          z-index: -1;
        }

        .gallery-viewport {
          width: 100%;
          aspect-ratio: 16/9;
          background: var(--color-bg-surface);
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          padding: 1rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
        }

        .gallery-mockup {
          width: 100%;
          height: 100%;
          background: var(--color-bg-base);
          border: 1px dashed var(--color-border-subtle);
          border-radius: var(--border-radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mockup-placeholder {
          text-align: center;
          color: var(--color-text-secondary);
        }

        .placeholder-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .mockup-placeholder p {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .gallery-viewport {
            aspect-ratio: 4/3;
          }
        }
      `}</style>
    </section>
  );
}
