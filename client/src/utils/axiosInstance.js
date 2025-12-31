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
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            // 1. Clear Redux/Local Storage
            localStorage.removeItem("access_token"); //if using redux-persist
            
            // 2. Notify the user
            alert("Your session has expired. Please login again.");
            
            // 3. Redirect to login page
            window.location.href = "/login";
        }
        return Promise.reject(error);
  }
);

export default axiosInstance;