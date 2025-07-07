import axios from "axios";
import { API_BASE_URL } from "./constants";

const apiInstance = axios.create({

    baseURL:API_BASE_URL,
    timeout:5000,
    withCredentials:true,
    headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
    }
});

//strt
apiInstance.interceptors.request.use(
    (config) => {
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

// Response interceptor to handle token expiration
apiInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('auth_token');
            // Optionally redirect to login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


//end

export default apiInstance