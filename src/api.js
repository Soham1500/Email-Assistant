// src/api.js
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

export const useSecureAxios = () => {
  const { getToken } = useAuth();

  const instance = axios.create({
    baseURL: 'http://localhost:8080/api', 
  });

  instance.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};
