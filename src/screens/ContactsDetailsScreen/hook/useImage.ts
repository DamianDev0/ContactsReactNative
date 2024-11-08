import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {updateContactById} from '../../../services/ContactsManager';
import {useAuth} from '../../../context/AuthContext';

interface UseImageUploaderProps {
  contactId: string;
  onImageUpload: (photoUrl: string) => void;
  refreshContacts: () => void;
}

const useImageUploader = ({
  contactId,
  onImageUpload,
  refreshContacts,
}: UseImageUploaderProps) => {
  const {token} = useAuth();
  const [uploading, setUploading] = useState(false);

  const selectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
    });

    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.errorMessage) {
      console.log('ImagePicker Error: ', result.errorMessage);
    } else if (result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      if (imageUri) {
        await uploadImage(imageUri);
      }
    }
  };

  const uploadImage = async (imageUri: string) => {
    if (!token) {
      console.error('No token found, user is not authenticated.');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('photo', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'contact_photo.jpg',
      });

      const response = await updateContactById(contactId, formData, token);

      if (response?.data?.photo) {
        onImageUpload(response.data.photo);
        refreshContacts();
      }
    } catch (error) {
      console.error('Error updating contact photo:', error);
    } finally {
      setUploading(false);
    }
  };

  return {
    selectImage,
    uploading,
  };
};

export default useImageUploader;
