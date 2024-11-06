import {useState, useEffect} from 'react';
import {useAuth} from '../../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../types/navigation.types';

const useLogin = () => {
  const {login, loading, errorMessage} = useAuth();
  const navigation = useNavigation<RootStackParamList>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email && password) {
      await login(email, password);
      return;
    }
  };

  const handleSignUpNavigation = () => {
    navigation.navigate('Signup');
  };

  useEffect(() => {
    if (!loading && !errorMessage) {
      navigation.navigate('Main');
    }
  }, [loading, errorMessage, navigation]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    loading,
    errorMessage,
    navigation,
    handleSignUpNavigation,
  };
};

export default useLogin;
