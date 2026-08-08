import React, { useState, useEffect, useMemo } from 'react';
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, AlertCircle, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import { useToast } from '../../../contexts/ToastContext';

export default function Users() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async (page = 1) => {
    try {
      setIsLoading(true);
      const data = await userService.getUsers(page);
      setUsers(data.data);
      setCurrentPage(data.current_page);
      setTotalPages(data.last_page);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  // Handle Delete
  const handleDelete = async (user) => {
    if (window.confirm(`Are you sure you want to delete the user: ${user.name}?`)) {
      try {
        await userService.deleteUser(user.id);
        showToast('User deleted successfully', 'success');
        fetchUsers(currentPage);
      } catch (err) {
        showToast(err.message || 'Failed to delete user', 'error');
      }
    }
  };

  // Filtered Data for client-side search (fallback if not server-side)
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const query = searchQuery.toLowerCase();
    return users.filter(user => 
      user.name?.toLowerCase().includes(query) || 
      user.email?.toLowerCase().includes(query) ||
      user.details?.mobile_number?.includes(query)
    );
  }, [users, searchQuery]);

  return (
    <div className="page-container">
      {/* Header Section */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Users</h1>
          <p className="page-subtitle">Manage system users, their access, and personal details</p>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => navigate('/dashboard/users/create')}
        >
          <Plus size={20} />
          <span>Add New User</span>
        </button>
      </div>

      {error && (
        <div className="error-banner mb-4">
          <AlertCircle size={20} />
          <span>{error}</span>
          <button onClick={() => fetchUsers(currentPage)} className="btn-retry">Retry</button>
        </div>
      )}

      {/* Main Content Card */}
      <div className="table-card">
        {/* Toolbar */}
        <div className="table-toolbar">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by name, email, or mobile..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Contact</th>
                <th>Gender / DOB</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8">
                      <div className="flex justify-center items-center gap-3 text-muted">
                        <div className="loader-spinner"></div>
                        Loading users...
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan="5" className="text-center py-12">
                      <div className="empty-state">
                        <div className="empty-icon-wrapper">
                          <UserIcon size={32} />
                        </div>
                        <h3>No users found</h3>
                        <p>Get started by adding a new user to the system.</p>
                      </div>
                    </td>
                  </motion.tr>
                ) : (
                  filteredUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <td>
                        <div className="user-info-cell">
                          <div className="avatar-placeholder">
                            {user.avatar_url ? (
                              <img src={user.avatar_url} alt={user.name} />
                            ) : (
                              user.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div className="user-details">
                            <span className="user-name">{user.name}</span>
                            <span className="user-email text-muted">{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="contact-cell text-sm text-muted">
                          {user.details?.mobile_number || 'N/A'}
                        </div>
                      </td>
                      <td>
                        <div className="demographic-cell text-sm text-muted">
                          {user.details?.gender ? (
                            <span className="capitalize">{user.details.gender}</span>
                          ) : 'N/A'} 
                          {user.details?.date_of_birth && ` • ${user.details.date_of_birth}`}
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status === 'active' ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons justify-end">
                          <button 
                            className="btn-icon text-muted hover-accent" 
                            title="Edit"
                            onClick={() => navigate(`/dashboard/users/${user.id}/edit`)}
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            className="btn-icon text-danger hover-danger" 
                            title="Delete"
                            onClick={() => handleDelete(user)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="pagination-wrapper">
            <div className="pagination-info text-muted text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <div className="pagination-controls">
              <button 
                className="btn-pagination" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                className="btn-pagination"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

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

        .btn-primary:hover {
          background: #001f54;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .error-banner {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: rgba(220, 38, 38, 0.1);
          color: #dc2626;
          border-radius: var(--border-radius-lg);
          border: 1px solid rgba(220, 38, 38, 0.2);
          margin-bottom: 1.5rem;
        }

        .btn-retry {
          margin-left: auto;
          padding: 0.25rem 0.75rem;
          background: white;
          border: 1px solid #dc2626;
          color: #dc2626;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          font-size: 0.85rem;
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
          box-shadow: 0 0 0 3px rgba(0, 31, 84, 0.1);
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          white-space: nowrap;
        }

        .data-table th {
          text-align: left;
          padding: 1rem 1.5rem;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-secondary);
          background: var(--color-bg-surface);
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .data-table td {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--color-border-subtle);
          vertical-align: middle;
        }

        .data-table tr:last-child td {
          border-bottom: none;
        }

        .user-info-cell {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .avatar-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-accent-gold);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.1rem;
          overflow: hidden;
        }

        .avatar-placeholder img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-details {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .user-name {
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .user-email {
          font-size: 0.85rem;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .status-badge.active {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .status-badge.disabled {
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        }

        .capitalize {
          text-transform: capitalize;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .justify-end {
          justify-content: flex-end;
        }

        .btn-icon {
          background: none;
          border: none;
          padding: 0.5rem;
          border-radius: var(--border-radius-md);
          cursor: pointer;
          transition: all 0.2s;
        }

        .text-muted {
          color: var(--color-text-muted);
        }

        .text-danger {
          color: #dc2626;
        }

        .hover-accent:hover {
          background: rgba(0, 31, 84, 0.1);
          color: var(--color-accent-navy);
        }

        .hover-danger:hover {
          background: rgba(220, 38, 38, 0.1);
        }

        .pagination-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          border-top: 1px solid var(--color-border-subtle);
          background: var(--color-bg-surface);
        }

        .pagination-controls {
          display: flex;
          gap: 0.5rem;
        }

        .btn-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: var(--color-bg-base);
          border: 1px solid var(--color-border-subtle);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--color-text-secondary);
        }

        .btn-pagination:hover:not(:disabled) {
          background: var(--color-accent-navy);
          border-color: var(--color-accent-navy);
          color: white;
        }

        .btn-pagination:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--color-text-muted);
        }

        .empty-icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--color-bg-surface);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          color: var(--color-border-subtle);
        }

        .empty-state h3 {
          margin: 0 0 0.5rem 0;
          color: var(--color-text-primary);
        }

        .loader-spinner {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(0, 31, 84, 0.1);
          border-radius: 50%;
          border-top-color: var(--color-accent-navy);
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
