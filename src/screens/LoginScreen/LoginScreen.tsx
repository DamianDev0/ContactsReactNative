import React from 'react';
import {StyleSheet, View} from 'react-native';
import FormLogin from './components/FormLogin';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <FormLogin />
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
