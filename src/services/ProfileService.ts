import axios from 'axios';
import {Alert} from 'react-native';

const API_URL = 'https://closetoyoudeltabackend.onrender.com/api/v1/users';

const getHeaders = (token: string) => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const apiService = {
  async getProfile(token: string) {
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        headers: getHeaders(token),
      });
      return response.data;
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || error.message || 'Something went wrong');
      return null;
    }
  },
};

export default apiService;
