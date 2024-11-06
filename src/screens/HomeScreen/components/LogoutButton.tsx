import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAuth} from '../../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../types/navigation.types';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LogoutButton = () => {
  const {logout} = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Login');
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Icon name="sign-out" size={24} color="#000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 35,
    right: 20,
    padding: 8,
    zIndex: 1,
  },
});

export default LogoutButton;
