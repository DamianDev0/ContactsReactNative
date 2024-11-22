import {useState} from 'react';
import Toast from 'react-native-toast-message';
import apiService from '../../../services/ProfileService';
import {useAuth} from '../../../context/AuthContext';
import {launchImageLibrary} from 'react-native-image-picker';
import useProfileLogic from './useProfile';

interface EditProfileProps {
  name: string;
  phone: string;
  photo: string | null;
  onSave: (updatedContact: {
    name: string;
    phone: string;
    photo: string | null;
  }) => void;
  onClose: () => void;
}

const useEditProfile = ({
  name: initialName,
  phone: initialPhone,
  photo: initialPhoto,
  onSave,
  onClose,
}: EditProfileProps) => {
  const {token, userId} = useAuth();
  const [name, setName] = useState(initialName); // Estado para el nombre
  const [phone, setPhone] = useState(initialPhone); // Estado para el teléfono
  const [photo, setPhoto] = useState(initialPhoto); // Estado para la foto
  const [isLoading, setIsLoading] = useState(false); // Estado para la carga
  const {fetchProfile} = useProfileLogic();

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets[0]?.uri) {
        setPhoto(response.assets[0].uri); // Aquí está setPhoto
      } else {
        Toast.show({
          type: 'error',
          text1: 'No image selected',
          visibilityTime: 3000,
        });
      }
    });
  };

  const handleSave = async () => {
    if (!token || !userId) {
      Toast.show({
        type: 'error',
        text1: 'Authentication token is missing!',
        visibilityTime: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      const updatedProfile = await apiService.updateProfile(
        token,
        userId,
        name || null,
        phone || null,
        photo || null,
      );

      if (updatedProfile) {
        onSave({name, phone, photo});
        fetchProfile(); // Actualizar el perfil globalmente
        Toast.show({
          type: 'success',
          text1: 'Profile updated successfully!',
          visibilityTime: 3000,
        });
        onClose();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to update profile',
          visibilityTime: 3000,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message || 'Error updating profile',
        visibilityTime: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name,
    setName,
    phone,
    setPhone,
    photo,
    setPhoto,
    selectImage,
    handleSave,
    isLoading,
  };
};

export default useEditProfile;
