import axios from 'axios';
import qs from 'qs';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  }
});

// Интерцептор для обработки ответов (опционально, но полезно)
apiClient.interceptors.response.use(
  (response) => response.data, // Сразу возвращаем data
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
