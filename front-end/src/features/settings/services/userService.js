import { authService } from '../../auth/services/authService';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = (isFormData = false) => {
  const headers = {
    'Authorization': `Bearer ${authService.getToken()}`
  };
  
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';
  } else {
    headers['Accept'] = 'application/json';
  }
  
  return headers;
};

export const userService = {
  /**
   * Fetch all users
   */
  getUsers: async (page = 1) => {
    const response = await fetch(`${API_URL}/users?page=${page}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch users');
    return data;
  },

  getFormDependencies: async () => {
    const response = await fetch(`${API_URL}/users/form-dependencies`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch dependencies');
    return data;
  },

  // Get a single user
  getUser: async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      headers: getHeaders(false)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch user');
    return data.data; // The user object
  },

  // Create a new user (FormData for file upload)
  createUser: async (userData) => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: getHeaders(true),
      body: userData // FormData doesn't need Content-Type header, browser sets it with boundary
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create user');
    return data;
  },

  // Update a user (FormData with _method field for PUT)
  updateUser: async (id, userData) => {
    // Laravel requires _method=PUT in FormData for file uploads to work on update
    userData.append('_method', 'PUT');
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'POST', // Sent as POST but Laravel treats as PUT
      headers: getHeaders(true),
      body: userData
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update user');
    return data;
  },

  // Delete a user
  deleteUser: async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: getHeaders(false)
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete user');
    return data;
  }
};
