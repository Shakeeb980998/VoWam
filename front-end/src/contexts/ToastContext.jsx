import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Global Toast Notification UI */}
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
              type="button"
              onClick={() => setToast(prev => ({ ...prev, show: false }))}
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Global Toast Notification Styles */
        .toast-notification {
          position: fixed;
          top: 2rem;
          left: 50%;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
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
          color: #111827;
          flex: 1;
        }

        .toast-close {
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .toast-close:hover {
          background: #f3f4f6;
          color: #111827;
        }
      `}</style>
    </ToastContext.Provider>
  );
};
