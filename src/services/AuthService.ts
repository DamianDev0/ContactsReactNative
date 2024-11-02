import axios from 'axios';
import { LoginResponse } from '../types/authtypes';

const API_URL = 'http://192.168.1.2:4000/api/v1/auth';

const apiService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      console.log('Login error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },
};

export default apiService;
