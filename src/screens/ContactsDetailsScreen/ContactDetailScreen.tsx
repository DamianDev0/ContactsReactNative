import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigation.types';
import {useContactDetails} from './hook/ContactDetailsHook';
import useContacts from '../HomeScreen/hook/useContacts'; // Import useContacts
import Loader from '../../components/Loader';
import EditModal from './components/EditModal';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const {contact} = route.params;
  const navigation = useNavigation();

  const {refreshContacts} = useContacts(); // Get refreshContacts from the hook

  const {contactData, loading, updateContact, deleteContact} =
    useContactDetails(contact.recordID, contact);
  const [isModalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSaveContact = async (updatedContact: {
    name: string;
    phone: string;
    email: string;
  }) => {
    await updateContact(updatedContact);
    await refreshContacts(); // Refresh contacts after updating
    closeModal();
  };

  const handleDeleteContact = async () => {
    await deleteContact();
    await refreshContacts(); // Refresh contacts after deletion
    navigation.goBack(); // Go back after deletion
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Name: {contactData.name}</Text>
      <Text style={styles.phone}>Phone: {contactData.phone}</Text>
      <Text style={styles.email}>
        Email: {contactData.email ?? 'Not assigned'}
      </Text>
      <Text style={styles.role}>Role: {contactData.role}</Text>
      <Text style={styles.location}>
        Location:{' '}
        {contactData.location
          ? JSON.stringify(contactData.location)
          : 'Not provided'}
      </Text>
      {contactData.photo && (
        <Image source={{uri: contactData.photo}} style={styles.photo} />
      )}

      <Button title="Edit Contact" onPress={() => setModalVisible(true)} />
      <Button
        title="Delete Contact"
        onPress={handleDeleteContact}
        color="red"
      />
      <EditModal
        visible={isModalVisible}
        onClose={closeModal}
        onSave={handleSaveContact}
        contactName={contactData.name || ''}
        contactPhone={contactData.phone || ''}
        contactEmail={contactData.email || ''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  phone: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  role: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  location: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  photo: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default DetailsScreen;
