import {useState} from 'react';
import {RootStackParamList} from '../../../types/navigation.types';
import {useAuth} from '../../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';

const useRegister = () => {
  const {signUp, loading, errorMessage} = useAuth();
  const navigation = useNavigation<RootStackParamList>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (email && password) {
      await signUp(email, password);
    } else {
      console.log('Please enter both email and password.');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleRegister,
    loading,
    errorMessage,
    navigation,
  };
};

export default useRegister;
