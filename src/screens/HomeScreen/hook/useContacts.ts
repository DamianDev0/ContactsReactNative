import {useState, useEffect, useCallback} from 'react';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Contact} from '../../../interfaces/Contact.interface';
import {useAuth} from '../../../context/AuthContext';
import {getAllContacts} from '../../../services/ContactsManager';
import Toast from 'react-native-toast-message';

const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(15);
  const [searchText, setSearchText] = useState<string>('');
  const [searchType, setSearchType] = useState<'name' | 'email' | 'phone'>(
    'name',
  );
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
      Toast.show({
        type: 'error',
        text1: 'Permission error',
        text2: 'There was an error requesting contacts permission.',
      });
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
        'https://unhappy-eba-joji-c93a17a9.koyeb.app/api/v1/contacts',
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
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to send contacts to the backend.',
      });
    }
  };

  const loadContacts = useCallback(async () => {
    setLoading(true);
    if (!token) {
      Toast.show({
        type: 'error',
        text1: 'Not Authenticated',
        text2: 'Please log in again to access contacts.',
        position: 'bottom',
      });
      setLoading(false);
      return;
    }

    const permissionGranted = await requestContactsPermission();

    if (!permissionGranted) {
      Toast.show({
        type: 'error',
        text1: 'Permission Denied',
        text2: 'Cannot access contacts without permission.',
      });
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

      const filteredContacts = searchText
        ? apiContacts.filter(contact => {
            if (searchType === 'name') {
              return contact.displayName
                ?.toLowerCase()
                .includes(searchText.toLowerCase());
            } else if (searchType === 'email') {
              return contact.email
                ?.toLowerCase()
                .includes(searchText.toLowerCase());
            } else if (searchType === 'phone') {
              return contact.phone
                ?.toLowerCase()
                .includes(searchText.toLowerCase());
            }
            return true;
          })
        : apiContacts;

      setContacts(prevContacts =>
        page === 1 ? filteredContacts : [...prevContacts, ...filteredContacts],
      );
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load contacts',
        text2: 'There was an error while loading the contacts, sorry <3',
      });
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, token, limit, searchText, searchType]);

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

  return {
    contacts,
    loading,
    loadMoreContacts,
    refreshContacts,
    searchText,
    setSearchText,
    searchType,
    setSearchType,
  };
};

export default useContacts;
