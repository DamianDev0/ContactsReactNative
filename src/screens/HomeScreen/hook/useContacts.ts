import {useState, useEffect, useCallback} from 'react';
import {PermissionsAndroid, Alert} from 'react-native';
import Contacts from 'react-native-contacts';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Contact} from '../../../interfaces/Contact.interface';
import {useAuth} from '../../../context/AuthContext';
import {getAllContacts} from '../../../services/ContactsManager';

const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(15);
  const {token} = useAuth();

  const requestContactsPermission = async (): Promise<boolean> => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app would like to access your contacts.',
          buttonPositive: 'Allow',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Permission error:', error);
      Alert.alert(
        'Permission error',
        'There was an error requesting contacts permission.',
      );
      return false;
    }
  };

  const sendContactsToBackend = async (contacts: Contact[]) => {
    try {
      const formattedContacts = contacts.map(contact => ({
        name: contact.displayName || 'No name',
        phone: contact.phone || '',
      }));

      const contactData = {contacts: formattedContacts};

      const response = await axios.post(
        'https://closetoyoudeltabackend.onrender.com/api/v1/contacts',
        contactData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        await AsyncStorage.setItem('contactsSent', 'true');
      } else {
        throw new Error('Failed to send contacts');
      }
    } catch (error) {
      console.error('Error sending contacts:', error);
      Alert.alert('Error', 'Failed to send contacts to the backend.');
    }
  };

  const loadContacts = useCallback(async () => {
    setLoading(true);
    const permissionGranted = await requestContactsPermission();

    if (!permissionGranted) {
      Alert.alert(
        'Permission Denied',
        'Cannot access contacts without permission.',
      );
      setLoading(false);
      return;
    }

    try {
      const contactsSent = await AsyncStorage.getItem('contactsSent');
      if (!contactsSent) {
        const contactsList = await Contacts.getAll();
        const formattedContacts = contactsList.map(contact => ({
          displayName: contact.displayName || 'No name',
          phone:
            contact.phoneNumbers.length > 0
              ? contact.phoneNumbers[0].number
              : null,
        }));

        await sendContactsToBackend(formattedContacts);
      }

      const apiContacts = await getAllContacts(token ?? '', page, limit);
      setContacts(prevContacts =>
        page === 1 ? apiContacts : [...prevContacts, ...apiContacts],
      );
    } catch (error) {
      console.error('Failed to load contacts:', error);
      Alert.alert('Error', 'Failed to load contacts.');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, token, limit]);

  const loadMoreContacts = () => {
    setPage(prevPage => prevPage + 1);
  };

  const refreshContacts = async () => {
    setPage(1);
    await loadContacts();
  };

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  return {contacts, loading, loadMoreContacts, refreshContacts};
};

export default useContacts;
