import {useEffect, useState, useCallback} from 'react';
import {Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DistanceInfo, Location} from '../../../interfaces/Map.interface';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const useMapLogic = () => {
  const [origin, setOrigin] = useState<Location | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [destination, setDestination] = useState<Location | null>(null);
  const [currentCoordinates, setCurrentCoordinates] = useState<Location | null>(
    null,
  );
  const [distanceInfo, setDistanceInfo] = useState<DistanceInfo | null>(null);
  const [transportMode, setTransportMode] = useState<string>('driving');

  const defaultLocation: Location = {latitude: 6.185805, longitude: -75.471374};

  const requestLocationPermission = useCallback(async () => {
    try {
      const permissionType = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      const status = await check(permissionType);
      if (status === RESULTS.GRANTED) {
        fetchCurrentLocation();
      } else {
        const granted = await request(permissionType);
        if (granted === RESULTS.GRANTED) {
          fetchCurrentLocation();
        } else {
          Alert.alert(
            'Permission Denied',
            'Location permission is required to display your current location on the map.',
          );
          setOrigin(defaultLocation);
          setLoading(false);
        }
      }
    } catch (err) {
      console.warn(err);
      setOrigin(defaultLocation);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultLocation]);

  const fetchCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        const currentLocation: Location = {latitude, longitude};
        setOrigin(currentLocation);
        await saveLocationToStorage(currentLocation);
        setLoading(false);
      },
      error => {
        Alert.alert(
          'Error',
          `Failed to retrieve your location: ${error.message}. Make sure your location is enabled.`,
        );
        setOrigin(defaultLocation);
        setLoading(false);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultLocation]);

  const saveLocationToStorage = useCallback(async (location: Location) => {
    try {
      await AsyncStorage.setItem('currentLocation', JSON.stringify(location));
    } catch (error) {
      console.error('Error saving location to AsyncStorage:', error);
    }
  }, []);

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  const calculateDistance = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    async (origin: Location | null, destination: Location | null) => {
      if (origin && destination) {
        const apiKey = 'AIzaSyCYmcrLkQHOq4H45vvpWNgdSkwU06QWtC4';
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.latitude},
        ${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&mode=${transportMode}&key=${apiKey}`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.rows[0].elements[0].status === 'OK') {
            const distance = data.rows[0].elements[0].distance.value;
            const duration = data.rows[0].elements[0].duration.value;
            setDistanceInfo({distance, duration});
          } else {
            Alert.alert(
              'Error',
              'Unable to calculate distance. Please try again.',
            );
          }
        } catch (error) {
          console.error('Error fetching distance data:', error);
          Alert.alert(
            'Error',
            'There was a problem retrieving the distance. Please try again.',
          );
        }
      }
    },
    [transportMode],
  );

  const handleMapPress = useCallback((event: any) => {
    const {coordinate} = event.nativeEvent;
    setDestination(coordinate);
  }, []);

  const handleMarkerDragEnd = useCallback((e: any) => {
    const newCoordinate = e.nativeEvent.coordinate;
    setOrigin(newCoordinate);
    setCurrentCoordinates(newCoordinate);
  }, []);

  useEffect(() => {
    if (destination) {
      const debounceTimeout = setTimeout(() => {
        calculateDistance(origin, destination);
      }, 500);
      return () => clearTimeout(debounceTimeout);
    }
  }, [destination, origin, calculateDistance]);

  return {
    origin,
    loading,
    destination,
    currentCoordinates,
    distanceInfo,
    transportMode,
    setTransportMode,
    handleMapPress,
    handleMarkerDragEnd,
  };
};

export default useMapLogic;
