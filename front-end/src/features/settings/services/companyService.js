import api from '../../../services/api';

export const companyService = {
  /**
   * Fetch the company configuration info for the current tenant.
   */
  getCompanyInfo: async () => {
    const response = await api.get('/company-info');
    return response.data;
  },

  /**
   * Update the company configuration. Uses FormData to support file uploads.
   * @param {FormData} formData 
   */
  updateCompanyInfo: async (formData) => {
    const response = await api.post('/company-info', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
