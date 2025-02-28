import axios from 'axios';
import API_BASE_URL from '@/config';
import useAuthStore from '@/store/authStore';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await useAuthStore.getState().refreshAccessToken();
      const newToken = await SecureStore.getItemAsync("accessToken");
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
