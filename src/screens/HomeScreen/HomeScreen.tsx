import React, {useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ContactList from './components/ContactList';
import LogoutButton from './components/LogoutButton';
import {useFocusEffect} from '@react-navigation/native';
import useContacts from './hook/useContacts';
import Loader from '../../components/Loader';

const HomeScreen = () => {
  const {contacts, loading, refreshContacts} = useContacts();

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
      {loading ? (
        <Loader />
      ) : (
        <ContactList contacts={contacts} loading={loading} />
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
    color: '#000',
    backgroundColor: 'rgba(240, 178, 122, 0.7)',
    padding: 10,
    borderRadius: 10,
  },
});


export default HomeScreen;
