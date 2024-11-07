import React, {useState} from 'react';
import {View, Modal, Text, StyleSheet, TextInput} from 'react-native';
import MapView, {Marker, MapPressEvent} from 'react-native-maps';
import GenericButton from '../../../components/GenericButton';
import {EditModalProps} from '../../../interfaces/EditModal.interface';
import Icon from 'react-native-vector-icons/FontAwesome';

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

          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: latitude || 6.242165,
                longitude: longitude || -75.572195,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={handleMapPress}>
              <Marker coordinate={{latitude, longitude}} />
            </MapView>
          </View>

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
    width: 360,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
    marginBottom: 15,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  mapContainer: {
    width: '100%',
    height: 260,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    borderColor: '#000',
    borderWidth: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});

export default EditModal;
