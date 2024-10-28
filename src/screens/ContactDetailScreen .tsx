import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import GenericButton from '../components/GenericButton';
import { useContacts } from '../hooks/asyncStorage';
import DeleteModal from '../components/DetailsScreen/DeleteModal';
import EditModal from '../components//DetailsScreen/EditModal';

const ContactDetailScreen = ({ route, navigation }: any) => {
  const { contact } = route.params;
  const { deleteContactFromStorage, editContactInStorage } = useContacts();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const handleDelete = () => {
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    await deleteContactFromStorage(contact.phone);
    setDeleteModalVisible(false);
    navigation.goBack();
  };

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const saveEdit = async (updatedContact: { name: string; phone: string; email: string }) => {
    await editContactInStorage({ ...contact, ...updatedContact });
    setEditModalVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerImage} />
      {contact.photo && (
        <Image source={{ uri: contact.photo }} style={styles.contactImage}  />
      )}
      <Text style={styles.contactName}>{contact.name}</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.contactDetail}>{contact.phone}</Text>
        <Text style={styles.contactDetail}>{contact.role}</Text>
      </View>
      <Text style={styles.contactEmail}>{contact.email}</Text>

      <View style={styles.emptySpace} />

      <View style={styles.buttonContainer}>
        <GenericButton title="Eliminar" onPress={handleDelete} color="#000"  width={150} />
        <GenericButton title="Editar" onPress={handleEdit} color="#000" width={150} />
      </View>

      <DeleteModal
        visible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={confirmDelete}
        contactName={contact.name}
      />

      <EditModal
        visible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSave={saveEdit}
        contactName={contact.name}
        contactPhone={contact.phone}
        contactEmail={contact.email}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 200,
    alignItems: 'center',
    padding: 20,
  },
  containerImage: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 10,
    backgroundColor: '#FFF',
    zIndex: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  contactImage: {
    width: 140,
    height: 140,
    position: 'relative',
    top: -70,
    borderRadius: 80,
    zIndex: 2,
  },
  contactName: {
    marginTop: -60,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginVertical: 16,
  },
  contactDetail: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 10,
  },
  contactEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  emptySpace: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    marginBottom: 30,
  },
});

export default ContactDetailScreen;
