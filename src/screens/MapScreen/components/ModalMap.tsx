// MapModal.tsx
import React, {useState} from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import GenericButton from '../../../components/GenericButton';

interface LatLng {
  latitude: number;
  longitude: number;
}

interface MapModalProps {
  visible: boolean;
  onSave: (location: LatLng) => void;
  onClose: () => void;
}

const MapModal: React.FC<MapModalProps> = ({visible, onSave, onClose}) => {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);

  const handleMapPress = (event: {nativeEvent: {coordinate: LatLng}}) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    console.log('Selected location:', {latitude, longitude}); // Log para verificar la ubicación seleccionada
    setSelectedLocation({latitude, longitude});
  };

  const handleMarkerDragEnd = (event: {nativeEvent: {coordinate: LatLng}}) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    console.log('Dragged to new location:', {latitude, longitude}); // Log para verificar la ubicación después de arrastrar
    setSelectedLocation({latitude, longitude});
  };
  const handleSave = () => {
    if (selectedLocation) {
      onSave(selectedLocation);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 6.185805,
            longitude: -75.471374,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMapPress}>
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title="Selected Location"
              draggable
              onDragEnd={handleMarkerDragEnd}
            />
          )}
        </MapView>
        <View style={styles.modalButtons}>
          <GenericButton
            title="Close"
            onPress={onClose}
            backgroundColor="#000"
            width={150}
          />
          <GenericButton
            title="Save"
            onPress={handleSave}
            backgroundColor="#000"
            width={150}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '90%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
});

export default MapModal;
