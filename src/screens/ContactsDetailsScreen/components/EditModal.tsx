import React, {useState} from 'react';
import {View, Modal, Text, StyleSheet, TextInput} from 'react-native';
import GenericButton from '../../../components/GenericButton';

interface EditModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (updatedContact: {
    name: string;
    phone: string;
    email: string;
  }) => void;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

const EditModal: React.FC<EditModalProps> = ({
  visible,
  onClose,
  onSave,
  contactName,
  contactPhone,
  contactEmail,
}) => {
  const [name, setName] = useState(contactName);
  const [phone, setPhone] = useState(contactPhone);
  const [email, setEmail] = useState(contactEmail);

  const handleSave = () => {
    onSave({name, phone, email});
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Contact</Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <View style={styles.modalButtons}>
            <GenericButton
              title="Cancel"
              onPress={onClose}
              color="#000"
              width={120}
              height={45}
            />
            <GenericButton
              title="Save"
              onPress={handleSave}
              color="#000"
              width={120}
              height={45}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: '#000',
  },
  modalContent: {
    width: 350,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});

export default EditModal;
