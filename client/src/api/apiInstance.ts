import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(config => {
    // Do NOT override Content-Type for FormData — let the browser set the boundary
    if (!(config.data instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
    }

    // 1. Try localStorage first (most reliable across ports)
    let token = localStorage.getItem('authToken');

    // 2. Fallback: parse from document.cookie
    if (!token) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; AccessToken=`);
        if (parts.length === 2) {
            token = parts.pop()?.split(';').shift() || null;
        }
    }

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

export default axiosInstance;