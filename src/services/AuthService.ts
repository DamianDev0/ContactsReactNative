import axios from 'axios';
import {handleApiError} from '../utils/erronHandler';
import {LoginResponse, RegisterResponse} from '../types/authtypes';

const API_URL = 'https://closetoyoudeltabackend.onrender.com/api/v1/auth';

const apiService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axios.post(`${API_URL}/login`, {email, password});
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  register: async (
    email: string,
    password: string,
    name: string
  ): Promise<RegisterResponse> => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
        name,
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

export default apiService;
