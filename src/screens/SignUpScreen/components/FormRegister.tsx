import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import InputGeneric from '../../../components/GenericInput';
import GenericButton from '../../../components/GenericButton';
import useLogin from '../hook/register.hook';

const {width} = Dimensions.get('screen');

const FormRegister = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleRegister,
    loading,
    errorMessage,
  } = useLogin();

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
      <GenericButton
        title={loading ? 'Loading...' : 'Sign Up'}
        color="#000"
        height={40}
        onPress={handleRegister}
        disabled={loading}
      />
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
  signupText: {
    marginTop: 15,
    color: '#333',
    fontSize: 10,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default FormRegister;
