import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';

export default function DesignationModal({ isOpen, onClose, onSave, initialData = null, isLoading = false }) {
  const [designationCode, setDesignationCode] = useState(initialData?.code || '');
  const [description, setDescription] = useState(initialData?.description || '');

  // Reset form when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      setDesignationCode(initialData?.code || '');
      setDescription(initialData?.description || '');
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: initialData?.id,
      code: designationCode,
      description
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isLoading ? undefined : onClose}
          />
          
          {/* Modal Content */}
          <div className="modal-container">
            <motion.div 
              className="modal-content"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="modal-header">
                <h2>{initialData ? 'Edit Designation' : 'Add New Designation'}</h2>
                <button type="button" className="icon-btn-close" onClick={onClose} disabled={isLoading}>
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label htmlFor="designationCode">Designation Code</label>
                  <input 
                    type="text" 
                    id="designationCode"
                    value={designationCode} 
                    onChange={(e) => setDesignationCode(e.target.value)} 
                    placeholder="e.g. MGR"
                    required 
                    autoFocus
                    disabled={isLoading}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea 
                    id="description"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Detailed description of the designation..."
                    rows={4}
                    disabled={isLoading}
                  />
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={onClose} disabled={isLoading}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" disabled={!designationCode || isLoading}>
                    <Save size={18} />
                    <span>{isLoading ? 'Saving...' : 'Save Designation'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
