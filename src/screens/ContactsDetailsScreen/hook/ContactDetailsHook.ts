import {useState} from 'react';
import {useContacts} from '../../../hooks/asyncStorage';
import {Contact} from '../../../interfaces/Contact.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Location {
  latitude: number;
  longitude: number;
}

export const useContactDetail = (contact: Contact, navigation: any) => {
  const [origin, setOrigin] = useState<Location | null>(null);
  const {deleteContactFromStorage, editContactInStorage} = useContacts();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const handleDelete = () => {
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    await deleteContactFromStorage(contact.phone);
    setDeleteModalVisible(false);
    navigation.goBack();
  };

  const retrieveLocationFromStorage = async () => {
    try {
      const location = await AsyncStorage.getItem('currentLocation');
      if (location) {
        setOrigin(JSON.parse(location));
      }
    } catch (error) {
      console.error('Error retrieving location from AsyncStorage:', error);
    }
  };

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const saveEdit = async (updatedContact: {
    name: string;
    phone: string;
    email: string;
  }) => {
    await editContactInStorage({...contact, ...updatedContact});
    setEditModalVisible(false);
    navigation.goBack();
  };

  return {
    isDeleteModalVisible,
    setDeleteModalVisible,
    isEditModalVisible,
    setEditModalVisible,
    handleDelete,
    confirmDelete,
    handleEdit,
    saveEdit,
    retrieveLocationFromStorage,
    origin,
    setOrigin,
  };
};
