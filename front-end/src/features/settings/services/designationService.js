import { authService } from '../../auth/services/authService';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${authService.getToken()}`
  };
};

export const designationService = {
  /**
   * Fetch all designations
   * @returns {Promise<Array>}
   */
  getDesignations: async () => {
    const response = await fetch(`${API_URL}/designations`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch designations');
    return data.data || [];
  },

  /**
   * Create a new designation
   * @param {Object} designationData { code, description }
   * @returns {Promise<Object>}
   */
  createDesignation: async (designationData) => {
    const response = await fetch(`${API_URL}/designations`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(designationData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create designation');
    return data.data;
  },

  /**
   * Update an existing designation
   * @param {number} id 
   * @param {Object} designationData { code, description }
   * @returns {Promise<Object>}
   */
  updateDesignation: async (id, designationData) => {
    const response = await fetch(`${API_URL}/designations/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(designationData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update designation');
    return data.data;
  },

  /**
   * Delete a designation
   * @param {number} id 
   * @returns {Promise<void>}
   */
  deleteDesignation: async (id) => {
    const response = await fetch(`${API_URL}/designations/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete designation');
  }
};
