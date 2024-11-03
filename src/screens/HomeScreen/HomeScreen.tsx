import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NotFound from './components/NotFound';
import ContactList from './components/ContactList';
import LogoutButton from './components/LogoutButton';
import SearchBar from '../../components/SearchBar';
import useFilteredContacts from './hook/useFilteredContacts ';
import Loader from '../../components/Loader';
import useContacts from './hook/useContacts';

const HomeScreen = () => {
  const {filteredContacts, setSearchTerm} = useFilteredContacts();
  const {loading} = useContacts();

  return (
    <View style={styles.container}>
      <LogoutButton />
      <SearchBar placeholder="Search Contacts" onSearch={setSearchTerm} />
      <Text style={styles.header}>Contacts</Text>
      {loading ? (
        <Loader />
      ) : filteredContacts.length === 0 ? (
        <NotFound />
      ) : (
        <ContactList contacts={filteredContacts} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
