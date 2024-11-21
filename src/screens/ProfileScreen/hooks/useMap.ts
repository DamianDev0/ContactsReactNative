import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWeatherData } from '../../../services/weatherService';
import { WeatherResponse } from '../../../types/weather.types';

interface Location {
  latitude: number;
  longitude: number;
}

const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
  const watchId = useRef<number | null>(null);

  const fetchWeather = useCallback(async (latitude: number, longitude: number) => {
    setWeatherLoading(true);
    try {
      const data = await getWeatherData(latitude, longitude);
      setWeather(data);
      setWeatherError(null);
    } catch (error) {
      setWeatherError('Error fetching weather data');
      console.error('Error fetching weather data:', error);
    } finally {
      setWeatherLoading(false);
    }
  }, []);

  const updateLocation = useCallback(async (location: Location) => {
    console.log('Updating location:', location); // Debug
    setCurrentLocation(location);

    try {
      await AsyncStorage.setItem('currentLocation', JSON.stringify(location));
    } catch (error) {
      console.error('Error saving location to AsyncStorage:', error);
    }

    await fetchWeather(location.latitude, location.longitude);
  }, [fetchWeather]);

  const requestLocationPermission = useCallback(async () => {
    try {
      const permissionType =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

      const status = await check(permissionType);
      if (status === RESULTS.GRANTED) {
        startWatchingLocation();
      } else {
        const granted = await request(permissionType);
        if (granted === RESULTS.GRANTED) {
          startWatchingLocation();
        } else {
          Alert.alert(
            'Permission Denied',
            'Location permission is required to track your current location.',
          );
          setLoading(false);
        }
      }
    } catch (err) {
      console.warn(err);
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startWatchingLocation = useCallback(() => {
    watchId.current = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        updateLocation({ latitude, longitude });
      },
      error => {
        Alert.alert(
          'Error',
          `Failed to track your location: ${error.message}. Make sure your location is enabled.`,
        );
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
      },
    );
    setLoading(false);
  }, [updateLocation]);

  useEffect(() => {
    const loadStoredLocation = async () => {
      try {
        const storedLocation = await AsyncStorage.getItem('currentLocation');
        if (storedLocation) {
          const location = JSON.parse(storedLocation);
          setCurrentLocation(location);
          fetchWeather(location.latitude, location.longitude);
        } else {
          requestLocationPermission();
        }
      } catch (error) {
        console.error('Error fetching location from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredLocation();

    return () => {
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
      }
    };
  }, [fetchWeather, requestLocationPermission]);

  return { currentLocation, loading, weather, weatherLoading, weatherError };
};

export default useCurrentLocation;
