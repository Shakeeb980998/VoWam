import React, { useState, useEffect, useMemo } from 'react';
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DesignationModal from '../components/DesignationModal';
import { designationService } from '../services/designationService';
import { useToast } from '../../../contexts/ToastContext';

export default function Designations() {
  const [designations, setDesignations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDesignation, setEditingDesignation] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const { showToast } = useToast();

  // Fetch Designations
  const fetchDesignations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await designationService.getDesignations();
      setDesignations(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch designations');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, []);

  // Filter designations based on search query
  const filteredDesignations = useMemo(() => {
    return designations.filter(designation => 
      designation.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
      designation.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [designations, searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredDesignations.length / itemsPerPage) || 1;
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDesignations.slice(start, start + itemsPerPage);
  }, [filteredDesignations, currentPage, itemsPerPage]);

  // Handle Search Input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Actions
  const handleAddDesignation = () => {
    setEditingDesignation(null);
    setIsModalOpen(true);
  };

  const handleEditDesignation = (designation) => {
    setEditingDesignation(designation);
    setIsModalOpen(true);
  };

  const handleDeleteDesignation = async (designation) => {
    if (window.confirm("Are you sure you want to delete this designation?")) {
      try {
        await designationService.deleteDesignation(designation.id);
        showToast('Designation deleted successfully', 'success');
        fetchDesignations();
      } catch (err) {
        showToast(err.message || 'Failed to delete designation', 'error');
      }
    }
  };

  const handleSaveDesignation = async (formData) => {
    setIsSaving(true);
    try {
      if (editingDesignation) {
        await designationService.updateDesignation(editingDesignation.id, formData);
        showToast('Designation updated successfully', 'success');
      } else {
        await designationService.createDesignation(formData);
        showToast('Designation created successfully', 'success');
      }
      setIsModalOpen(false);
      fetchDesignations();
    } catch (err) {
      showToast(err.message || 'Failed to save designation', 'error');
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
          <h1 className="page-title">Designation Management</h1>
          <p className="page-subtitle">Manage user designations and system access levels</p>
        </div>
        <button className="btn-primary" onClick={handleAddDesignation}>
          <Plus size={20} />
          <span>Add Designation</span>
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
                <th width="30%">Designation Code</th>
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
                  currentItems.map((designation) => (
                    <tr key={designation.id}>
                      <td>
                        <span className="badge-code">{designation.code}</span>
                      </td>
                      <td className="text-muted">{designation.description}</td>
                      <td className="actions-cell">
                        <button className="action-btn edit" onClick={() => handleEditDesignation(designation)} title="Edit Designation">
                          <Edit2 size={16} />
                        </button>
                        <button className="action-btn delete" onClick={() => handleDeleteDesignation(designation)} title="Delete Designation">
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
                        <h3>No designations found</h3>
                        <p>We couldn't find any designations matching your search criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>

        {/* Pagination */}
        {filteredDesignations.length > 0 && (
          <div className="pagination-wrapper">
            <div className="pagination-info">
              Showing <strong>{((currentPage - 1) * itemsPerPage) + 1}</strong> to <strong>{Math.min(currentPage * itemsPerPage, filteredDesignations.length)}</strong> of <strong>{filteredDesignations.length}</strong> entries
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

      <DesignationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDesignation}
        initialData={editingDesignation}
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
          width: 450px;
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
          padding: 0.75rem 1rem 0.75rem 2.75rem;
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
