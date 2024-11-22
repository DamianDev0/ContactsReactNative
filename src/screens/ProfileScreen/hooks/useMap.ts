import { useState, useEffect, useCallback, useRef } from 'react';
import { Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
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
      Toast.show({
        type: 'error',
        text1: 'Weather Error',
        text2: 'Error fetching weather data. Please try again.',
        position: 'bottom',
      });
    } finally {
      setWeatherLoading(false);
    }
  }, []);

  const updateLocation = useCallback(async (location: Location) => {
    setCurrentLocation(location);
    try {
      await AsyncStorage.setItem('currentLocation', JSON.stringify(location));
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Storage Error',
        text2: 'Failed to save location. Please try again.',
        position: 'bottom',
      });
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
          Toast.show({
            type: 'error',
            text1: 'Permission Denied',
            text2: 'Location permission is required to track your current location.',
            position: 'bottom',
          });
          setLoading(false);
        }
      }
    } catch {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Permission Error',
        text2: 'Failed to check location permissions.',
        position: 'bottom',
      });
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
        Toast.show({
          type: 'error',
          text1: 'Location Error',
          text2: `Failed to track location: ${error.message}.`,
          position: 'bottom',
        });
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
      } catch {
        Toast.show({
          type: 'error',
          text1: 'Load Error',
          text2: 'Failed to load stored location.',
          position: 'bottom',
        });
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
