import axios, { AxiosError, AxiosInstance } from 'axios';


const baseURL = process.env.NEXT_PUBLIC_API_URL;


export const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async config => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response) {
      
      if (error.response.status === 401) {
      }
    }

    return Promise.reject(error);
  },
);
