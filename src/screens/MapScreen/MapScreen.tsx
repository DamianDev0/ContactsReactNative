import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import useMapLogic from './hook/MapHook';
import TransportModePicker from './components/TransportPicker';
import Loader from '../../components/Loader';

const MapScreen: React.FC = () => {
  const {
    origin,
    loading,
    destination,
    currentCoordinates,
    distanceInfo,
    transportMode,
    setTransportMode,
    handleMapPress,
    handleMarkerDragEnd,
  } = useMapLogic();

  const getPolylineCoordinates = () => {
    if (origin && destination) {
      return [origin, destination];
    }
    return [];
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: origin?.latitude || 37.78825,
              longitude: origin?.longitude || -122.4324,
              latitudeDelta: 0.09,
              longitudeDelta: 0.04,
            }}
            onPress={handleMapPress}>
            {origin && (
              <Marker
                draggable
                coordinate={origin}
                onDragEnd={handleMarkerDragEnd}
                title="Your Current Location"
                description="This is your current location"
              />
            )}
            {destination && (
              <Marker
                coordinate={destination}
                title="Destination"
                description="This is your selected destination"
              />
            )}
            <Polyline
              coordinates={getPolylineCoordinates()}
              strokeColor="#000"
              strokeWidth={5}
              lineDashPattern={[10, 5]}
            />
          </MapView>
          <TransportModePicker
            transportMode={transportMode}
            setTransportMode={setTransportMode}
          />
          {currentCoordinates && (
            <View style={styles.coordinatesContainer}>
              <Text style={styles.coordinatesText}>
                Current Coordinates: {currentCoordinates.latitude.toFixed(6)},{' '}
                {currentCoordinates.longitude.toFixed(6)}
              </Text>
            </View>
          )}
          {distanceInfo && (
            <View style={styles.distanceContainer}>
              <Text style={styles.distanceText}>
                Distance: {(distanceInfo.distance / 1000).toFixed(2)} km, Time:{' '}
                {Math.floor(distanceInfo.duration / 60)} min
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  coordinatesContainer: {
    position: 'absolute',
    bottom: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  coordinatesText: {
    fontSize: 16,
    color: '#333',
  },
  distanceContainer: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  distanceText: {
    fontSize: 16,
    color: '#333',
  },
});

export default MapScreen;
