import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import useContacts from './hook/useContacts';
import Loader from '../../components/Loader';
import ContactList from './components/ContactList';
import LogoutButton from './components/LogoutButton';
import SearchFilter from './components/SearchFiltered';
import useFilteredContacts from './hook/useFilteredContacts';

const HomeScreen = () => {
  const {contacts, loading, refreshContacts, loadMoreContacts} = useContacts();
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'email' | 'phone'>(
    'name',
  );

  const filteredContacts = useFilteredContacts(
    contacts,
    searchText,
    searchType,
  );

  useFocusEffect(
    useCallback(() => {
      refreshContacts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <View style={styles.container}>
      <LogoutButton />
      <Text style={styles.header}>Contacts</Text>
      <SearchFilter
        searchText={searchText}
        setSearchText={setSearchText}
        searchType={searchType}
        setSearchType={setSearchType}
      />
      {loading && contacts.length === 0 ? (
        <Loader />
      ) : (
        <ContactList
          contacts={filteredContacts}
          loading={loading}
          loadMoreContacts={loadMoreContacts}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFF',
    width: '100%',
  },
  header: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFF',
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
  },
});

export default HomeScreen;
