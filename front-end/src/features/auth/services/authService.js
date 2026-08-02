const API_URL = import.meta.env.VITE_API_BASE_URL;

export const authService = {
  /**
   * Login user with email and password
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<Object>} API Response
   */
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Save auth token to local storage
   * @param {string} token 
   */
  setToken: (token) => {
    localStorage.setItem('auth_token', token);
  },

  /**
   * Get auth token from local storage
   * @returns {string|null}
   */
  getToken: () => {
    return localStorage.getItem('auth_token');
  },

  /**
   * Logout user and clear token
   */
  logout: () => {
    localStorage.removeItem('auth_token');
  }
};
