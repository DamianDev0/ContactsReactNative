import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { useFilteredContacts } from './hook/useFilteredContacts';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation.types';
import SearchBar from '../../components/InputSearch';
import ContactList from './components/ContactList';
import NotFound from './components/NotFound';
import styles from '../../styles/ContactListStyles';
import { Contact } from '../../interfaces/Contact.interface';
import LogoutButton from './components/LogoutButton';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { filteredContacts, loadContacts } = useFilteredContacts(searchTerm);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleTouch = () => {
    navigation.navigate('Form');
  };

  useFocusEffect(
    useCallback(() => {
      loadContacts();
    }, [loadContacts])
  );

  const handlePressContact = (contact: Contact) => {
    navigation.navigate('Details', { contact });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search a contact"
        onSearch={setSearchTerm}
      />
      <LogoutButton />

      {filteredContacts.length === 0 ? (
        <NotFound onAddContact={handleTouch} />
      ) : (
        <ContactList contacts={filteredContacts} onPressContact={handlePressContact} />
      )}
    </View>
  );
};

export default HomeScreen;
