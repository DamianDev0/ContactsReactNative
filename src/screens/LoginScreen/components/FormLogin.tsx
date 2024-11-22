import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import InputGeneric from '../../../components/GenericInput';
import GenericButton from '../../../components/GenericButton';
import useLogin from '../hook/login.hook';

const {width, height} = Dimensions.get('screen');

const FormLogin: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    loading,
    errorMessage,
    handleSignUpNavigation,
  } = useLogin();


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.content}>
        <Image
          source={require('../../../assets/img/cartoon.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <View style={styles.formContainer}>
          <View style={styles.inputsContainer}>
            <InputGeneric
              placeholder="Email"
              width={300}
              marginBottom={20}
              value={email}
              onChangeText={setEmail}
              icon="envelope"
              opacity={0.6}
            />
            <InputGeneric
              placeholder="Password"
              width={300}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              opacity={0.6}
              icon="lock"
            />
            {errorMessage && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
          </View>
          <GenericButton
            title={loading ? 'Loading...' : 'Log in'}
            backgroundColor="#FFF"
            height={40}
            color="#000"
            onPress={handleLogin}
            disabled={loading}
          />
          <TouchableOpacity onPress={handleSignUpNavigation}>
            <Text style={styles.signupText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: height * 0.9,
    position: 'relative',
  },
  logoImage: {
    width: width * 0.9,
    height: height * 0.4,
    position: 'absolute',
    top: 15,
    zIndex: 2,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: width * 0.9,
    height: width * 1.4,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    padding: 30,
    elevation: 8,
    marginTop: 10,
  },
  errorText: {
    color: '#a93226',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 10,
  },
  inputsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    width: width * 1,
    marginTop: 170,
  },
  signupText: {
    marginTop: 15,
    color: '#FFF',
    fontSize: 10,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FormLogin;
