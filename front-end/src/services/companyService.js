import api from './api';

/**
 * Service for interacting with the Companies API endpoints.
 */
export const companyService = {
  /**
   * Fetch all companies
   * @returns {Promise} Axios response promise
   */
  getAllCompanies: () => {
    return api.get('/companies');
  },

  /**
   * Fetch a single company by ID
   * @param {number|string} id 
   * @returns {Promise} Axios response promise
   */
  getCompanyById: (id) => {
    return api.get(`/companies/${id}`);
  },

  /**
   * Create a new company
   * @param {Object} companyData 
   * @returns {Promise} Axios response promise
   */
  createCompany: (companyData) => {
    return api.post('/companies', companyData);
  },

  /**
   * Update an existing company
   * @param {number|string} id 
   * @param {Object} companyData 
   * @returns {Promise} Axios response promise
   */
  updateCompany: (id, companyData) => {
    return api.put(`/companies/${id}`, companyData);
  },

  /**
   * Delete a company
   * @param {number|string} id 
   * @returns {Promise} Axios response promise
   */
  deleteCompany: (id) => {
    return api.delete(`/companies/${id}`);
  },
};
