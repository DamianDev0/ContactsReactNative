import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import InputGeneric from '../../../components/GenericInput';
import GenericButton from '../../../components/GenericButton';
import useregister from '../hook/register.hook';

const {width, height} = Dimensions.get('screen');

const FormRegister: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    handleRegister,
    loading,
    errorMessage,
    handleLoginNavigation,
  } = useregister();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <View style={styles.content}>
        <Image
          source={require('../../../assets/img/cartoon2.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <View style={styles.formContainer}>
          <View style={styles.inputsContainer}>
            <InputGeneric
              placeholder="Name"
              width={300}
              marginBottom={20}
              value={name}
              opacity={0.6}
              onChangeText={setName}
              icon="user"
            />
            <InputGeneric
              placeholder="Email"
              width={300}
              marginBottom={20}
              value={email}
              opacity={0.6}
              onChangeText={setEmail}
              icon="envelope"
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
            title={loading ? 'Loading...' : 'Sign Up'}
            backgroundColor="#FFF"
            height={40}
            color="#000"
            onPress={handleRegister}
            disabled={loading}
          />
          <TouchableOpacity>
            <Text style={styles.signupText} onPress={handleLoginNavigation}>
              Already have an account? Log In
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
    width: width * 0.9,
    height: height * 0.9,
    position: 'relative',
  },
  logoImage: {
    width: width * 0.9,
    height: height * 0.4,
    position: 'absolute',
    top: 5,
    zIndex: 2,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: width * 0.9,
    height: width  * 1.4,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    padding: 30,
    elevation: 8,
    marginTop: 70,
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
    marginTop: 100,
  },
  signupText: {
    marginTop: 15,
    color: '#FFF',
    fontSize: 10,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default FormRegister;
