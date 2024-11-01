import { useCallback, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact } from '../interfaces/Contact.interface';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadContactsFromStorage = useCallback(async () => {
    try {
      const storedContacts = await AsyncStorage.getItem('contacts');
      if (storedContacts) {
        const parsedContacts = JSON.parse(storedContacts) as Contact[];
        setContacts(parsedContacts);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error loading contacts';
      console.error('Error loading contacts:', errorMessage);
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    }
  }, []);

  const saveContactToStorage = async (newContact: Contact) => {
    try {
      const updatedContacts = [...contacts, newContact];
      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
      setContacts(updatedContacts);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error saving contact';
      console.error('Error saving a contact:', errorMessage);
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    }
  };

  const editContactInStorage = async (updatedContact: Contact) => {
    try {
      const updatedContacts = contacts.map(contact =>
        contact.phone === updatedContact.phone ? updatedContact : contact,
      );
      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
      setContacts(updatedContacts);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error editing contact';
      console.error('Error editing a contact:', errorMessage);
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    }
  };

  const deleteContactFromStorage = async (phone: string) => {
    try {
      const updatedContacts = contacts.filter(
        contact => contact.phone !== phone,
      );
      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
      setContacts(updatedContacts);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error deleting contact';
      console.error('Error deleting a contact:', errorMessage);
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    }
  };

  useEffect(() => {
    loadContactsFromStorage();
  }, [loadContactsFromStorage]);

  return {
    contacts,
    error,
    saveContactToStorage,
    editContactInStorage,
    deleteContactFromStorage,
    loadContactsFromStorage,
  };
};
