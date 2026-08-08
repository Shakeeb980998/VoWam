import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Upload, User as UserIcon, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { userService } from '../services/userService';
import { roleService } from '../services/roleService';
import { departmentService } from '../services/departmentService';
import { designationService } from '../services/designationService';
import { useToast } from '../../../contexts/ToastContext';

export default function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const { showToast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Dropdown Options
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [managers, setManagers] = useState([]);
  const [isLoadingDependencies, setIsLoadingDependencies] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    mobile_number: '',
    gender: '',
    date_of_birth: '',
    address: '',
    role_id: '',
    department_id: '',
    designation_id: '',
    reporting_manager_id: ''
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Fetch Dependencies and User Data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingDependencies(true);
        // Fetch all dependencies in one optimized call
        const depsData = await userService.getFormDependencies();
        
        setRoles(depsData.roles || []);
        setDepartments(depsData.departments || []);
        setDesignations(depsData.designations || []);
        
        // Exclude current user from managers list if editing
        const allManagers = depsData.managers || [];
        if (isEdit) {
          setManagers(allManagers.filter(u => u.id !== parseInt(id)));
        } else {
          setManagers(allManagers);
        }

        // Fetch user data if editing
        if (isEdit) {
          const userData = await userService.getUser(id);
          setFormData({
            name: userData.name || '',
            email: userData.email || '',
            password: '', // Keep empty
            first_name: userData.details?.first_name || '',
            last_name: userData.details?.last_name || '',
            mobile_number: userData.details?.mobile_number || '',
            gender: userData.details?.gender || '',
            date_of_birth: userData.details?.date_of_birth || '',
            address: userData.details?.address || '',
            role_id: userData.role_id || '',
            department_id: userData.details?.department_id || '',
            designation_id: userData.details?.designation_id || '',
            reporting_manager_id: userData.details?.reporting_manager_id || ''
          });
          
          if (userData.avatar_url) {
            setPhotoPreview(userData.avatar_url);
          }
        }
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load required data. Please refresh.");
      } finally {
        setIsLoadingDependencies(false);
      }
    };

    fetchData();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Sync first_name + last_name into name if name is empty
    const fullName = formData.name.trim() !== '' 
      ? formData.name 
      : `${formData.first_name} ${formData.last_name}`;

    try {
      const data = new FormData();
      data.append('name', fullName);
      data.append('email', formData.email);
      if (formData.password) {
        data.append('password', formData.password);
      }
      data.append('first_name', formData.first_name);
      data.append('last_name', formData.last_name);
      data.append('mobile_number', formData.mobile_number);
      
      if (formData.gender) data.append('gender', formData.gender);
      if (formData.date_of_birth) data.append('date_of_birth', formData.date_of_birth);
      if (formData.address) data.append('address', formData.address);
      
      if (formData.role_id) data.append('role_id', formData.role_id);
      if (formData.department_id) data.append('department_id', formData.department_id);
      if (formData.designation_id) data.append('designation_id', formData.designation_id);
      if (formData.reporting_manager_id) data.append('reporting_manager_id', formData.reporting_manager_id);
      
      if (profilePhoto) data.append('profile_photo', profilePhoto);

      if (isEdit) {
        await userService.updateUser(id, data);
        showToast('User updated successfully!', 'success');
      } else {
        await userService.createUser(data);
        showToast('User created successfully!', 'success');
      }
      
      setTimeout(() => navigate('/dashboard/users'), 2000);
    } catch (err) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} user`);
      showToast(err.message || `Failed to ${isEdit ? 'update' : 'create'} user`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex items-center gap-4">
          <button 
            className="btn-back"
            onClick={() => navigate('/dashboard/users')}
            title="Back to Users"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="page-title">{isEdit ? 'Edit User' : 'Add New User'}</h1>
            <p className="page-subtitle">
              {isEdit ? 'Update system user profile and account' : 'Create a new system user profile and account'}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-banner mb-6">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <motion.div 
        className="form-card"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <form onSubmit={handleSubmit}>
          {/* Profile Photo Section */}
          <div className="form-section border-bottom">
            <h3 className="section-title">Profile Photo</h3>
            <div className="photo-upload-wrapper">
              <div className="photo-preview">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" />
                ) : (
                  <UserIcon size={48} className="text-muted" />
                )}
              </div>
              <div className="photo-actions">
                <label className="btn-upload">
                  <Upload size={18} />
                  <span>Upload Photo</span>
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg" 
                    className="hidden-input"
                    onChange={handlePhotoChange}
                  />
                </label>
                <p className="help-text">Recommended size: 256x256px. Max 2MB.</p>
              </div>
            </div>
          </div>

          {/* Account Details Section */}
          <div className="form-section border-bottom">
            <h3 className="section-title">Account Details (Required)</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>First Name *</label>
                <input 
                  type="text" 
                  name="first_name" 
                  required 
                  value={formData.first_name} 
                  onChange={handleChange} 
                  placeholder="John"
                />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input 
                  type="text" 
                  name="last_name" 
                  required 
                  value={formData.last_name} 
                  onChange={handleChange} 
                  placeholder="Doe"
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="form-group">
                <label>Password {isEdit ? '(Leave blank to keep current)' : '*'}</label>
                <input 
                  type="password" 
                  name="password" 
                  required={!isEdit}
                  minLength={8}
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="••••••••"
                />
              </div>
              <div className="form-group">
                <label>Mobile Number *</label>
                <input 
                  type="tel" 
                  name="mobile_number" 
                  required 
                  value={formData.mobile_number} 
                  onChange={handleChange} 
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Employment Details Section */}
          <div className="form-section border-bottom">
            <h3 className="section-title">Employment Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Role</label>
                <select 
                  name="role_id" 
                  value={formData.role_id} 
                  onChange={handleChange}
                  disabled={isLoadingDependencies}
                >
                  <option value="">-- Select Role --</option>
                  {roles.map(r => (
                    <option key={r.id} value={r.id}>{r.code} - {r.description}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Department</label>
                <select 
                  name="department_id" 
                  value={formData.department_id} 
                  onChange={handleChange}
                  disabled={isLoadingDependencies}
                >
                  <option value="">-- Select Department --</option>
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.code} - {d.description}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Designation</label>
                <select 
                  name="designation_id" 
                  value={formData.designation_id} 
                  onChange={handleChange}
                  disabled={isLoadingDependencies}
                >
                  <option value="">-- Select Designation --</option>
                  {designations.map(d => (
                    <option key={d.id} value={d.id}>{d.code} - {d.description}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Reporting Manager</label>
                <select 
                  name="reporting_manager_id" 
                  value={formData.reporting_manager_id} 
                  onChange={handleChange}
                  disabled={isLoadingDependencies}
                >
                  <option value="">-- Select Manager --</option>
                  {managers.map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.email})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Personal Details Section */}
          <div className="form-section">
            <h3 className="section-title">Personal Details (Optional)</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">-- Select Gender --</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input 
                  type="date" 
                  name="date_of_birth" 
                  value={formData.date_of_birth} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group full-width">
                <label>Address</label>
                <textarea 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  placeholder="Enter full address here..."
                  rows={3}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => navigate('/dashboard/users')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={isSubmitting || isLoadingDependencies}
            >
              <Save size={20} />
              <span>{isSubmitting ? (isEdit ? 'Updating User...' : 'Creating User...') : (isEdit ? 'Update User' : 'Create User')}</span>
            </button>
          </div>
        </form>
      </motion.div>

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

        .flex { display: flex; }
        .items-center { align-items: center; }
        .gap-4 { gap: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }

        .btn-back {
          background: var(--color-bg-base);
          border: 1px solid var(--color-border-subtle);
          color: var(--color-text-secondary);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-back:hover {
          background: var(--color-bg-surface);
          color: var(--color-text-primary);
          transform: translateX(-2px);
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

        .error-banner {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: rgba(220, 38, 38, 0.1);
          color: #dc2626;
          border-radius: var(--border-radius-lg);
          border: 1px solid rgba(220, 38, 38, 0.2);
        }

        .form-card {
          background: var(--color-bg-base);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--border-radius-lg);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .form-section {
          padding: 2rem;
        }

        .form-section.border-bottom {
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text-primary);
          margin: 0 0 1.5rem 0;
        }

        .photo-upload-wrapper {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .photo-preview {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: var(--color-bg-surface);
          border: 2px dashed var(--color-border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .photo-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .text-muted {
          color: var(--color-border-subtle);
        }

        .photo-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .btn-upload {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--color-bg-surface);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--border-radius-md);
          color: var(--color-text-primary);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-upload:hover {
          background: var(--color-border-subtle);
        }

        .hidden-input {
          display: none;
        }

        .help-text {
          margin: 0;
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-weight: 500;
          font-size: 0.9rem;
          color: var(--color-text-secondary);
        }

        .form-group input, 
        .form-group select, 
        .form-group textarea {
          padding: 0.75rem 1rem;
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--border-radius-md);
          background: var(--color-bg-base);
          color: var(--color-text-primary);
          font-size: 0.95rem;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .form-group input:focus, 
        .form-group select:focus, 
        .form-group textarea:focus {
          outline: none;
          border-color: var(--color-accent-navy);
          box-shadow: 0 0 0 3px rgba(0, 31, 84, 0.1);
        }
        
        .form-group select:disabled {
          background-color: var(--color-bg-surface);
          cursor: not-allowed;
          opacity: 0.7;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding: 1.5rem 2rem;
          background: var(--color-bg-surface);
          border-top: 1px solid var(--color-border-subtle);
        }

        .btn-secondary {
          padding: 0.75rem 1.5rem;
          background: white;
          color: var(--color-text-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--border-radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: var(--color-bg-surface);
          color: var(--color-text-primary);
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

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
