import { useState, useEffect, useCallback } from 'react';
import { useContacts } from './asyncStorage';
import { Contact } from '../interfaces/Contact.interface';

export const useFilteredContacts = (searchTerm: string) => {
  const { contacts, loadContactsFromStorage } = useContacts();
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const applyFilter = () => {
      if (searchTerm.trim() === '') {
        setFilteredContacts(contacts);
      } else {
        const filtered = contacts.filter(contact =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredContacts(filtered);
      }
    };

    applyFilter();
  }, [searchTerm, contacts]);

  const loadContacts = useCallback(() => {
    loadContactsFromStorage();
  }, [loadContactsFromStorage]);

  return { filteredContacts, loadContacts };
};
