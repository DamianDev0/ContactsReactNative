// hook/useContacts.ts
import { useState, useEffect } from 'react';
import { PermissionsAndroid, Alert } from 'react-native';
import Contacts from 'react-native-contacts';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact2 } from '../../../interfaces/Contact.interface';
import { useAuth } from '../../../context/AuthContext';
import { getAllContacts } from '../../../services/ContactsManager';




const useContacts = () => {
  const [contacts, setContacts] = useState<Contact2[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAuth();

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

  const loadContacts = async () => {
    setLoading(true);
    const permissionGranted = await requestContactsPermission();

    if (permissionGranted) {
      try {
        const contactsSent = await AsyncStorage.getItem('contactsSent');

        if (!contactsSent) {
          const contactsList = await Contacts.getAll();

          const formattedContacts = contactsList.map(contact => ({
            recordID: contact.recordID,
            displayName: contact.displayName || 'No name',
            phone: contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].number : null,
          }));

          await sendContactsToBackend(formattedContacts);
        }
        const apiContacts = await getAllContacts(token ?? '');
        setContacts(apiContacts);
      } catch (error) {
        console.error('Failed to load contacts:', error);
        Alert.alert('Error', 'Failed to load contacts.');
      }
    } else {
      Alert.alert(
        'Permission Denied',
        'Cannot access contacts without permission.',
      );
    }
    setLoading(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const sendContactsToBackend = async (contacts: Contact2[]) => {
    try {
      const formattedContacts = contacts.map(contact => ({
        recordID: contact.recordID,
        name: contact.displayName || 'No name',
        phone: contact.phone || '',
      }));

      const response = await axios.post(
        'http://192.168.1.2:4000/api/v1/contacts',
        { contacts: formattedContacts },
        {
          headers: {
            'Content-Type':  'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Success', 'Contacts successfully sent to the backend.');
        await AsyncStorage.setItem('contactsSent', 'true');
      } else {
        throw new Error('Failed to send contacts');
      }
    } catch (error) {
      console.error('Error sending contacts:', error);
      Alert.alert('Error', 'Failed to send contacts to the backend.');
    }
  };

  const refreshContacts = async () => {
    setLoading(true);
    try {
      const apiContacts = await getAllContacts(token ?? '');
      setContacts(apiContacts);
    } catch (error) {
      console.error('Failed to refresh contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { contacts, loading, setContacts, refreshContacts };
};

export default useContacts;
