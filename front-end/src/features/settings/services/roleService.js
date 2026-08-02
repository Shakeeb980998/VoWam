import { authService } from '../../auth/services/authService';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${authService.getToken()}`
  };
};

export const roleService = {
  /**
   * Fetch all roles
   * @returns {Promise<Array>}
   */
  getRoles: async () => {
    const response = await fetch(`${API_URL}/roles`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch roles');
    return data.data || [];
  },

  /**
   * Create a new role
   * @param {Object} roleData { code, description }
   * @returns {Promise<Object>}
   */
  createRole: async (roleData) => {
    const response = await fetch(`${API_URL}/roles`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(roleData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create role');
    return data.data;
  },

  /**
   * Update an existing role
   * @param {number} id 
   * @param {Object} roleData { code, description }
   * @returns {Promise<Object>}
   */
  updateRole: async (id, roleData) => {
    const response = await fetch(`${API_URL}/roles/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(roleData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update role');
    return data.data;
  },

  /**
   * Delete a role
   * @param {number} id 
   * @returns {Promise<void>}
   */
  deleteRole: async (id) => {
    const response = await fetch(`${API_URL}/roles/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete role');
  }
};
