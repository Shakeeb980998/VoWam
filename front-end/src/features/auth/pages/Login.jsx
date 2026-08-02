import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoImage from '../../../assets/images/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  
  // Rotating tagline for the presentation side
  const taglines = [
    "Complete Business Control",
    "Financial Intelligence",
    "Cloud Accounting"
  ];
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="login-wrapper">
      {/* LEFT COLUMN: AUTH FORM */}
      <div className="login-form-container">
        <motion.div 
          className="login-form-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="brand-header">
            <Link to="/">
              <motion.img 
                src={logoImage} 
                alt="VoWam Logo" 
                className="brand-logo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </Link>
          </div>

          <div className="auth-header-text">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Enter your credentials to access your workspace.
            </motion.p>
          </div>

          <motion.form 
            className="auth-form" 
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className={`form-group-premium ${focusedInput === 'email' ? 'focused' : ''} ${email ? 'has-value' : ''}`}>
              <label>Email Address</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="name@company.com" 
                />
              </div>
            </div>
            
            <div className={`form-group-premium ${focusedInput === 'password' ? 'focused' : ''} ${password ? 'has-value' : ''}`}>
              <div className="label-row">
                <label>Password</label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <motion.button 
              type="submit" 
              className="btn-premium-login"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px var(--color-accent-gold-glow)" }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '8px'}}>
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </motion.button>
          </motion.form>

          <motion.div 
            className="auth-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p>Don't have an account? <Link to="/contact" className="auth-link">Contact Sales</Link></p>
          </motion.div>
        </motion.div>
      </div>

      {/* RIGHT COLUMN: VISUAL PRESENTATION */}
      <div className="login-presentation-container">
        <div className="presentation-mesh-bg">
          <motion.div 
            className="mesh-blob blob-1"
            animate={{ 
              x: [0, 50, -20, 0], 
              y: [0, -30, 40, 0],
              scale: [1, 1.1, 0.9, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="mesh-blob blob-2"
            animate={{ 
              x: [0, -40, 30, 0], 
              y: [0, 50, -20, 0],
              scale: [1, 1.2, 0.8, 1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="presentation-content">
          <motion.div 
            className="glass-showcase-card"
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="showcase-header">
              <img src="/icons.svg" alt="VoWam Icon" className="showcase-icon" />
              <div className="showcase-tagline-wrapper">
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={taglineIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    {taglines[taglineIndex]}
                  </motion.h3>
                </AnimatePresence>
              </div>
            </div>
            <p className="showcase-desc">
              Experience the power of a modern cloud ERP built for growth, speed, and precision.
            </p>
            
            <div className="showcase-metrics">
              <div className="metric-box">
                <span className="metric-val">99.9%</span>
                <span className="metric-lbl">Uptime</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">256-bit</span>
                <span className="metric-lbl">Encryption</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">24/7</span>
                <span className="metric-lbl">Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .login-wrapper {
          display: flex;
          min-height: 100vh;
          width: 100%;
          background: var(--color-bg-base);
          overflow: hidden;
        }

        /* --- LEFT SIDE: FORM --- */
        .login-form-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          z-index: 10;
        }

        .login-form-content {
          width: 100%;
          max-width: 440px;
        }

        .brand-header {
          margin-bottom: 3rem;
        }

        .brand-logo {
          height: 52px;
          object-fit: contain;
          cursor: pointer;
        }

        .auth-header-text h1 {
          font-family: var(--font-family-heading);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-text-primary);
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .auth-header-text p {
          font-size: 1.1rem;
          color: var(--color-text-secondary);
          margin-bottom: 2.5rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group-premium {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .form-group-premium label {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--color-text-primary);
          transition: color 0.3s ease;
        }

        .form-group-premium.focused label {
          color: var(--color-accent-navy);
        }

        .forgot-link {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-accent-gold);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .forgot-link:hover {
          color: var(--color-accent-navy);
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--color-text-muted);
          transition: color 0.3s ease;
        }

        .form-group-premium.focused .input-icon,
        .form-group-premium.has-value .input-icon {
          color: var(--color-accent-navy);
        }

        .input-wrapper input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          font-size: 1rem;
          font-family: inherit;
          color: var(--color-text-primary);
          background: var(--color-bg-surface);
          border: 1.5px solid var(--color-border-subtle);
          border-radius: var(--border-radius-md);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .input-wrapper input:focus {
          outline: none;
          background: var(--color-bg-base);
          border-color: var(--color-accent-navy);
          box-shadow: 0 0 0 4px rgba(0, 31, 84, 0.08);
        }

        .btn-premium-login {
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 1.1rem;
          font-size: 1.05rem;
          font-weight: 600;
          color: #ffffff;
          background: linear-gradient(135deg, var(--color-accent-navy) 0%, #003380 100%);
          border: none;
          border-radius: var(--border-radius-md);
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0, 31, 84, 0.15);
        }

        .auth-footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.95rem;
          color: var(--color-text-secondary);
        }

        .auth-link {
          color: var(--color-accent-navy);
          font-weight: 600;
          text-decoration: none;
          margin-left: 0.25rem;
          transition: color 0.2s ease;
        }

        .auth-link:hover {
          color: var(--color-accent-gold);
        }

        /* --- RIGHT SIDE: PRESENTATION --- */
        .login-presentation-container {
          flex: 1.2;
          position: relative;
          background: var(--color-bg-surface);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 2rem;
          border-left: 1px solid var(--color-border-subtle);
        }

        .presentation-mesh-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: #f0f4f8; /* Soft base for mesh */
        }

        .mesh-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.6;
        }

        .blob-1 {
          top: -10%;
          left: -10%;
          width: 70vw;
          height: 70vw;
          background: radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(255,255,255,0) 70%);
        }

        .blob-2 {
          bottom: -20%;
          right: -10%;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, var(--color-accent-gold-glow) 0%, rgba(255,255,255,0) 70%);
        }

        .presentation-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 500px;
        }

        .glass-showcase-card {
          background: var(--color-bg-glass);
          backdrop-filter: var(--backdrop-blur);
          -webkit-backdrop-filter: var(--backdrop-blur);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: var(--border-radius-lg);
          padding: 3rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1), 
                      inset 0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .showcase-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .showcase-icon {
          height: 48px;
          width: 48px;
          object-fit: contain;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.05));
        }

        .showcase-tagline-wrapper {
          height: 40px;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .showcase-header h3 {
          font-family: var(--font-family-heading);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--color-accent-navy);
          margin: 0;
          line-height: 1.1;
        }

        .showcase-desc {
          font-size: 1.15rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        .showcase-metrics {
          display: flex;
          gap: 1rem;
          justify-content: space-between;
        }

        .metric-box {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 1rem;
          background: rgba(255,255,255,0.6);
          border-radius: var(--border-radius-md);
          border: 1px solid rgba(255,255,255,0.8);
          flex: 1;
        }

        .metric-val {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-accent-gold);
          font-family: var(--font-family-heading);
        }

        .metric-lbl {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .login-presentation-container {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
