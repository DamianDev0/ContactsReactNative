import React, { useState } from 'react';
import { Modal, View, Text, Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import GenericButton from '../../../components/GenericButton';

interface MapModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (latitude: number, longitude: number) => void;
}

const MapModal: React.FC<MapModalProps> = ({ visible, onClose, onSave }) => {
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleSaveLocation = () => {
    if (selectedLocation) {
      onSave(selectedLocation.latitude, selectedLocation.longitude);
    } else {
      Alert.alert('Please select a location on the map');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <MapView style={styles.map} onPress={handleMapPress}>
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title="Selected Location"
              pinColor="black"
            />
          )}
        </MapView>

        {selectedLocation && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Selected Location:</Text>
            <Text style={styles.cardText}>
              Latitude: {selectedLocation.latitude}
            </Text>
            <Text style={styles.cardText}>
              Longitude: {selectedLocation.longitude}
            </Text>

            <View style={styles.buttonContainer}>
              <GenericButton
                title="Save Location"
                onPress={handleSaveLocation}
                width={150}
                color="#000"
                backgroundColor="#FFF"
              />
              <GenericButton
                title="Close"
                onPress={onClose}
                width={150}
                color="#000"
                backgroundColor="#FFF"
              />
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  map: {
    flex: 1,
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  card: {
    position: 'absolute',
    bottom: 20,
    left: '5%',
    right: '5%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    zIndex: 1,
    height: 230,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'semibold',
    marginBottom: 10,
    color: '#FFF',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#808b96',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginHorizontal: -10,
  },
});

export default MapModal;
