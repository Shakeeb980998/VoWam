import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImage from '../../assets/images/logo.png';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className={`app-header ${scrolled ? 'scrolled' : ''} animate-fade-in`}>
      <div className="header-content">
        <Link to="/" className="brand">
          {/* Main Logo Image */}
          <img src={logoImage} alt="VoWam Logo" className="brand-logo" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav desktop-nav">
          <Link to="#features" className="nav-link">Features</Link>
          <Link to="#solutions" className="nav-link">Solutions</Link>
          <Link to="#pricing" className="nav-link">Pricing</Link>
          <Link to="#about" className="nav-link">About</Link>
          <Link to="#contact" className="nav-link">Contact</Link>
          <div className="nav-actions">
            <Link to="/login" className="btn btn-text">Login</Link>
            <Link to="/register" className="btn btn-primary">Get Started</Link>
          </div>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-nav glass-panel">
          <Link to="#features" className="mobile-nav-link" onClick={toggleMenu}>Features</Link>
          <Link to="#solutions" className="mobile-nav-link" onClick={toggleMenu}>Solutions</Link>
          <Link to="#pricing" className="mobile-nav-link" onClick={toggleMenu}>Pricing</Link>
          <Link to="#about" className="mobile-nav-link" onClick={toggleMenu}>About</Link>
          <Link to="#contact" className="mobile-nav-link" onClick={toggleMenu}>Contact</Link>
          <div className="mobile-nav-actions">
            <Link to="/login" className="btn btn-text mobile-btn" onClick={toggleMenu}>Login</Link>
            <Link to="/register" className="btn btn-primary mobile-btn" onClick={toggleMenu}>Get Started</Link>
          </div>
        </div>
      )}

      <style>{`
        .app-header {
          position: fixed;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 80px;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border-bottom: 1px solid var(--color-border-subtle);
          background: var(--color-bg-glass);
          backdrop-filter: blur(10px);
        }

        .app-header.scrolled {
          top: 20px;
          width: 90%;
          max-width: 1400px;
          border-radius: 100px;
          background: var(--color-bg-glass-hover);
          backdrop-filter: blur(16px);
          border: 1px solid var(--color-border-subtle);
          box-shadow: var(--shadow-glass);
          height: 70px;
        }

        .header-content {
          width: 100%;
          max-width: 100%; /* allows extreme corners */
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem; /* corners */
          transition: padding 0.4s ease;
        }

        .app-header.scrolled .header-content {
          padding: 0 2rem;
        }

        .brand {
          display: flex;
          align-items: center;
          height: 100%;
        }

        .brand-logo {
          height: 40px; 
          width: auto;
          max-width: 200px;
          object-fit: contain;
          transition: height 0.4s ease;
        }

        .app-header.scrolled .brand-logo {
          height: 32px;
        }

        /* Desktop Nav Styles */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          color: var(--color-text-secondary);
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s ease;
        }

        .nav-link:hover {
          color: var(--color-text-primary);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-left: 1rem;
        }

        .btn {
          padding: 0.6rem 1.25rem;
          border-radius: var(--border-radius-pill);
          font-weight: 600;
          font-size: 0.95rem;
          transition: all var(--transition-fast);
          text-align: center;
        }

        .btn-text {
          color: var(--color-text-primary);
        }

        .btn-text:hover {
          color: var(--color-accent-gold);
        }

        .btn-primary {
          background: var(--color-accent-gold);
          color: #000;
          box-shadow: 0 4px 15px var(--color-accent-gold-glow);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          background: var(--color-accent-gold-light);
          box-shadow: 0 6px 20px rgba(247, 224, 137, 0.4);
        }

        /* Mobile Nav Styles */
        .mobile-menu-btn {
          display: none;
          color: var(--color-text-primary);
        }

        .mobile-nav {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .app-header.scrolled {
            width: 95%;
            top: 10px;
          }

          .header-content {
            padding: 0 1.5rem;
          }

          .brand-logo {
            max-width: 150px; 
          }

          .mobile-nav {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            right: 0;
            padding: 1.5rem;
            border-radius: 0 0 16px 16px;
            border-top: none;
          }

          .app-header.scrolled .mobile-nav {
            top: 70px;
            border-radius: 16px;
          }

          .mobile-nav-link {
            padding: 1rem 0;
            color: var(--color-text-primary);
            font-size: 1.1rem;
            font-weight: 500;
            border-bottom: 1px solid var(--color-border-subtle);
          }

          .mobile-nav-actions {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 1.5rem;
          }
          
          .mobile-btn {
            width: 100%;
          }
        }
      `}</style>
    </header>
  );
}
