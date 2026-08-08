import { authService } from '../../auth/services/authService';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${authService.getToken()}`
  };
};

export const navigationService = {
  /**
   * Fetch full system navigation configuration
   * @returns {Promise<Array>}
   */
  getSystemNavigation: async () => {
    const response = await fetch(`${API_URL}/navigation`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch system navigation');
    return data.navigation || [];
  },

  /**
   * Fetch navigations assigned to a specific role
   * @param {number} roleId 
   * @returns {Promise<Array<string>>} List of navigation keys
   */
  getRoleNavigations: async (roleId) => {
    const response = await fetch(`${API_URL}/roles/${roleId}/navigations`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch role navigations');
    return data.data || [];
  },

  /**
   * Sync navigations for a specific role
   * @param {number} roleId 
   * @param {Array<string>} navigationKeys 
   * @returns {Promise<void>}
   */
  syncRoleNavigations: async (roleId, navigationKeys) => {
    const response = await fetch(`${API_URL}/roles/${roleId}/navigations`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ navigation_keys: navigationKeys }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to save role navigations');
  }
};
