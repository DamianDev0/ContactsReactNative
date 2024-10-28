import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import InputGeneric from '../components/GenericInput';
import GenericButton from '../components/GenericButton';
import { useFormContact } from '../hooks/UseContactManager';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('screen');

const FormScreen = () => {
  const { form, handleChange, handleSubmit, selectImage, takePhoto } = useFormContact();
  const navigation = useNavigation();

  const onSubmit = async () => {
    await handleSubmit();
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerAnimation}>
          <LottieView
            source={require('../assets/animations/figureFom.json')}
            style={styles.lottie}
            autoPlay
            loop
          />
        </View>
        <Text style={styles.title}>New Contact</Text>
        <View style={styles.containerForm}>
          <InputGeneric
            placeholder="Name"
            value={form.name}
            onChangeText={text => handleChange('name', text)}
          />
          <InputGeneric
            placeholder="Phone"
            value={form.phone}
            onChangeText={text => handleChange('phone', text)}

          />
          <InputGeneric
            placeholder="Email"
            value={form.email}
            onChangeText={text => handleChange('email', text)}
          />
          <InputGeneric
            placeholder="Role"
            value={form.role || ''}
            onChangeText={text => handleChange('role', text)}
          />

          <TouchableOpacity style={styles.photoButton} onPress={selectImage}>
            <Text style={styles.photoButtonText}>Select Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
            <Text style={styles.photoButtonText}>Take Photo</Text>
          </TouchableOpacity>

          {form.photo ? (
            <Image source={{ uri: form.photo }} style={styles.selectedImage} />
          ) : null}

          <View style={styles.containerButtons}>
            <GenericButton
              title="Add"
              color="#000"
              width={130}
              height={45}
              onPress={onSubmit}
            />
            <GenericButton
              title="Cancel"
              color="#000"
              width={130}
              height={45}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  containerButtons: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 400,
  },
  containerForm: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 500,
  },
  photoButton: {
    marginBottom: 10,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    width: 350,
    alignItems: 'center',
  },
  photoButtonText: {
    color: '#fff',
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
  },
  lottie: {
    width: width * 1.1,
    height: width * 0.8,
  },
  containerAnimation: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 80,
  },
});

export default FormScreen;
