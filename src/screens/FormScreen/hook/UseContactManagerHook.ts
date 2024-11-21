import {useState} from 'react';
import {Platform} from 'react-native';
import {Contact} from '../../../interfaces/Contact.interface';
import * as ImagePicker from 'react-native-image-picker';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {createOneContact} from '../../../services/ContactsManager';
import {useAuth} from '../../../context/AuthContext';
import Toast from 'react-native-toast-message';

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

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      showToast('error', 'Please fill in all required fields');
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
    setModalVisible(false);
  };

  const handleSubmit = async (): Promise<boolean> => {
    if (!validateForm() || isSubmitting) {
      return false;
    }

    setIsSubmitting(true);

    try {
      if (!token) {
        showToast('error', 'User not authenticated.');
        return false;
      }

      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('phone', form.phone);
      formData.append('email', form.email);
      formData.append('role', form.role || '');
      if (form.latitude !== null && form.longitude !== null) {
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

      await createOneContact(token, formData);

      resetForm();
      showToast('success', 'Contact saved successfully!');
      return true;
    } catch (error) {
      showToast('error', 'Failed to save contact');
      return false;
    } finally {
      setIsSubmitting(false);
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
          showToast('error', response.errorMessage);
          return;
        }
        if (response.assets && response.assets.length > 0) {
          handleChange('photo', response.assets[0].uri ?? null);
        } else {
          showToast('error', 'No image was selected');
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
          showToast('error', result.errorMessage || 'Failed to launch camera');
          return;
        }
        if (result.assets && result.assets.length > 0) {
          const uri = result.assets[0].uri ?? null;
          handleChange('photo', uri);
        } else {
          showToast('error', 'No image was captured');
        }
      } else {
        handlePermissionDenied(permissionStatus);
      }
    } catch (error) {
      console.error('Failed to request camera permission', error);
      showToast('error', 'Failed to request camera permission');
    }
  };

  const handlePermissionDenied = (permissionStatus: string) => {
    if (permissionStatus === RESULTS.DENIED) {
      showToast('error', 'Camera permission is required');
    } else if (permissionStatus === RESULTS.BLOCKED) {
      showToast(
        'error',
        'Camera permission is permanently denied. Please enable it from settings.',
      );
    }
  };

  const showToast = (type: 'success' | 'error', message: string) => {
    Toast.show({
      type,
      position: 'bottom',
      text1: message,
      visibilityTime: 3000,
    });
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
