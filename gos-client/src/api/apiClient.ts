import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://localhost:7048/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для обработки ответов (опционально, но полезно)
apiClient.interceptors.response.use(
  (response) => response.data, // Сразу возвращаем data
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
