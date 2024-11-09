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
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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

  const handleGoogleLogin = () => {
    console.log('Google login pressed');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
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
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>Or continue with</Text>
            <View style={styles.divider} />
          </View>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}>
            <FontAwesome
              name="google"
              size={20}
              color="#000"
              style={styles.googleIcon}
            />
          </TouchableOpacity>
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
    width: 420,
    height: 355,
    position: 'absolute',
    top: 10,
    zIndex: 2,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: width * 0.9,
    height: 610,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    padding: 30,
    elevation: 8,
    marginTop: 100,
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
    width: '100%',
    marginTop: 210,
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
    backgroundColor: '#FFF',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: '#FFF',
  },
  googleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
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
    color: '#FFF',
    fontSize: 10,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default FormLogin;
