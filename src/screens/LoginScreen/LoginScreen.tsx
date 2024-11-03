import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import FormLogin from './components/FormLogin';
import { useAuth } from '../../context/AuthContext';

const LoginScreen = () => {
  const { loading } = useAuth();

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FormLogin />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
