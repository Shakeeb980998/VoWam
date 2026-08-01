import logoImage from '../../../assets/images/logo.png';

export default function Footer() {
  return (
    <footer className="vowam-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src={logoImage} alt="VoWam Logo" className="footer-logo" style={{ height: '30px', objectFit: 'contain' }} />
          <p className="brand-tagline">One Vision. One World.</p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4>Product</h4>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Security</a>
          </div>
          <div className="link-group">
            <h4>Industries</h4>
            <a href="#">Construction</a>
            <a href="#">Retail</a>
            <a href="#">Startups</a>
          </div>
          <div className="link-group">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Contact</a>
            <a href="#">Careers</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} VoWam. All rights reserved.</p>
      </div>

      <style>{`
        .vowam-footer {
          background: #02050a; /* Extra dark for footer */
          padding: 6rem 2rem 2rem;
          border-top: 1px solid var(--color-border-subtle);
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 4rem;
          margin-bottom: 4rem;
        }

        .footer-brand .brand-tagline {
          color: var(--color-text-secondary);
          margin-top: 1rem;
        }

        .footer-links {
          display: flex;
          gap: 4rem;
          flex-wrap: wrap;
        }

        .link-group h4 {
          color: var(--color-text-primary);
          margin-bottom: 1.5rem;
          font-size: 1rem;
        }

        .link-group a {
          display: block;
          color: var(--color-text-secondary);
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }

        .link-group a:hover {
          color: var(--color-accent-gold);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid var(--color-border-subtle);
          color: var(--color-text-muted);
          font-size: 0.9rem;
        }
      `}</style>
    </footer>
  );
}
