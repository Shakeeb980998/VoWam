import { authService } from '../../auth/services/authService';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${authService.getToken()}`
  };
};

export const departmentService = {
  /**
   * Fetch all departments
   * @returns {Promise<Array>}
   */
  getDepartments: async () => {
    const response = await fetch(`${API_URL}/departments`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch departments');
    return data.data || [];
  },

  /**
   * Create a new department
   * @param {Object} departmentData { code, description }
   * @returns {Promise<Object>}
   */
  createDepartment: async (departmentData) => {
    const response = await fetch(`${API_URL}/departments`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(departmentData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create department');
    return data.data;
  },

  /**
   * Update an existing department
   * @param {number} id 
   * @param {Object} departmentData { code, description }
   * @returns {Promise<Object>}
   */
  updateDepartment: async (id, departmentData) => {
    const response = await fetch(`${API_URL}/departments/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(departmentData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update department');
    return data.data;
  },

  /**
   * Delete a department
   * @param {number} id 
   * @returns {Promise<void>}
   */
  deleteDepartment: async (id) => {
    const response = await fetch(`${API_URL}/departments/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete department');
  }
};
