import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InputGeneric from '../../../components/GenericInput';
import GenericButton from '../../../components/GenericButton';
import useLogin from '../hook/login.hook';

const {width} = Dimensions.get('screen');

const FormLogin = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    loading,
    errorMessage,
  } = useLogin();

  const handleGoogleLogin = () => {
    console.log('Google login pressed');
  };

  const handleSignUpNavigation = () => {
    // Logic for sign up navigation
  };

  return (
    <View style={styles.formContainer}>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      <View style={styles.inputsContainer}>
        <InputGeneric
          placeholder="Email"
          width={300}
          marginBottom={20}
          value={email}
          onChangeText={setEmail}
        />
        <InputGeneric
          placeholder="Password"
          width={300}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>Or continue with</Text>
        <View style={styles.divider} />
      </View>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <FontAwesome
          name="google"
          size={20}
          color="#fff"
          style={styles.googleIcon}
        />
      </TouchableOpacity>
      <GenericButton
        title={loading ? 'Loading...' : 'Log in'}
        color="#000"
        height={40}
        onPress={handleLogin}
        disabled={loading}
      />
      <TouchableOpacity onPress={handleSignUpNavigation}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#fca9a5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: width * 0.9,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    padding: 1,
    elevation: 8,
    zIndex: 1,
    margin: 'auto',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  inputsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    width: 300,
  },
  divider: {
    flex: 0.9,
    height: 1,
    backgroundColor: '#000',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#333',
  },
  googleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  googleIcon: {
    alignSelf: 'center',
  },
  signupText: {
    marginTop: 15,
    color: '#333',
    fontSize: 10,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default FormLogin;
