import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation.types';

const useRegister = () => {
  const { signUp, loading, errorMessage: globalErrorMessage } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    if (email && password) {
      await signUp(email, password);

      if (!globalErrorMessage) {
        navigation.goBack();
        setErrorMessage(null);
      } else {
        setErrorMessage(globalErrorMessage);
      }
    } else {
      setErrorMessage('Please provide both email and password.');
    }
  };

  const handleLoginNavigation = () => {
    navigation.navigate('Login');
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleRegister,
    loading,
    errorMessage,
    handleLoginNavigation,
  };
};

export default useRegister;
