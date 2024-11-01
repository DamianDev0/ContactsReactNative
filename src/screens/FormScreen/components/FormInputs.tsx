import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import InputGeneric from '../../../components/GenericInput';
import { FormInputsProps } from '../../../types/typesFormComponent';


const FormInputs: React.FC<FormInputsProps> = ({
  form,
  handleChange,
  selectImage,
  takePhoto,
}) => {
  return (
    <View style={styles.containerForm}>
      <InputGeneric
        placeholder="Name"
        value={form.name}
        onChangeText={text => handleChange('name', text)}
        width={345}
        marginBottom={15}
      />
      <InputGeneric
        placeholder="Phone"
        value={form.phone}
        onChangeText={text => handleChange('phone', text)}
        width={345}
        marginBottom={15}
      />
      <InputGeneric
        placeholder="Email"
        value={form.email}
        onChangeText={text => handleChange('email', text)}
        width={345}
        marginBottom={15}
      />
      <InputGeneric
        placeholder="Role"
        value={form.role || ''}
        onChangeText={text => handleChange('role', text)}
        width={345}
        marginBottom={15}
      />

      <TouchableOpacity style={styles.photoButton} onPress={selectImage}>
        <Text style={styles.photoButtonText}>Select Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
        <Text style={styles.photoButtonText}>Take Photo</Text>
      </TouchableOpacity>

      {form.photo && (
        <Image source={{uri: form.photo}} style={styles.selectedImage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default FormInputs;
