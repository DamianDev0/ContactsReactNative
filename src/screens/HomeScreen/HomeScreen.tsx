import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NotFound from './components/NotFound';
import ContactList from './components/ContactList';
import LogoutButton from './components/LogoutButton';
import SearchBar from '../../components/SearchBar';
import useFilteredContacts from './hook/useFilteredContacts ';
import Loader from '../../components/Loader';
import useContacts from './hook/useContacts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.types'; // Asegúrate de que esta ruta sea correcta
import { Contact2 } from '../../interfaces/Contact.interface';

const HomeScreen = () => {
  const { filteredContacts, setSearchTerm } = useFilteredContacts();
  const { loading } = useContacts();

  // Configura el hook de navegación
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Maneja el clic en un contacto
  const handlePressContact = (contact: Contact2) => {
    navigation.navigate('Details', { contact });
  };

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
        <ContactList contacts={filteredContacts} onPressContact={handlePressContact} />
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
