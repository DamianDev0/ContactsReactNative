import {useState} from 'react';
import {Alert, Platform} from 'react-native';
import {Contact} from '../../../interfaces/Contact.interface';
import * as ImagePicker from 'react-native-image-picker';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {createOneContact} from '../../../services/ContactsManager';
import {useAuth} from '../../../context/AuthContext';

export const useFormContact = () => {
  const {token} = useAuth();

  const [form, setForm] = useState<Contact>({
    name: '',
    phone: '',
    email: '',
    role: null,
    photo: null,
    latitude: null,
    longitude: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);  // Estado para controlar si se está enviando la solicitud

  const resetForm = () => {
    setForm({
      name: '',
      phone: '',
      email: '',
      role: null,
      photo: null,
      latitude: null,
      longitude: null,
    });
  };

  const handleChange = (key: keyof Contact, value: string | number | null) => {
    setForm(prevForm => ({...prevForm, [key]: value}));
  };

  const validateForm = () => {
    if (!form.name || !form.phone || !form.email) {
      Alert.alert('Validation', 'Please fill in all required fields');
      return false;
    }
    return true;
  };

  const handleSaveLocation = (
    latitude: number,
    longitude: number,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    handleChange('latitude', latitude);
    handleChange('longitude', longitude);
    Alert.alert('Location Saved', 'Your location has been saved successfully!');
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    if (!validateForm() || isSubmitting) {  // Verifica si ya se está enviando
      return;
    }

    setIsSubmitting(true);  // Inicia el proceso de envío

    try {
      if (!token) {
        Alert.alert('Authentication Error', 'User not authenticated.');
        return;
      }

      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('phone', form.phone);
      formData.append('email', form.email);
      formData.append('role', form.role || '');
      if (
        form.latitude !== null &&
        form.latitude !== undefined &&
        form.longitude !== null &&
        form.longitude !== undefined
      ) {
        formData.append('latitude', Number(form.latitude).toString());
        formData.append('longitude', Number(form.longitude).toString());
      }

      if (form.photo) {
        formData.append('photo', {
          uri: form.photo,
          name: 'contact_photo.jpg',
          type: 'image/jpeg',
        });
      }

      const savedContact = await createOneContact(token, formData);
      console.log('Contact saved on server:', savedContact);

      resetForm();
      Alert.alert('Success', 'Contact saved successfully!');
    } catch (error) {
      console.error('Error saving contact:', error);
      Alert.alert('Error', 'Failed to save contact');
    } finally {
      setIsSubmitting(false);  // Termina el proceso de envío
    }
  };

  const selectImage = () => {
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', quality: 1},
      response => {
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
          Alert.alert(
            'Camera Error',
            result.errorMessage || 'Failed to launch camera',
          );
          return;
        }
        if (result.assets && result.assets.length > 0) {
          const uri = result.assets[0].uri ?? null;
          handleChange('photo', uri);
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
    handleSaveLocation,
    isSubmitting,
  };
};
