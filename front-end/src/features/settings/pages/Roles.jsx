import React, { useState, useEffect, useMemo } from 'react';
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RoleModal from '../components/RoleModal';
import { roleService } from '../services/roleService';

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch Roles
  const fetchRoles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await roleService.getRoles();
      setRoles(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch roles');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Filter roles based on search query
  const filteredRoles = useMemo(() => {
    return roles.filter(role => 
      role.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [roles, searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage) || 1;
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRoles.slice(start, start + itemsPerPage);
  }, [filteredRoles, currentPage, itemsPerPage]);

  // Handle Search Input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Actions
  const handleAddRole = () => {
    setEditingRole(null);
    setIsModalOpen(true);
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setIsModalOpen(true);
  };

  const handleDeleteRole = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await roleService.deleteRole(id);
        setRoles(roles.filter(r => r.id !== id));
        if (currentItems.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (err) {
        alert(err.message || 'Failed to delete role');
      }
    }
  };

  const handleSaveRole = async (roleData) => {
    setIsSaving(true);
    try {
      if (editingRole) {
        const updated = await roleService.updateRole(editingRole.id, {
          code: roleData.code,
          description: roleData.description
        });
        setRoles(roles.map(r => r.id === updated.id ? updated : r));
      } else {
        const created = await roleService.createRole({
          code: roleData.code,
          description: roleData.description
        });
        setRoles([created, ...roles]);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message || 'Failed to save role');
    } finally {
      setIsSaving(false);
    }
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
      <div className="page-header">
        <div>
          <h1 className="page-title">Role Management</h1>
          <p className="page-subtitle">Manage user roles and system access levels</p>
        </div>
        <button className="btn-primary" onClick={handleAddRole}>
          <Plus size={20} />
          <span>Add Role</span>
        </button>
      </div>

      <div className="table-card">
        {error && (
          <div className="error-banner">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}
        <div className="table-toolbar">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by code or description..." 
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="premium-table">
            <thead>
              <tr>
                <th width="30%">Role Code</th>
                <th width="50%">Description</th>
                <th width="20%" className="text-right">Actions</th>
              </tr>
            </thead>
            <AnimatePresence mode="wait">
              <motion.tbody
                key={currentPage + searchQuery}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {currentItems.length > 0 ? (
                  currentItems.map((role) => (
                    <tr key={role.id}>
                      <td>
                        <span className="badge-code">{role.code}</span>
                      </td>
                      <td className="text-muted">{role.description}</td>
                      <td className="actions-cell">
                        <button className="action-btn edit" onClick={() => handleEditRole(role)} title="Edit Role">
                          <Edit2 size={16} />
                        </button>
                        <button className="action-btn delete" onClick={() => handleDeleteRole(role.id)} title="Delete Role">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="empty-state">
                      <div className="empty-state-content">
                        <Search size={40} className="empty-icon" />
                        <h3>No roles found</h3>
                        <p>We couldn't find any roles matching your search criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>

        {/* Pagination */}
        {filteredRoles.length > 0 && (
          <div className="pagination-wrapper">
            <div className="pagination-info">
              Showing <strong>{((currentPage - 1) * itemsPerPage) + 1}</strong> to <strong>{Math.min(currentPage * itemsPerPage, filteredRoles.length)}</strong> of <strong>{filteredRoles.length}</strong> entries
            </div>
            <div className="pagination-controls">
              <button 
                className="pagination-btn" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                <ChevronLeft size={16} />
              </button>
              
              <div className="pagination-pages">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button 
                    key={idx} 
                    className={`pagination-page-btn ${currentPage === idx + 1 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button 
                className="pagination-btn" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <RoleModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRole}
        initialData={editingRole}
        isLoading={isSaving}
      />
      
      {/* Page Specific Styles */}
      <style>{`
        .page-container {
          animation: fadeSlideUp 0.4s ease-out;
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

        .table-card {
          background: var(--color-bg-base);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--border-radius-lg);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .table-toolbar {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--color-border-subtle);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--color-bg-surface);
        }

        .search-input-wrapper {
          position: relative;
          width: 320px;
        }

        .search-input-wrapper .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-muted);
        }

        .search-input-wrapper input {
          width: 100%;
          padding: 0.65rem 1rem 0.65rem 2.75rem;
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--border-radius-md);
          background: var(--color-bg-base);
          color: var(--color-text-primary);
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }

        .search-input-wrapper input:focus {
          outline: none;
          border-color: var(--color-accent-navy);
          box-shadow: 0 0 0 3px rgba(0, 31, 84, 0.08);
        }

        .table-responsive {
          overflow-x: auto;
        }

        .premium-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .premium-table th {
          padding: 1rem 1.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: var(--color-bg-surface);
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .premium-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--color-border-subtle);
          font-size: 0.95rem;
          color: var(--color-text-primary);
        }
        
        .premium-table tbody tr {
          transition: background 0.2s ease;
        }

        .premium-table tbody tr:hover {
          background: rgba(170, 137, 36, 0.03); /* Subtle gold hover */
        }

        .badge-code {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          background: var(--color-bg-surface);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--border-radius-sm);
          font-family: var(--font-family-mono, monospace);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-accent-navy);
        }

        .text-muted {
          color: var(--color-text-secondary);
        }

        .text-right {
          text-align: right;
        }

        .actions-cell {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        .action-btn {
          background: none;
          border: none;
          padding: 0.5rem;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          color: var(--color-text-muted);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn.edit:hover {
          background: rgba(170, 137, 36, 0.1);
          color: var(--color-accent-gold-dark);
        }

        .action-btn.delete:hover {
          background: rgba(220, 38, 38, 0.1);
          color: #dc2626;
        }

        /* Pagination Styles */
        .pagination-wrapper {
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--color-bg-surface);
          border-top: 1px solid var(--color-border-subtle);
        }

        .pagination-info {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }

        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .pagination-pages {
          display: flex;
          gap: 0.25rem;
        }

        .pagination-btn, .pagination-page-btn {
          background: var(--color-bg-base);
          border: 1px solid var(--color-border-subtle);
          color: var(--color-text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: var(--border-radius-sm);
        }

        .pagination-btn {
          padding: 0.4rem;
        }
        
        .pagination-page-btn {
          min-width: 32px;
          height: 32px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .pagination-btn:hover:not(:disabled), .pagination-page-btn:hover:not(.active) {
          border-color: var(--color-text-muted);
          color: var(--color-text-primary);
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: var(--color-bg-surface);
        }

        .pagination-page-btn.active {
          background: var(--color-accent-navy);
          color: white;
          border-color: var(--color-accent-navy);
        }

        .empty-state {
          padding: 4rem 2rem !important;
          text-align: center;
        }

        .empty-state-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .empty-icon {
          color: var(--color-border-subtle);
        }

        .empty-state h3 {
          margin: 0;
          color: var(--color-text-primary);
        }

        .empty-state p {
          margin: 0;
          color: var(--color-text-muted);
        }
        
        .loader-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(0, 31, 84, 0.1);
          border-radius: 50%;
          border-top-color: var(--color-accent-navy);
          animation: spin 1s ease-in-out infinite;
        }

        .error-banner {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          background: rgba(220, 38, 38, 0.1);
          color: #dc2626;
          border-bottom: 1px solid rgba(220, 38, 38, 0.2);
          font-weight: 500;
          font-size: 0.9rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Modal Styles */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          z-index: 1000;
        }

        .modal-container {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
          padding: 1rem;
          pointer-events: none;
        }

        .modal-content {
          background: var(--color-bg-base);
          border-radius: var(--border-radius-lg);
          width: 100%;
          max-width: 500px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          pointer-events: auto;
          overflow: hidden;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--color-border-subtle);
          background: var(--color-bg-surface);
        }

        .modal-header h2 {
          margin: 0;
          font-family: var(--font-family-heading);
          font-size: 1.25rem;
          color: var(--color-text-primary);
        }

        .icon-btn-close {
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .icon-btn-close:hover {
          background: rgba(0,0,0,0.05);
          color: var(--color-text-primary);
        }

        .modal-form {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .form-group input, .form-group textarea {
          padding: 0.75rem 1rem;
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--border-radius-md);
          background: var(--color-bg-surface);
          color: var(--color-text-primary);
          font-family: inherit;
          font-size: 0.95rem;
          transition: all 0.2s;
        }

        .form-group input:focus, .form-group textarea:focus {
          outline: none;
          border-color: var(--color-accent-gold);
          box-shadow: 0 0 0 3px rgba(170, 137, 36, 0.1);
          background: var(--color-bg-base);
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1rem;
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
          background: #001f54; /* darker navy */
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          padding: 0.75rem 1.5rem;
          background: var(--color-bg-surface);
          color: var(--color-text-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--border-radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: var(--color-border-subtle);
          color: var(--color-text-primary);
        }
      `}</style>
    </div>
  );
}
