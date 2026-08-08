import axios from 'axios';

// Configure the base URL from the environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor: Automatically attach the Tenant ID to every request if available
api.interceptors.request.use(
  (config) => {
    // Retrieve the active tenant ID from local storage (or from your global state manager/context later)
    const activeTenantId = localStorage.getItem('activeTenantId');
    
    if (activeTenantId) {
      config.headers['X-Tenant-ID'] = activeTenantId;
    }

    // You can also handle standard authorization tokens here
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global responses like 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      console.warn('Unauthorized access detected. Please log in again.');
      // window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;
