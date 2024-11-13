import {useState, useEffect} from 'react';
import {useAuth} from '../../../context/AuthContext';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../types/navigation.types';

const useLogin = () => {
  const {login, loading, errorMessage, isAuthenticated} = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
    if (isAuthenticated && !loading && !errorMessage) {
      navigation.navigate('Main');
    }
  }, [isAuthenticated, loading, errorMessage, navigation]);

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
