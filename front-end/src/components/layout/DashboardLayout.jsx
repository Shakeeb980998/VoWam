import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  ChevronRight,
  Home,
  Clock,
  Calendar,
  Clipboard,
  Wallet,
  Package,
  CreditCard,
  Briefcase,
  DollarSign,
  Box,
  Settings,
  Bell,
  Search
} from 'lucide-react';
import { authService } from '../../features/auth/services/authService';
import logoImage from '../../assets/images/logo.png';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [navItems, setNavItems] = useState(authService.getNavigation());
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target.closest('.user-profile-container')) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileDropdownOpen]);

  // Fetch fresh navigation on refresh/mount
  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/navigation', {
          headers: {
            'Authorization': `Bearer ${authService.getToken()}`,
            'Accept': 'application/json'
            // NOTE: If using X-Tenant-ID, we might need to send it.
            // But we can check if it's stored in user object in localStorage if needed.
            // Let's assume subdomain handles it or we send the token and it's resolved.
          }
        });
        if (response.ok) {
          const data = await response.json();
          setNavItems(data.navigation || []);
          authService.setNavigation(data.navigation || []);
        }
      } catch (err) {
        console.error('Failed to refresh navigation', err);
      }
    };
    fetchNavigation();
  }, []);

  const toggleSubMenu = (menuName) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
    if (!isSidebarOpen) {
      setIsSidebarOpen(true);
    }
  };

  // Live clock updater
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getIcon = (iconName) => {
    const icons = {
      'home': <Home size={20} />,
      'user': <User size={20} />,
      'clock': <Clock size={20} />,
      'calendar': <Calendar size={20} />,
      'clipboard': <Clipboard size={20} />,
      'pocket': <Wallet size={20} />,
      'package': <Package size={20} />,
      'credit-card': <CreditCard size={20} />,
      'briefcase': <Briefcase size={20} />,
      'dollar-sign': <DollarSign size={20} />,
      'settings': <Settings size={20} />
    };
    return icons[iconName] || <Box size={20} />;
  };

  const handleLogout = async () => {
    try {
      await fetch(import.meta.env.VITE_API_BASE_URL + '/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authService.getToken()}`,
          'Accept': 'application/json',
        }
      });
    } catch (e) {
      // Ignore errors on logout
    }
    authService.logout();
    navigate('/login');
  };

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          {isSidebarOpen ? (
            <img src={logoImage} alt="VoWam" className="sidebar-logo" />
          ) : (
            <img src="/icons.svg" alt="VoWam" className="sidebar-logo-min" />
          )}
          <button className="mobile-close-btn" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => {
              if (item.isTitle) {
                return (
                  <li key={item.key} className={`nav-section-title ${isSidebarOpen ? '' : 'hidden'}`}>
                    {item.label}
                  </li>
                );
              }
              
              return (
                <li key={item.key} className="nav-item">
                  {item.children && item.children.length > 0 ? (
                    <>
                      <button 
                        className={`nav-link sub-toggle ${expandedMenus[item.key] ? 'expanded' : ''}`}
                        onClick={() => toggleSubMenu(item.key)}
                      >
                        <span className="nav-icon">{getIcon(item.icon)}</span>
                        <span className="nav-text">{item.label}</span>
                        <span className="nav-chevron">
                          {expandedMenus[item.key] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </span>
                      </button>
                      {expandedMenus[item.key] && isSidebarOpen && (
                        <ul className="sub-nav-list">
                          {item.children.map(sub => (
                            <li key={sub.key}>
                              <NavLink 
                                to={`/dashboard${sub.url}`} 
                                className={({ isActive }) => `sub-nav-link ${isActive ? 'active' : ''}`}
                              >
                                <span className="sub-nav-dot"></span>
                                <span className="sub-nav-text">{sub.label}</span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <NavLink 
                      to={`/dashboard${item.url || ''}`} 
                      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                      <span className="nav-icon">{getIcon(item.icon)}</span>
                      <span className="nav-text">{item.label}</span>
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-link logout-btn" onClick={handleLogout} title="Sign Out">
            <span className="nav-icon"><LogOut size={20} /></span>
            <span className="nav-text">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="dashboard-main-area">
        {/* TOPBAR */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu size={24} />
            </button>
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search across modules..." />
            </div>
          </div>

          <div className="topbar-right">
            <div className="time-display">
              <div className="time-text">{formattedTime}</div>
              <div className="date-text">{formattedDate}</div>
            </div>

            <button className="notification-btn">
              <Bell size={22} />
              <span className="notification-badge">3</span>
            </button>

            <div className="user-profile-container">
              <div 
                className="user-profile" 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <div className="avatar">
                  <User size={20} />
                </div>
                <div className="user-info">
                  <span className="user-name">Admin User</span>
                  <span className="user-role">Administrator</span>
                </div>
                <ChevronDown size={16} className={`profile-chevron ${isProfileDropdownOpen ? 'open' : ''}`} />
              </div>
              
              {isProfileDropdownOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <span className="dropdown-name">Admin User</span>
                    <span className="dropdown-email">admin@vowam.com</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={() => {}}>
                    <User size={16} className="dropdown-icon" />
                    <span>My Profile</span>
                  </button>
                  <button className="dropdown-item" onClick={() => {}}>
                    <Settings size={16} className="dropdown-icon" />
                    <span>Settings</span>
                  </button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    <LogOut size={16} className="dropdown-icon" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>

      <style>{`
        .dashboard-layout {
          display: flex;
          height: 100vh;
          width: 100vw;
          background: var(--color-bg-surface);
          overflow: hidden;
        }

        /* --- SIDEBAR --- */
        .sidebar {
          width: 260px;
          background: var(--color-bg-base);
          border-right: 1px solid var(--color-border-subtle);
          display: flex;
          flex-direction: column;
          transition: width 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.35s ease;
          z-index: 100;
          overflow: hidden;
          flex-shrink: 0;
        }

        .sidebar.closed {
          transform: translateX(-100%);
          position: absolute;
          height: 100vh;
        }

        @media (min-width: 1024px) {
          .sidebar.closed {
            transform: translateX(0);
            width: 80px;
            position: relative;
          }
          
          .sidebar.closed .nav-text {
            opacity: 0;
            width: 0;
            overflow: hidden;
            margin-left: 0;
          }
          
          .sidebar.closed .nav-link {
            justify-content: center;
            padding: 0.85rem 0;
          }
        }

        .sidebar-header {
          height: 72px;
          display: flex;
          align-items: center;
          padding: 0 1.5rem;
          border-bottom: 1px solid var(--color-border-subtle);
          justify-content: space-between;
          white-space: nowrap;
          overflow: hidden;
        }

        .sidebar.closed .sidebar-header {
          justify-content: center;
          padding: 0;
        }

        .sidebar-logo {
          height: 32px;
          object-fit: contain;
          transition: opacity 0.3s ease;
        }
        
        .sidebar-logo-min {
          height: 32px;
          width: 32px;
          object-fit: contain;
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        .mobile-close-btn {
          display: none;
          background: none;
          border: none;
          color: var(--color-text-secondary);
          cursor: pointer;
        }

        @media (max-width: 1024px) {
          .sidebar {
            position: fixed;
            height: 100vh;
          }
          .mobile-close-btn {
            display: block;
          }
        }

        .sidebar-nav {
          flex: 1;
          padding: 1.5rem 1rem;
          overflow-y: auto;
          /* Hide scrollbar for all browsers */
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        .sidebar-nav::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }

        .sidebar-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1rem;
          color: var(--color-text-secondary);
          text-decoration: none;
          border-radius: var(--border-radius-sm);
          font-weight: 500;
          transition: all 0.2s ease;
          border: none;
          background: transparent;
          width: 100%;
          cursor: pointer;
          font-size: 0.95rem;
          white-space: nowrap;
          overflow: hidden;
        }

        .nav-section-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 1.5rem 1rem 0.5rem 1rem;
          margin-top: 0.5rem;
          white-space: nowrap;
          overflow: hidden;
          transition: opacity 0.2s ease, height 0.2s ease, padding 0.2s ease;
        }

        .nav-section-title.hidden {
          opacity: 0;
          padding-top: 0;
          padding-bottom: 0;
          height: 0;
          margin: 0;
        }

        .nav-link:hover, .sub-toggle:hover {
          background: rgba(170, 137, 36, 0.05);
          color: var(--color-accent-navy);
        }

        .nav-link.active, .sub-toggle.expanded {
          background: var(--color-accent-gold-glow);
          color: var(--color-accent-navy);
          font-weight: 600;
        }

        .nav-text {
          opacity: 1;
          flex: 1;
          text-align: left;
          transition: opacity 0.2s ease, width 0.2s ease;
        }

        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: inherit;
          flex-shrink: 0;
        }
        
        .nav-chevron {
          display: flex;
          align-items: center;
          opacity: 0.6;
          transition: opacity 0.2s ease;
        }

        .sidebar.closed .nav-chevron {
          opacity: 0;
          width: 0;
          display: none;
        }

        /* --- SUB NAVIGATION --- */
        .sub-nav-list {
          list-style: none;
          padding: 0 0 0 2.5rem;
          margin: 0.25rem 0 0.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .sub-nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 1rem;
          color: var(--color-text-muted);
          text-decoration: none;
          border-radius: var(--border-radius-sm);
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .sub-nav-link:hover {
          color: var(--color-accent-navy);
        }

        .sub-nav-link.active {
          color: var(--color-accent-navy);
          font-weight: 600;
        }

        .sub-nav-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.5;
          flex-shrink: 0;
        }

        .sub-nav-link.active .sub-nav-dot {
          background: var(--color-accent-gold);
          opacity: 1;
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid var(--color-border-subtle);
        }

        .logout-btn {
          color: #dc2626;
        }

        .logout-btn:hover {
          background: rgba(220, 38, 38, 0.1);
          color: #b91c1c;
        }

        /* --- MAIN AREA --- */
        .dashboard-main-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* --- TOPBAR --- */
        .topbar {
          height: 72px;
          background: var(--color-bg-base);
          border-bottom: 1px solid var(--color-border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          flex-shrink: 0;
        }

        .topbar-left, .topbar-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .menu-toggle {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0.5rem;
          border-radius: var(--border-radius-sm);
          transition: background 0.2s ease;
        }

        .menu-toggle:hover {
          background: var(--color-bg-surface);
          color: var(--color-text-primary);
        }

        .search-bar {
          position: relative;
          display: flex;
          align-items: center;
          width: 300px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: var(--color-text-muted);
        }

        .search-bar input {
          width: 100%;
          padding: 0.6rem 1rem 0.6rem 2.8rem;
          border: 1px solid var(--color-border-subtle);
          border-radius: 20px;
          background: var(--color-bg-surface);
          font-family: inherit;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }

        .search-bar input:focus {
          outline: none;
          border-color: var(--color-accent-gold);
          background: var(--color-bg-base);
          box-shadow: 0 0 0 3px var(--color-accent-gold-glow);
        }

        .time-display {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding-right: 1.5rem;
          border-right: 1px solid var(--color-border-subtle);
        }

        .time-text {
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--color-accent-navy);
          font-variant-numeric: tabular-nums;
        }

        .date-text {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
        }

        .notification-btn {
          position: relative;
          background: none;
          border: none;
          color: var(--color-text-secondary);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .notification-btn:hover {
          background: var(--color-bg-surface);
          color: var(--color-accent-navy);
        }

        .notification-badge {
          position: absolute;
          top: 2px;
          right: 4px;
          background: #ef4444;
          color: white;
          font-size: 0.65rem;
          font-weight: bold;
          height: 16px;
          min-width: 16px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
          border: 2px solid var(--color-bg-base);
        }

        .user-profile-container {
          position: relative;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          padding: 0.4rem 0.75rem;
          border-radius: var(--border-radius-md);
          transition: background 0.2s ease;
        }

        .user-profile:hover {
          background: var(--color-bg-surface);
        }

        .profile-chevron {
          color: var(--color-text-muted);
          transition: transform 0.2s ease;
        }
        
        .profile-chevron.open {
          transform: rotate(180deg);
        }

        .profile-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 240px;
          background: var(--color-bg-base);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-lg);
          padding: 0.5rem 0;
          z-index: 1000;
          animation: dropIn 0.2s ease;
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-header {
          padding: 0.75rem 1rem;
          display: flex;
          flex-direction: column;
        }

        .dropdown-name {
          font-weight: 600;
          color: var(--color-text-primary);
          font-size: 0.95rem;
        }

        .dropdown-email {
          color: var(--color-text-muted);
          font-size: 0.8rem;
          margin-top: 0.1rem;
        }

        .dropdown-divider {
          height: 1px;
          background: var(--color-border-subtle);
          margin: 0.5rem 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem 1rem;
          border: none;
          background: transparent;
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .dropdown-item:hover {
          background: var(--color-bg-surface);
          color: var(--color-accent-navy);
        }

        .dropdown-item.text-danger {
          color: #dc2626;
        }

        .dropdown-item.text-danger:hover {
          background: rgba(220, 38, 38, 0.05);
        }

        .dropdown-icon {
          opacity: 0.7;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--color-accent-gold-glow);
          color: var(--color-accent-gold-dark);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--color-text-primary);
        }

        .user-role {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }

        /* --- DASHBOARD CONTENT --- */
        .dashboard-content {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
          background: var(--color-bg-surface);
        }

        @media (max-width: 768px) {
          .topbar {
            padding: 0 1rem;
          }
          .search-bar {
            display: none;
          }
          .time-display {
            display: none;
          }
          .user-info {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
