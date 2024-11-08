import React from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import GenericButton from '../../../components/GenericButton';

interface DeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  contactName: string | undefined;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  onClose,
  onConfirm,
  contactName,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image
            source={require('../../../assets/img/delete.png')}
            style={styles.modalImage}
          />
          <Text style={styles.modalText}>
            Are you sure you want to delete {contactName}?
          </Text>
          <View style={styles.modalButtons}>
            <GenericButton
              title="Cancel"
              onPress={onClose}
              backgroundColor="#000"
              width={120}
              height={45}
            />
            <GenericButton
              title="Delete"
              onPress={onConfirm}
              backgroundColor="#000"
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
  },
  modalContent: {
    width: 350,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  modalImage: {
    width: 450,
    height: 350,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 17,
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});

export default DeleteModal;
