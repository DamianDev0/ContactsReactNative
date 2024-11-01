import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import GenericButton from '../../components/GenericButton';
import {useContactDetail} from './hook/ContactDetailsHook';
import DeleteModal from './components/DeleteModal';
import EditModal from './components/EditModal';
import MapView, {Marker} from 'react-native-maps';
import {getWeatherData} from '../../services/weatherService';
import {WeatherResponse} from '../../types/weather.types';
import WeatherImage from './components/WeatherImage';

const ContactDetailScreen = ({route, navigation}: any) => {
  const {contact} = route.params;
  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  const {
    isDeleteModalVisible,
    setDeleteModalVisible,
    isEditModalVisible,
    setEditModalVisible,
    handleDelete,
    confirmDelete,
    handleEdit,
    saveEdit,
  } = useContactDetail(contact, navigation);

  useEffect(() => {
    if (contact.location) {
      const fetchWeather = async () => {
        try {
          const weatherData = await getWeatherData(
            contact.location.latitude,
            contact.location.longitude,
          );
          setWeather(weatherData);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };

      fetchWeather();
    }
  }, [contact.location]);
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.imageContainer} />
      {contact.photo && (
        <Image source={{uri: contact.photo}} style={styles.contactImage} />
      )}
      <Text style={styles.contactName}>{contact.name}</Text>
      <View style={styles.detailsRow}>
        <Text style={styles.contactDetail}>{contact.phone}</Text>
        <Text style={styles.contactDetail}>{contact.role}</Text>
      </View>
      <Text style={styles.contactEmail}>{contact.email}</Text>

      <View style={styles.mapContainer}>
        {contact.location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: contact.location.latitude,
              longitude: contact.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude: contact.location.latitude,
                longitude: contact.location.longitude,
              }}
              title={contact.name}
              description={contact.role}
            />
          </MapView>
        )}
      </View>

      <View style={styles.weatherContainer}>
        <WeatherImage weather={weather} />
        {weather && (
          <Text style={styles.weatherText}>
            Clima: {weather.weather[0].description}, Temp: {weather.main.temp}°C
          </Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <GenericButton
          title="Delete"
          onPress={handleDelete}
          color="#000"
          width={150}
        />
        <GenericButton
          title="Edit"
          onPress={handleEdit}
          color="#000"
          width={150}
        />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  imageContainer: {
    position: 'absolute',
    width: 350,
    height: 290,
    borderRadius: 10,
    backgroundColor: '#FFF',
    zIndex: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    top: -30,
  },
  contactImage: {
    width: 140,
    height: 140,
    position: 'relative',
    top: -90,
    borderRadius: 80,
    zIndex: 2,
  },
  contactName: {
    marginTop: -50,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  detailsRow: {
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
  mapContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    height: 250,
    marginVertical: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  weatherContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 16,
    color: '#333',
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
