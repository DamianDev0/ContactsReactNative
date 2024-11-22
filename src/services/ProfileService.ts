import axios from 'axios';
import { Alert } from 'react-native';

const API_URL = 'https://unhappy-eba-joji-c93a17a9.koyeb.app/api/v1/users';

const getHeaders = (token: string) => {
  return {
    'Content-Type': 'multipart/form-data',
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
      Alert.alert(
        'Error',
        error.response?.data?.message ||
          error.message ||
          'Something went wrong',
      );
      return null;
    }
  },

  async updateProfile(
    token: string,
    userId: string,
    name: string | null,
    phone: string | null,
    photo: string | null,
  ) {
    const formData = new FormData();

    if (name) {
      formData.append('name', name);
    }

    if (phone) {
      formData.append('phone', phone);
    }

    if (photo) {
      const photoData = {
        uri: photo,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };

      formData.append('photo', photoData);
    }

    try {
      const response = await axios.patch(`${API_URL}/${userId}`, formData, {
        headers: {
          ...getHeaders(token),
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.message ||
          error.message ||
          'Something went wrong',
      );
      return null;
    }
  },
};

export default apiService;
