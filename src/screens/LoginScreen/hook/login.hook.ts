import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation.types';

const useLogin = () => {
  const { login, loading, errorMessage: globalErrorMessage, isAuthenticated } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    if (email && password) {
      await login(email, password);

      if (isAuthenticated) {
        navigation.navigate('Main');
        setErrorMessage(null);
      } else {
        setErrorMessage(globalErrorMessage);
      }
    } else {
      setErrorMessage('Please provide both email and password.');
    }
  };

  const handleSignUpNavigation = () => {
    navigation.navigate('Signup');
  };

  useEffect(() => {
    if (isAuthenticated && !loading && !globalErrorMessage) {
      navigation.navigate('Main');
    }
  }, [isAuthenticated, loading, globalErrorMessage, navigation]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    loading,
    errorMessage,
    handleSignUpNavigation,
  };
};

export default useLogin;
