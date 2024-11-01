// src/services/apiService.ts
import axios from 'axios';

const API_URL = 'http://192.168.1.2:4000/api/v1/auth';

const apiService = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      // Muestra el error detallado en la consola
      console.log('Login error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed'); // Lanza el error para manejarlo en el hook
    }
  },
};

export default apiService;
