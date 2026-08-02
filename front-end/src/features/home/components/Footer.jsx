import { Link } from 'react-router-dom';
import logoImage from '../../../assets/images/logo.png';

export default function Footer() {
  return (
    <footer className="vowam-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logoImage} alt="VoWam Logo" className="footer-logo" style={{ height: '32px', objectFit: 'contain' }} />
            <p className="brand-tagline mt-4">One Platform. Complete Business Control.</p>
            <div className="social-links mt-6">
              <a href="#" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4>Company</h4>
              <Link to="/about">About</Link>
              <Link to="#features">Features</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} VoWam Inc. All rights reserved.</p>
          <div className="bottom-links">
            <span>Powered by secure cloud infrastructure.</span>
          </div>
        </div>
      </div>

      <style>{`
        .vowam-footer {
          background: var(--color-bg-surface); 
          padding: 6rem 2rem 2rem;
          border-top: 1px solid var(--color-border-subtle);
        }

        .footer-container {
          width: 100%;
          padding: 0 4vw;
          margin: 0 auto;
        }

        .footer-top {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 4rem;
          margin-bottom: 4rem;
        }

        .footer-brand {
          max-width: 300px;
        }

        .brand-tagline {
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        .mt-4 { margin-top: 1rem; }
        .mt-6 { margin-top: 1.5rem; }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-links a {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-bg-base);
          border: 1px solid var(--color-border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-secondary);
          transition: all 0.3s ease;
        }

        .social-links a:hover {
          background: var(--color-accent-gold);
          color: #fff;
          border-color: var(--color-accent-gold);
        }

        .footer-links {
          display: flex;
          gap: 4rem;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-col h4 {
          color: var(--color-text-primary);
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .footer-col a {
          color: var(--color-text-secondary);
          transition: color 0.2s ease;
        }

        .footer-col a:hover {
          color: var(--color-accent-gold);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid var(--color-border-subtle);
          color: var(--color-text-muted);
          font-size: 0.9rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .footer-top {
            flex-direction: column;
            gap: 3rem;
          }
          .footer-links {
            flex-direction: column;
            gap: 2rem;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
