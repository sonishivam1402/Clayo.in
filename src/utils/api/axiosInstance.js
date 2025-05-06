import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL,
});

// Flag to track ongoing refresh request
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Request interceptor (attach access token to headers)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor (auto-refresh if 401 error)
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log(originalRequest);
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                .then((token) => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return axiosInstance(originalRequest);
                })
                .catch((err) => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const accessToken = localStorage.getItem('authToken');
                const response = await axios.post(`${baseURL}/Auth/refresh`, {accessToken, refreshToken });
                console.log("Refresh Token : ",response);
                const newToken = response.data.token;
                localStorage.setItem('authToken', newToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);

                axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + newToken;
                processQueue(null, newToken);

                return axiosInstance(originalRequest);

            } catch (err) {
                processQueue(err, null);
                localStorage.removeItem('user');
                localStorage.removeItem('authToken');
                localStorage.removeItem('refreshToken');
                toast.error('Session expired. Please login again.');
                window.location.href = '/login'; // Redirect to login
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
