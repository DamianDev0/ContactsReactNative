import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import InputGeneric from '../../../components/GenericInput';
import {FormInputsProps} from '../../../types/typesFormComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import RolePicker from './rolePicker';

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
        width={310}
        marginBottom={15}
        height={45}
        icon="user"
      />
      <InputGeneric
        placeholder="Phone"
        value={form.phone}
        onChangeText={text => handleChange('phone', text)}
        width={310}
        marginBottom={15}
        height={45}
        icon="phone"
      />
      <InputGeneric
        placeholder="Email"
        value={form.email}
        onChangeText={text => handleChange('email', text)}
        width={310}
        marginBottom={15}
        height={45}
        icon="envelope"
      />

      <RolePicker
        role={form.role || ''}
        setRole={value => handleChange('role', value)}
      />

      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.photoButton} onPress={selectImage}>
          <Icon name="image" size={20} color="#fff" />
          <Text style={styles.photoButtonText}>Select Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
          <Icon name="camera" size={20} color="#fff" />
          <Text style={styles.photoButtonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>
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
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 200,
    padding: 10,
  },
  photoButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    width: 160,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  photoButtonText: {
    color: '#fff',
    marginLeft: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default FormInputs;
