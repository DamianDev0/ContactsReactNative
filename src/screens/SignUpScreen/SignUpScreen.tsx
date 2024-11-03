import React from 'react';
import {StyleSheet, View} from 'react-native';
import FormRegister from './components/FormRegister';

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <FormRegister />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SignUpScreen;
