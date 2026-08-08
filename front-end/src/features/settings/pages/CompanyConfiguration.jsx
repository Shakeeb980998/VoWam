import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../../contexts/ToastContext';
import { companyService } from '../services/companyService';
import { CURRENCIES, TIMEZONES } from '../../../config/constants';
import { 
  Building2, 
  MapPin,
  Phone, 
  Mail, 
  Globe, 
  Hash, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Calendar, 
  Camera,
  Save,
  Loader2
} from 'lucide-react';

const CompanyConfiguration = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    legal_name: '',
    registration_number: '',
    tax_id: '',
    contact_email: '',
    contact_phone: '',
    website_url: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    industry_code: '',
    base_currency: 'USD',
    fiscal_year_start: '',
    timezone: 'UTC'
  });
  
  const [logoPreview, setLogoPreview] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      const response = await companyService.getCompanyInfo();
      const company = response.data;
      
      if (company) {
        setFormData({
          name: company.name || '',
          legal_name: company.legal_name || '',
          registration_number: company.registration_number || '',
          tax_id: company.tax_id || '',
          contact_email: company.contact_email || '',
          contact_phone: company.contact_phone || '',
          website_url: company.website_url || '',
          address: company.address || '',
          city: company.city || '',
          state: company.state || '',
          zip_code: company.zip_code || '',
          country: company.country || '',
          industry_code: company.industry_code || '',
          base_currency: company.base_currency || 'USD',
          fiscal_year_start: company.fiscal_year_start ? company.fiscal_year_start.split('T')[0] : '',
          timezone: company.timezone || 'UTC'
        });
        
        if (company.logo_path) {
          setLogoPreview(`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/storage/${company.logo_path}`);
        }
      }
    } catch (error) {
      console.error('Error fetching company details:', error);
      showToast('Failed to load company details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        showToast('Logo must be smaller than 2MB', 'error');
        return;
      }
      setSelectedLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerLogoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Company Display Name is required', 'warning');
      return;
    }

    try {
      setSaving(true);
      
      const payload = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          payload.append(key, formData[key]);
        }
      });
      
      if (selectedLogo) {
        payload.append('logo', selectedLogo);
      }

      const response = await companyService.updateCompanyInfo(payload);
      
      showToast('Company information updated successfully!', 'success');
      
      if (response.data && response.data.logo_path) {
          setLogoPreview(`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/storage/${response.data.logo_path}`);
          setSelectedLogo(null);
      }
      
    } catch (error) {
      console.error('Error saving company info:', error);
      showToast('Failed to save company information', 'error');
    } finally {
      setSaving(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.1 }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="page-container flex-center" style={{ height: '50vh' }}>
        <div className="loader-spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-container company-config">
      {/* Header Section */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Company Profile</h1>
          <p className="page-subtitle">Manage your company's official information, branding, and system preferences.</p>
        </div>
      </div>

      <motion.form 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="form-container"
      >
        {/* Branding & Identity Section */}
        <motion.div variants={sectionVariants} className="config-card">
          <div className="card-header">
            <Building2 className="header-icon text-primary" size={20} />
            <h3>Branding & Identity</h3>
          </div>
          <div className="card-body branding-grid">
            <div className="logo-upload-section">
              <div 
                className={`logo-dropzone ${logoPreview ? 'has-image' : ''}`}
                onClick={triggerLogoUpload}
              >
                {logoPreview ? (
                  <img src={logoPreview} alt="Company Logo" className="logo-image" />
                ) : (
                  <div className="dropzone-placeholder">
                    <Camera size={32} className="opacity-50" />
                    <span>Upload Logo</span>
                  </div>
                )}
                <div className="dropzone-overlay">
                  <span>Change</span>
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleLogoChange} 
                accept="image/jpeg,image/png,image/svg+xml" 
                className="hidden" 
              />
              <p className="help-text text-center">256x256px. Max 2MB (JPEG, PNG, SVG).</p>
            </div>
            
            <div className="form-grid flex-1">
              <div className="form-group col-span-full">
                <label>Display Name <span className="required">*</span></label>
                <div className="input-with-icon">
                  <Building2 size={16} className="input-icon" />
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Legal Name</label>
                <input type="text" name="legal_name" value={formData.legal_name} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Industry</label>
                <div className="input-with-icon">
                  <Briefcase size={16} className="input-icon" />
                  <input type="text" name="industry_code" value={formData.industry_code} onChange={handleInputChange} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="config-row">
          {/* Registration & Tax */}
          <motion.div variants={sectionVariants} className="config-card flex-1">
            <div className="card-header">
              <Hash className="header-icon text-accent" size={20} />
              <h3>Registration & Tax</h3>
            </div>
            <div className="card-body">
              <div className="form-group mb-4">
                <label>Registration / CRN Number</label>
                <input type="text" name="registration_number" value={formData.registration_number} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Tax ID / VAT / EIN</label>
                <input type="text" name="tax_id" value={formData.tax_id} onChange={handleInputChange} />
              </div>
            </div>
          </motion.div>

          {/* System Defaults */}
          <motion.div variants={sectionVariants} className="config-card flex-1">
            <div className="card-header">
              <Clock className="header-icon text-warning" size={20} />
              <h3>System Defaults</h3>
            </div>
            <div className="card-body">
              <div className="form-grid two-cols mb-4">
                <div className="form-group">
                  <label>Base Currency</label>
                  <div className="input-with-icon">
                    <DollarSign size={16} className="input-icon" />
                    <select name="base_currency" value={formData.base_currency} onChange={handleInputChange}>
                      {CURRENCIES.map(currency => (
                        <option key={currency.code} value={currency.code}>
                          {currency.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Timezone</label>
                  <select name="timezone" value={formData.timezone} onChange={handleInputChange}>
                    {TIMEZONES.map(tz => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Fiscal Year Start</label>
                <div className="input-with-icon">
                  <Calendar size={16} className="input-icon" />
                  <input type="date" name="fiscal_year_start" value={formData.fiscal_year_start} onChange={handleInputChange} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact & Location */}
        <motion.div variants={sectionVariants} className="config-card">
          <div className="card-header">
            <MapPin className="header-icon text-success" size={20} />
            <h3>Contact & Location</h3>
          </div>
          <div className="card-body config-row align-start">
            <div className="form-column">
              <div className="form-group">
                <label>Official Email</label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-icon" />
                  <input type="email" name="contact_email" value={formData.contact_email} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Primary Phone</label>
                <div className="input-with-icon">
                  <Phone size={16} className="input-icon" />
                  <input type="tel" name="contact_phone" value={formData.contact_phone} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Website URL</label>
                <div className="input-with-icon">
                  <Globe size={16} className="input-icon" />
                  <input type="url" name="website_url" value={formData.website_url} onChange={handleInputChange} />
                </div>
              </div>
            </div>
            
            <div className="form-column">
              <div className="form-group">
                <label>Address / Street</label>
                <textarea name="address" rows={2} value={formData.address} onChange={handleInputChange}></textarea>
              </div>
              <div className="form-grid two-cols">
                <div className="form-group">
                  <label>City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>State / Province</label>
                  <input type="text" name="state" value={formData.state} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>ZIP / Postal Code</label>
                  <input type="text" name="zip_code" value={formData.zip_code} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input type="text" name="country" value={formData.country} onChange={handleInputChange} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Form Actions */}
        <div className="form-actions">
          <button 
            type="submit"
            className="btn-primary w-full justify-center" 
            disabled={saving}
          >
            {saving ? <div className="loader-spinner button-loader"></div> : <Save size={20} />}
            <span>{saving ? 'Saving Changes...' : 'Save Changes'}</span>
          </button>
        </div>
      </motion.form>

      <style>{`
        .company-config {
          animation: fadeSlideUp 0.4s ease-out;
          max-width: 1000px;
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
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          padding-top: 1rem;
          margin-bottom: 2rem;
        }
        
        .w-full {
          width: 100%;
        }
        
        .justify-center {
          justify-content: center;
        }

        .form-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .config-card {
          background: var(--color-bg-base);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--border-radius-lg);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .card-header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--color-border-subtle);
          background: var(--color-bg-surface);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .card-header h3 {
          margin: 0;
          font-size: 1.1rem;
          color: var(--color-text-primary);
          font-weight: 600;
        }
        
        .card-body {
          padding: 1.5rem;
        }
        
        .config-row {
          display: flex;
          gap: 1.5rem;
        }
        
        .config-row.align-start {
          align-items: flex-start;
        }
        
        .flex-1 {
          flex: 1;
        }
        
        .branding-grid {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
        }
        
        .form-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .form-grid.two-cols {
          grid-template-columns: 1fr 1fr;
        }
        
        .col-span-full {
          grid-column: 1 / -1;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .mb-4 { margin-bottom: 1rem; }
        
        .form-group label {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-text-secondary);
        }
        
        .required { color: #dc2626; }
        
        .form-group input, 
        .form-group select, 
        .form-group textarea {
          width: 100%;
          padding: 0.65rem 1rem;
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--border-radius-md);
          background: var(--color-bg-base);
          color: var(--color-text-primary);
          font-size: 0.95rem;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        
        .form-group input:focus, 
        .form-group select:focus, 
        .form-group textarea:focus {
          outline: none;
          border-color: var(--color-accent-navy);
          box-shadow: 0 0 0 3px rgba(0, 31, 84, 0.1);
        }
        
        .input-with-icon {
          position: relative;
        }
        
        .input-with-icon .input-icon {
          position: absolute;
          left: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-muted);
        }
        
        .input-with-icon input,
        .input-with-icon select {
          padding-left: 2.5rem;
        }
        
        /* Logo Upload Styles */
        .logo-upload-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          width: 150px;
        }
        
        .logo-dropzone {
          width: 140px;
          height: 140px;
          border: 2px dashed var(--color-border-subtle);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          background: var(--color-bg-surface);
          transition: all 0.2s;
        }
        
        .logo-dropzone:hover {
          border-color: var(--color-accent-gold);
          background: rgba(220, 167, 36, 0.05);
        }
        
        .dropzone-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--color-text-muted);
          font-size: 0.85rem;
          font-weight: 500;
          gap: 0.25rem;
        }
        
        .logo-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 0.5rem;
          background: white;
        }
        
        .dropzone-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: 500;
          opacity: 0;
          transition: opacity 0.2s;
        }
        
        .logo-dropzone:hover .dropzone-overlay {
          opacity: 1;
        }
        
        .help-text {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          line-height: 1.4;
        }
        
        .text-center { text-align: center; }
        .hidden { display: none; }
        .flex-center { display: flex; align-items: center; justify-content: center; }
        
        /* Icon Colors */
        .text-primary { color: var(--color-accent-navy); }
        .text-accent { color: #8b5cf6; }
        .text-warning { color: #f59e0b; }
        .text-success { color: #10b981; }

        .loader-spinner {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(0, 31, 84, 0.1);
          border-radius: 50%;
          border-top-color: var(--color-accent-navy);
          animation: spin 1s ease-in-out infinite;
        }
        
        .button-loader {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 768px) {
          .config-row, .branding-grid {
            flex-direction: column;
          }
          .logo-upload-section {
            margin: 0 auto 1.5rem auto;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default CompanyConfiguration;
