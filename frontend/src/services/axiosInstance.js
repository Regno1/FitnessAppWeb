import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Attach JWT token from localStorage — skip for /api/auth/ so an expired token
// stored in localStorage cannot block the login or register request itself.
axiosInstance.interceptors.request.use(
  (config) => {
    const isAuthEndpoint = config.url?.startsWith('/api/auth/');
    if (!isAuthEndpoint) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 responses — only redirect if NOT already on an auth page
// to prevent redirect loops on /login and /register
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      const isAuthPage = currentPath === '/login' || currentPath === '/register';
      if (!isAuthPage) {
        // Clear stale credentials then navigate
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;