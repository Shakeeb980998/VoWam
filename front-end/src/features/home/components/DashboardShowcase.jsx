import { motion } from 'framer-motion';
import { BarChart, PieChart, Activity, Users, FileText, ArrowUpRight } from 'lucide-react';

export default function DashboardShowcase() {
  return (
    <section className="showcase-section">
      <div className="showcase-container">
        <motion.div 
          className="showcase-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2>The nerve center of your enterprise.</h2>
          <p>Real-time analytics, interconnected modules, and a single source of truth.</p>
        </motion.div>

        <div className="showcase-stage">
          {/* Main Dashboard (Center) */}
          <motion.div 
            className="mockup-main glass-panel"
            initial={{ opacity: 0, y: 100, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
          >
            <div className="mockup-nav">
              <div className="nav-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="nav-search"></div>
            </div>
            
            <div className="mockup-body">
              <div className="sidebar">
                <div className="side-item active"></div>
                <div className="side-item"></div>
                <div className="side-item"></div>
                <div className="side-item"></div>
              </div>
              <div className="content">
                <div className="top-stats">
                  <div className="stat-box">
                    <Activity size={24} className="text-gold" />
                    <div className="line"></div>
                  </div>
                  <div className="stat-box">
                    <Users size={24} className="text-gold" />
                    <div className="line"></div>
                  </div>
                  <div className="stat-box">
                    <BarChart size={24} className="text-gold" />
                    <div className="line"></div>
                  </div>
                </div>
                <div className="main-chart">
                  <div className="chart-area"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Card 1 (Left - Payroll) */}
          <motion.div 
            className="mockup-float float-left glass-panel"
            initial={{ opacity: 0, x: -100, y: 50, z: -50 }}
            whileInView={{ opacity: 1, x: -60, y: 30, z: 20 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="float-header">
              <Users size={20} className="text-gradient" />
              <span>Payroll Run Active</span>
            </div>
            <div className="float-lines">
              <div className="fl-line w-full"></div>
              <div className="fl-line w-3/4"></div>
            </div>
          </motion.div>

          {/* Floating Card 2 (Right - Invoices) */}
          <motion.div 
            className="mockup-float float-right glass-panel"
            initial={{ opacity: 0, x: 100, y: -50, z: -50 }}
            whileInView={{ opacity: 1, x: 60, y: -20, z: 20 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="float-header">
              <FileText size={20} className="text-gradient" />
              <span>Pending Approvals</span>
              <span className="badge">3</span>
            </div>
            <div className="float-lines">
              <div className="fl-box">
                <div className="fl-line w-1/2"></div>
                <ArrowUpRight size={16} className="text-gold" />
              </div>
              <div className="fl-box">
                <div className="fl-line w-1/2"></div>
                <ArrowUpRight size={16} className="text-gold" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .showcase-section {
          padding: 8rem 2rem;
          background: var(--color-bg-base);
          overflow: hidden;
        }

        .showcase-container {
          width: 100%;
          padding: 0 4vw;
          margin: 0 auto;
        }

        .showcase-header {
          text-align: center;
          margin-bottom: 6rem;
        }

        .showcase-header h2 {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          margin-bottom: 1rem;
        }

        .showcase-header p {
          font-size: 1.25rem;
          color: var(--color-text-secondary);
        }

        .showcase-stage {
          position: relative;
          perspective: 1000px;
          display: flex;
          justify-content: center;
          padding: 2rem 0 6rem;
        }

        /* Main Dashboard Mockup */
        .mockup-main {
          width: 100%;
          max-width: 1000px;
          height: 600px;
          background: var(--color-bg-surface);
          border-radius: var(--border-radius-lg);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          position: relative;
          z-index: 2;
          border: 1px solid var(--color-border-subtle);
        }

        .mockup-nav {
          height: 50px;
          border-bottom: 1px solid var(--color-border-subtle);
          display: flex;
          align-items: center;
          padding: 0 1.5rem;
          gap: 2rem;
          background: var(--color-bg-surface-elevated);
        }

        .nav-dots {
          display: flex;
          gap: 8px;
        }

        .nav-dots span {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--color-border-subtle);
        }
        
        .nav-dots span:nth-child(1) { background: #ef4444; }
        .nav-dots span:nth-child(2) { background: #eab308; }
        .nav-dots span:nth-child(3) { background: #22c55e; }

        .nav-search {
          height: 24px;
          width: 200px;
          background: var(--color-bg-base);
          border-radius: 12px;
          opacity: 0.5;
        }

        .mockup-body {
          display: flex;
          flex: 1;
        }

        .sidebar {
          width: 200px;
          border-right: 1px solid var(--color-border-subtle);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .side-item {
          height: 30px;
          border-radius: 6px;
          background: var(--color-bg-base);
          opacity: 0.5;
        }

        .side-item.active {
          opacity: 1;
          background: var(--color-accent-gold-glow);
          border-left: 3px solid var(--color-accent-gold);
        }

        .content {
          flex: 1;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .top-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .stat-box {
          height: 100px;
          background: var(--color-bg-base);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid var(--color-border-subtle);
        }

        .stat-box .line {
          height: 8px;
          width: 60%;
          background: var(--color-border-subtle);
          border-radius: 4px;
        }

        .main-chart {
          flex: 1;
          background: var(--color-bg-base);
          border-radius: 12px;
          border: 1px solid var(--color-border-subtle);
          padding: 2rem;
        }

        .chart-area {
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, var(--color-accent-gold-glow), transparent);
          border-bottom: 2px solid var(--color-accent-gold);
          border-radius: 4px;
        }

        /* Floating Cards */
        .mockup-float {
          position: absolute;
          width: 280px;
          padding: 1.5rem;
          border-radius: var(--border-radius-md);
          background: var(--color-bg-glass);
          z-index: 3;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .float-left {
          top: 30%;
          left: 5%;
        }

        .float-right {
          top: 15%;
          right: 5%;
        }

        .float-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .badge {
          background: var(--color-accent-gold);
          color: #fff;
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 12px;
          margin-left: auto;
        }

        .float-lines {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .fl-line {
          height: 12px;
          background: var(--color-border-subtle);
          border-radius: 6px;
        }

        .fl-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem;
          background: var(--color-bg-base);
          border-radius: 8px;
        }

        .w-full { width: 100%; }
        .w-3\\/4 { width: 75%; }
        .w-1\\/2 { width: 50%; }

        @media (max-width: 1024px) {
          .mockup-float {
            display: none;
          }
          .mockup-main {
            height: 400px;
          }
          .sidebar {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
