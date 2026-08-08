import React, { useState, useEffect, useMemo } from 'react';
import { Save, AlertCircle, Shield, CheckSquare, Square, MinusSquare, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { roleService } from '../services/roleService';
import { navigationService } from '../services/navigationService';

export default function Navigations() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [systemNavigation, setSystemNavigation] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Fetch roles and system navigation structure on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [rolesData, navData] = await Promise.all([
          roleService.getRoles(),
          navigationService.getSystemNavigation()
        ]);
        setRoles(rolesData);
        setSystemNavigation(navData);
        // Do not auto-select, as user requested it should show only once selected
        setSelectedRole('');
      } catch (err) {
        setError('Failed to load initial data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // Fetch specific role navigations when role changes
  useEffect(() => {
    if (!selectedRole) {
      setSelectedKeys(new Set());
      return;
    }
    
    const fetchRoleNavigations = async () => {
      try {
        const keys = await navigationService.getRoleNavigations(selectedRole);
        setSelectedKeys(new Set(keys));
      } catch (err) {
        setError('Failed to load role navigations.');
      }
    };

    fetchRoleNavigations();
  }, [selectedRole]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  // Handle Save
  const handleSave = async () => {
    if (!selectedRole) return;
    
    setIsSaving(true);
    try {
      await navigationService.syncRoleNavigations(selectedRole, Array.from(selectedKeys));
      showToast('Navigation and permissions access saved successfully!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to save navigation access.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Checkbox Logic helpers
  const handleToggle = (item) => {
    const newSelected = new Set(selectedKeys);
    
    // Helper to deeply toggle children
    const toggleChildren = (node, select) => {
      if (node.key && !node.isTitle) {
        if (select) newSelected.add(node.key);
        else newSelected.delete(node.key);
      }
      if (node.children) {
        node.children.forEach(child => toggleChildren(child, select));
      }
    };

    const isCurrentlySelected = newSelected.has(item.key);
    
    if (isCurrentlySelected) {
      toggleChildren(item, false);
    } else {
      toggleChildren(item, true);
    }

    setSelectedKeys(newSelected);
  };

  // Determine state of a parent node
  const getCheckboxState = (item) => {
    if (!item.children || item.children.length === 0) {
      return selectedKeys.has(item.key) ? 'checked' : 'unchecked';
    }

    // Check children
    const getFlattenedChildrenKeys = (node) => {
      let keys = [];
      if (node.key && !node.isTitle) keys.push(node.key);
      if (node.children) {
        node.children.forEach(c => {
          keys = keys.concat(getFlattenedChildrenKeys(c));
        });
      }
      return keys;
    };

    const allKeys = getFlattenedChildrenKeys(item).filter(k => k !== item.key);
    if (allKeys.length === 0) return selectedKeys.has(item.key) ? 'checked' : 'unchecked';

    const selectedCount = allKeys.filter(k => selectedKeys.has(k)).length;

    if (selectedCount === allKeys.length) return 'checked';
    if (selectedCount > 0) return 'indeterminate';
    return 'unchecked';
  };

  const renderIcon = (state) => {
    if (state === 'checked') return <CheckSquare size={18} className="text-accent-navy" />;
    if (state === 'indeterminate') return <MinusSquare size={18} className="text-accent-navy" />;
    return <Square size={18} className="text-muted" />;
  };

  const renderTree = (items, depth = 0) => {
    return (
      <ul className={`nav-tree ${depth === 0 ? 'root' : 'nested'}`}>
        {items.map((item) => {
          if (item.isTitle) return null;

          const state = getCheckboxState(item);

          return (
            <li key={item.key} className="nav-tree-item">
              <div 
                className={`nav-tree-row ${selectedKeys.has(item.key) ? 'selected-row' : ''}`}
                onClick={() => handleToggle(item)}
              >
                <div className="checkbox-icon">
                  {renderIcon(state)}
                </div>
                <div className="nav-tree-label">
                  <span>{item.label}</span>
                  <span className="badge-key">{item.key}</span>
                </div>
              </div>
              
              {item.children && item.children.length > 0 && (
                <div className="nav-tree-children">
                  {renderTree(item.children, depth + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  if (isLoading) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <div className="loader-spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`toast-notification ${toast.type}`}
          >
            {toast.type === 'success' ? (
              <CheckCircle size={20} className="toast-icon success" />
            ) : (
              <AlertCircle size={20} className="toast-icon error" />
            )}
            <span className="toast-message">{toast.message}</span>
            <button 
              className="toast-close"
              onClick={() => setToast(prev => ({ ...prev, show: false }))}
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="page-header">
        <div>
          <h1 className="page-title">Navigation Access</h1>
          <p className="page-subtitle">Configure module visibility and menu access per role</p>
        </div>
        <button className="btn-primary" onClick={handleSave} disabled={isSaving || !selectedRole}>
          <Save size={20} />
          <span>{isSaving ? 'Saving...' : 'Save Access'}</span>
        </button>
      </div>

      <div className="content-wrapper">
        <div className="role-dropdown-container">
          <label htmlFor="role-select" className="role-label">
            <Shield size={18} />
            <span>Select Role to Configure</span>
          </label>
          <div className="custom-select-wrapper">
            <select 
              id="role-select"
              className="role-select" 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="" disabled>-- Select a Role --</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.code} - {role.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="error-banner">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {selectedRole ? (
          <div className="navigation-tree-card">
            <div className="card-header border-bottom">
              <h2>Module Access Configuration</h2>
            </div>
            <div className="card-body tree-body">
              {renderTree(systemNavigation)}
            </div>
          </div>
        ) : (
          <div className="empty-state-card">
            <Shield size={48} className="empty-icon" />
            <h3>No Role Selected</h3>
            <p>Please select a role from the dropdown above to view and configure its navigation access.</p>
          </div>
        )}
      </div>

      <style>{`
        .page-container {
          animation: fadeSlideUp 0.4s ease-out;
          max-width: 900px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .page-title {
          font-family: var(--font-family-heading);
          font-size: 1.75rem;
          color: var(--color-text-primary);
          margin: 0 0 0.25rem 0;
        }

        .page-subtitle {
          color: var(--color-text-muted);
          margin: 0;
          font-size: 0.95rem;
        }

        .content-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .role-dropdown-container {
          background: var(--color-bg-base);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--border-radius-lg);
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .role-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 0.75rem;
        }

        .custom-select-wrapper {
          position: relative;
        }

        .role-select {
          width: 100%;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          color: var(--color-text-primary);
          background-color: var(--color-bg-surface);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--border-radius-md);
          appearance: none;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .role-select:focus {
          outline: none;
          border-color: var(--color-accent-navy);
          box-shadow: 0 0 0 3px rgba(0, 31, 84, 0.1);
        }

        .custom-select-wrapper::after {
          content: '▼';
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.8rem;
          color: var(--color-text-muted);
          pointer-events: none;
        }

        .navigation-tree-card, .empty-state-card {
          background: var(--color-bg-base);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--border-radius-lg);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          animation: fadeSlideUp 0.3s ease-out;
        }

        .empty-state-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
          color: var(--color-text-muted);
        }

        .empty-icon {
          color: var(--color-border-subtle);
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .empty-state-card h3 {
          margin: 0 0 0.5rem 0;
          color: var(--color-text-secondary);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem 1.5rem;
          background: var(--color-bg-surface);
        }

        .card-header.border-bottom {
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .card-header h2 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        /* Tree Styles */
        .tree-body {
          padding: 1.5rem;
        }

        .nav-tree {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .nav-tree.nested {
          padding-left: 1.5rem;
          margin-top: 0.25rem;
          border-left: 1px dashed var(--color-border-subtle);
          margin-left: 1rem;
        }

        .nav-tree-item {
          margin-bottom: 0.25rem;
        }

        .nav-tree-row {
          display: flex;
          align-items: center;
          padding: 0.6rem 0.5rem;
          border-radius: var(--border-radius-md);
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .nav-tree-row:hover {
          background: var(--color-bg-surface);
        }
        
        .nav-tree-row.selected-row {
          background: rgba(0, 31, 84, 0.03);
        }

        .checkbox-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.75rem;
        }

        .text-accent-navy {
          color: var(--color-accent-navy);
        }
        .text-muted {
          color: var(--color-border-subtle);
        }

        .nav-tree-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: var(--color-text-primary);
          user-select: none;
        }

        .badge-key {
          font-size: 0.7rem;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          background: var(--color-bg-surface);
          border: 1px solid var(--color-border-subtle);
          color: var(--color-text-muted);
          font-family: monospace;
        }

        .error-banner {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          background: rgba(220, 38, 38, 0.1);
          color: #dc2626;
          border-radius: var(--border-radius-md);
          font-weight: 500;
          font-size: 0.9rem;
        }

        .btn-primary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--color-accent-navy);
          color: white;
          border: none;
          border-radius: var(--border-radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .btn-primary:hover:not(:disabled) {
          background: #001f54;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loader-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(0, 31, 84, 0.1);
          border-radius: 50%;
          border-top-color: var(--color-accent-navy);
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Toast Notification Styles */
        .toast-notification {
          position: fixed;
          top: 2rem;
          left: 50%;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: white;
          border-radius: var(--border-radius-lg);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--color-border-subtle);
          min-width: 300px;
        }

        .toast-notification.success {
          border-left: 4px solid #10b981;
        }

        .toast-notification.error {
          border-left: 4px solid #ef4444;
        }

        .toast-icon.success {
          color: #10b981;
        }

        .toast-icon.error {
          color: #ef4444;
        }

        .toast-message {
          font-weight: 500;
          color: var(--color-text-primary);
          flex: 1;
        }

        .toast-close {
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .toast-close:hover {
          background: var(--color-bg-surface);
          color: var(--color-text-primary);
        }
      `}</style>
    </div>
  );
}
