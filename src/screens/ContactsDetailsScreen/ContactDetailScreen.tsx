import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigation.types';
import {useContactDetails} from './hook/ContactDetailsHook';
import useContacts from '../HomeScreen/hook/useContacts';
import Loader from '../../components/Loader';
import EditModal from './components/EditModal';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const {contact} = route.params;
  const navigation = useNavigation();

  const {refreshContacts} = useContacts();

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
    latitude: number;
    longitude: number;
  }) => {
    await updateContact(updatedContact);
    await refreshContacts();
    closeModal();
  };

  const handleDeleteContact = async () => {
    await deleteContact();
    await refreshContacts();
    Alert.alert('Delete contact succesfully');
    navigation.goBack();
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Edit Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDeleteContact}>
          <Text style={styles.buttonText}>Delete Contact</Text>
        </TouchableOpacity>
      </View>

      <EditModal
        visible={isModalVisible}
        onClose={closeModal}
        onSave={handleSaveContact}
        contactName={contactData.name || ''}
        contactPhone={contactData.phone || ''}
        contactEmail={contactData.email || ''}
        contactLatitude={contactData.latitude || 0}
        contactLongitude={contactData.longitude || 0}
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
    borderRadius: 50,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DetailsScreen;
