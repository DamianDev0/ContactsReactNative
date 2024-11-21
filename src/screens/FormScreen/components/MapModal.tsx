import React, {useState, useEffect} from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import GenericButton from '../../../components/GenericButton';
import {getWeatherData} from '../../../services/weatherService';
import WeatherImage from '../../../components/WeatherImage';
import Toast from 'react-native-toast-message';

interface MapModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (latitude: number, longitude: number) => void;
}

const MapModal: React.FC<MapModalProps> = ({visible, onClose, onSave}) => {
  const initialCoordinates = {latitude: 6.2442, longitude: -75.5812};

  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [weather, setWeather] = useState<any>(null);

  const handleMapPress = (event: any) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setSelectedLocation({latitude, longitude});
  };

  const handleSaveLocation = () => {
    if (selectedLocation) {
      onSave(selectedLocation.latitude, selectedLocation.longitude);
      Toast.show({
        type: 'success',
        text1: 'Location Saved!',
        text2: 'The selected location has been saved successfully.',
        position: 'bottom',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Location Not Selected',
        text2: 'Please select a location on the map before saving.',
        position: 'top',
      });
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      if (selectedLocation) {
        try {
          const weatherData = await getWeatherData(
            selectedLocation.latitude,
            selectedLocation.longitude,
          );
          setWeather(weatherData);
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Weather Fetch Error',
            text2: 'There was an error fetching the weather data.',
          });
        }
      }
    };

    fetchWeather();
  }, [selectedLocation]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <MapView
          style={styles.map}
          onPress={handleMapPress}
          initialRegion={{
            latitude: initialCoordinates.latitude,
            longitude: initialCoordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
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

            {weather && (
              <>
                <Text style={styles.cardText}>
                  Weather: {weather.weather[0].description}
                </Text>
                <View style={styles.weatherRow}>
                  <WeatherImage weather={weather} />
                  <Text style={styles.temperatureText}>
                    {weather.main.temp}°C
                  </Text>
                </View>
              </>
            )}

            <View style={styles.buttonContainer}>
              <GenericButton
                title="Save Location"
                onPress={handleSaveLocation}
                width={135}
                color="#000"
                backgroundColor="#FFF"
                height={45}
              />
              <GenericButton
                title="Close"
                onPress={onClose}
                width={135}
                color="#000"
                backgroundColor="#FFF"
                height={45}
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
    shadowOffset: {width: 0, height: 4},
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
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    zIndex: 1,
    minHeight: 220,
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
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  temperatureText: {
    fontSize: 30,
    marginLeft: 10,
    color: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: -10,
  },
});

export default MapModal;
