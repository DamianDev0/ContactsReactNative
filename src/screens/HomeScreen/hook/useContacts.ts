import { useState, useEffect } from 'react';
import { PermissionsAndroid, Alert } from 'react-native';
import Contacts from 'react-native-contacts';
import { Contact2 } from '../../../interfaces/Contact.interface';

const useContacts = () => {
  const [contacts, setContacts] = useState<Contact2[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado para manejar la carga

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
    setLoading(true); // Establecer loading en true antes de cargar contactos
    const permissionGranted = await requestContactsPermission();

    if (permissionGranted) {
      try {
        const contactsList = await Contacts.getAll();

        const formattedContacts = contactsList.map(contact => ({
          recordID: contact.recordID,
          displayName: contact.displayName || 'No name',
          phone:
            contact.phoneNumbers.length > 0
              ? contact.phoneNumbers[0].number
              : null,
        }));

        setContacts(formattedContacts);
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
    setLoading(false); // Establecer loading en false después de cargar contactos
  };

  useEffect(() => {
    loadContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { contacts, loading }; // Devolver el estado de loading
};

export default useContacts;
