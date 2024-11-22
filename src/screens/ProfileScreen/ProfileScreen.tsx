import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useProfileLogic from './hooks/useProfile';
import Loader from '../../components/Loader';
import useCurrentLocation from './hooks/useMap';
import WeatherImage from '../../components/WeatherImage';
import EditProfileModal from './components/editProfileModal';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const ProfileScreen: React.FC = () => {
  const { profile, loading: profileLoading, fetchProfile } = useProfileLogic();
  const { currentLocation, loading: locationLoading, weather, weatherLoading, weatherError } = useCurrentLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loading = profileLoading || locationLoading || weatherLoading;

  const defaultAvatar = require('../../assets/img/avatar.png');
  const defaultName = 'Anonymous User';
  const defaultEmail = 'No email available';
  const defaultPhone = 'No phone available';

  const handleSave = () => {
    fetchProfile();
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {profile && (
            <View style={styles.profileContainer}>
              <View style={styles.header}>
                <Image
                  source={profile.photo ? { uri: profile.photo } : defaultAvatar}
                  style={styles.avatar}
                />
                <Text style={styles.name}>{profile.name || defaultName}</Text>
                <Text style={styles.role}>{profile.email || defaultEmail}</Text>
                <Text style={styles.role}>{profile.phone || defaultPhone}</Text>
              </View>
            </View>
          )}

          {currentLocation && weather && !weatherError && (
            <View style={styles.weatherCard}>
              <WeatherImage weather={weather} />
              <View style={styles.weatherInfo}>
                <Text style={styles.weatherText}>{weather.main.temp}°C</Text>
                <Text style={styles.weatherDescription}>
                  {weather.weather[0].description}
                </Text>
              </View>
            </View>
          )}

          {weatherError && <Text style={styles.errorText}>{weatherError}</Text>}

          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: currentLocation?.latitude || 37.78825,
                longitude: currentLocation?.longitude || -122.4324,
                latitudeDelta: 0.09,
                longitudeDelta: 0.04,
              }}
            >
              {currentLocation && (
                <Marker
                  draggable
                  coordinate={currentLocation}
                  title="Your Location"
                  description="This is your current location"
                  pinColor="#000"
                >
                  <Image
                    source={profile.photo ? { uri: profile.photo } : defaultAvatar}
                    style={styles.markerAvatar}
                  />
                </Marker>
              )}
            </MapView>
          </View>

          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => setIsModalVisible(true)}
          >
            <Icon name="edit" size={25} color="#FFF" />
          </TouchableOpacity>
        </>
      )}

      <EditProfileModal
        visible={isModalVisible}
        profile={profile || { name: '', phone: '', photo: null }}
        onSave={handleSave}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    gap: width * 0.01,
  },
  profileContainer: {
    paddingTop: height * 0.1,
    paddingBottom: 20,
    backgroundColor: '#000',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
  },
  header: {
    width: width * 0.9,
    height: height * 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatar: {
    width: width * 0.4,
    height: height * 0.2,
    borderRadius: 100,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFF',
  },
  role: {
    fontSize: 14,
    color: '#808b96',
    fontWeight: '300',
    textTransform: 'capitalize',
    marginTop: 5,
  },
  weatherCard: {
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    height: 130,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    marginTop: 10,
  },
  weatherInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  weatherText: {
    fontSize: 30,
    color: '#FFF',
    marginTop: 10,
  },
  weatherDescription: {
    fontSize: 14,
    color: '#808b96',
    textTransform: 'capitalize',
  },
  mapContainer: {
    width: width * 0.9,
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    alignSelf: 'center',
  },
  map: {
    flex: 1,
  },
  markerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  editIcon: {
    position: 'absolute',
    top: height * 0.05,
    right: width * 0.05,
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
});

export default ProfileScreen;
