import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', 
});

// This interceptor runs BEFORE every request is sent
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem("access_token");
    
    if (token) {
      // Attach the token to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;