import axios from 'axios';
import {LoginResponse, RegisterResponse} from '../types/authtypes';
import {BACKEND_URL} from '@env';

const API_URL = `${BACKEND_URL}/auth`;

console.log('Backend URL:', BACKEND_URL);

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

  register: async (
    email: string,
    password: string,
  ): Promise<RegisterResponse> => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      console.log('Register error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Register failed');
    }
  },
};
export default apiService;
