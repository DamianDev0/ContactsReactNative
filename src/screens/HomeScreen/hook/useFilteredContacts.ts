import {useMemo} from 'react';

const useFilteredContacts = (
  contacts: any[],
  searchText: string,
  searchType: 'name' | 'email' | 'phone',
) => {
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const value = contact[searchType]?.toLowerCase() || '';
      return value.includes(searchText.toLowerCase());
    });
  }, [contacts, searchText, searchType]);

  return filteredContacts;
};

export default useFilteredContacts;
