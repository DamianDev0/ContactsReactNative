import {useState, useEffect} from 'react';
import useContacts from './useContacts';
import {Contact2} from '../../../interfaces/Contact.interface';

const useFilteredContacts = () => {
  const {contacts} = useContacts();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredContacts, setFilteredContacts] = useState<Contact2[]>([]);

  useEffect(() => {
    const results = contacts.filter(contact =>
      contact.displayName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase() || ''),
    );
    setFilteredContacts(results);
  }, [contacts, searchTerm]);

  return {filteredContacts, setSearchTerm};
};

export default useFilteredContacts;
