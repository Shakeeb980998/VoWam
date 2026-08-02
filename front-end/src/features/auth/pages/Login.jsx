import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoImage from '../../../assets/images/logo.png';

export default function Login() {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div 
          className="auth-panel glass-panel"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <Link to="/">
              <img src={logoImage} alt="VoWam Logo" className="auth-logo" />
            </Link>
            <h2>Welcome back</h2>
            <p>Enter your credentials to access your workspace.</p>
          </div>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="name@company.com" className="form-input" />
            </div>
            
            <div className="form-group">
              <div className="label-row">
                <label>Password</label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>
              <input type="password" placeholder="••••••••" className="form-input" />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-4">Sign In</button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register" className="auth-link">Contact Sales</Link></p>
          </div>
        </motion.div>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg-base);
          padding: 2rem;
          background-image: radial-gradient(circle at 50% -20%, var(--color-accent-gold-glow) 0%, transparent 60%);
        }

        .auth-container {
          width: 100%;
          max-width: 480px;
        }

        .auth-panel {
          padding: 3.5rem;
          border-radius: var(--border-radius-lg);
          background: var(--color-bg-surface);
          border: 1px solid var(--color-border-subtle);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .auth-logo {
          height: 48px;
          object-fit: contain;
          margin-bottom: 2rem;
        }

        .auth-header h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: var(--color-text-primary);
        }

        .auth-header p {
          color: var(--color-text-secondary);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .form-group label {
          font-weight: 500;
          color: var(--color-text-primary);
          font-size: 0.95rem;
        }

        .forgot-link {
          font-size: 0.85rem;
          color: var(--color-accent-gold);
        }

        .form-input {
          padding: 0.85rem 1rem;
          border-radius: var(--border-radius-md);
          border: 1px solid var(--color-border-subtle);
          background: var(--color-bg-base);
          color: var(--color-text-primary);
          font-family: inherit;
          font-size: 1rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--color-accent-gold);
          box-shadow: 0 0 0 3px var(--color-accent-gold-glow);
        }

        .w-full {
          width: 100%;
        }
        
        .mt-4 {
          margin-top: 1rem;
        }

        .auth-footer {
          margin-top: 2.5rem;
          text-align: center;
          color: var(--color-text-secondary);
        }

        .auth-link {
          color: var(--color-text-primary);
          font-weight: 600;
          transition: color 0.2s ease;
          margin-left: 0.5rem;
        }

        .auth-link:hover {
          color: var(--color-accent-gold);
        }
      `}</style>
    </div>
  );
}
