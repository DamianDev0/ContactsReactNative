import React, {useState} from 'react';
import {View, Modal, Text, StyleSheet, TextInput} from 'react-native';
import MapView, {Marker, MapPressEvent} from 'react-native-maps';
import GenericButton from '../../../components/GenericButton';
import { EditModalProps } from '../../../interfaces/EditModal.interface';



const EditModal: React.FC<EditModalProps> = ({
  visible,
  onClose,
  onSave,
  contactName,
  contactPhone,
  contactEmail,
  contactLatitude,
  contactLongitude,
}) => {
  const [name, setName] = useState(contactName);
  const [phone, setPhone] = useState(contactPhone);
  const [email, setEmail] = useState(contactEmail);
  const [latitude, setLatitude] = useState(contactLatitude);
  const [longitude, setLongitude] = useState(contactLongitude);

  const handleSave = () => {
    onSave({name, phone, email, latitude, longitude});
    onClose();
  };

  const handleMapPress = (event: MapPressEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setLatitude(latitude);
    setLongitude(longitude);
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

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: latitude || 37.78825,
              longitude: longitude || -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}>
            <Marker coordinate={{latitude, longitude}} />
          </MapView>

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
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});

export default EditModal;
