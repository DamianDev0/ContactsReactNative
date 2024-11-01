import { useState } from 'react';
import apiService from '../../../services/AuthService';
import { LoginResponse } from '../../../types/authtypes';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { RootStackParamList } from '../../../types/navigation.types';

const useLogin = () => {
  const navigation = useNavigation<RootStackParamList>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<LoginResponse | undefined> => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response: LoginResponse = await apiService.login(email, password);
      if (response) {
        const token = response.data.accessToken;
        console.log('Token:', token);
        Alert.alert('Login successful', 'Welcome back!');
        navigation.navigate('Main');
      }
      return response;
    } catch (error: any) {
      setErrorMessage(error.message);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, errorMessage };
};

export default useLogin;
