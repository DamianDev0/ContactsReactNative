// screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { useFilteredContacts } from '../hooks/useFilteredContacts';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation.types';
import SearchBar from '../components/InputSearch';
import ContactList from '../components/HomeScreen/ContactList';
import NotFound from '../components/HomeScreen/NotFound';
import styles from '../styles/ContactListStyles';
import { Contact } from '../interfaces/Contact.interface';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { filteredContacts, loadContacts } = useFilteredContacts(searchTerm);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleTouch = () => {
    navigation.navigate('Form');
  };

  useFocusEffect(() => {
    loadContacts();
  });

  const handlePressContact = (contact: Contact) => {
    navigation.navigate('Details', { contact });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search a contact"
        onSearch={setSearchTerm}
      />

      {filteredContacts.length === 0 ? (
        <NotFound onAddContact={handleTouch} />
      ) : (
        <ContactList contacts={filteredContacts} onPressContact={handlePressContact} />
      )}
    </View>
  );
};

export default HomeScreen;
