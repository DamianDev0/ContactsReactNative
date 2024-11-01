import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { Contact } from '../../../interfaces/Contact.interface';
import { useContacts } from '../../../hooks/asyncStorage';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const useFormContact = () => {
  const { saveContactToStorage } = useContacts();

  const [form, setForm] = useState<Contact>({
    name: '',
    phone: '',
    email: '',
    role: null,
    photo: null,
  });

  const resetForm = () => {
    setForm({
      name: '',
      phone: '',
      email: '',
      role: null,
      photo: null,
    });
  };

  const handleChange = (key: keyof Contact, value: string | null) => {
    setForm(prevForm => ({ ...prevForm, [key]: value }));
  };

  const validateForm = () => {
    if (!form.name || !form.phone || !form.email) {
      Alert.alert('Validation', 'Please fill in all required fields');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await saveContactToStorage(form);
      resetForm();
      Alert.alert('Success', 'Contact saved successfully!');
    } catch (error) {
      console.error('Error saving contact:', error);
      Alert.alert('Error', 'Failed to save contact');
    }
  };

  const selectImage = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', quality: 1 },
      (response: ImagePicker.ImagePickerResponse) => {
        if (response.didCancel) {
          return;
        }
        if (response.errorMessage) {
          Alert.alert('Error', response.errorMessage);
          return;
        }
        if (response.assets && response.assets.length > 0) {
          handleChange('photo', response.assets[0].uri ?? null);
        } else {
          Alert.alert('Error', 'No image was selected');
        }
      },
    );
  };

  const takePhoto = async () => {
    const cameraPermission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA;

    try {
      const permissionStatus = await request(cameraPermission);

      if (permissionStatus === RESULTS.GRANTED) {
        const result = await ImagePicker.launchCamera({
          mediaType: 'photo',
          saveToPhotos: true,
          quality: 1,
        });

        if (result.didCancel) {
          return;
        }
        if (result.errorCode) {
          Alert.alert('Camera Error', result.errorMessage || 'Failed to launch camera');
          return;
        }
        if (result.assets && result.assets.length > 0) {
          const uri = result.assets[0].uri ?? null;
          handleChange('photo', uri);
          await saveImageURI(uri);
        } else {
          Alert.alert('Error', 'No image was captured');
        }
      } else {
        handlePermissionDenied(permissionStatus);
      }
    } catch (error) {
      console.error('Failed to request camera permission', error);
      Alert.alert('Error', 'Failed to request camera permission');
    }
  };

  const saveImageURI = async (uri: string | null) => {
    try {
      if (uri) {
        await AsyncStorage.setItem('savedImage', uri);
      }
    } catch (error) {
      console.error('Failed to save image URI to storage', error);
    }
  };

  const handlePermissionDenied = (permissionStatus: string) => {
    if (permissionStatus === RESULTS.DENIED) {
      Alert.alert('Permission Denied', 'Camera permission is required');
    } else if (permissionStatus === RESULTS.BLOCKED) {
      Alert.alert(
        'Permission Blocked',
        'Camera permission is permanently denied. Please enable it from settings.',
      );
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
    selectImage,
    takePhoto,
    resetForm,
  };
};
