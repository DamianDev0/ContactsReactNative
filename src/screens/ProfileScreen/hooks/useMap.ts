import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
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

  const fetchCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { latitude, longitude };
        setCurrentLocation(newLocation);
        setLoading(false);

        // Guardar la nueva ubicación en AsyncStorage
        try {
          await AsyncStorage.setItem('currentLocation', JSON.stringify(newLocation));
        } catch (error) {
          console.error('Error saving location to AsyncStorage:', error);
        }

        fetchWeather(latitude, longitude);  // Obtener el clima después de obtener la ubicación
      },
      (error) => {
        Alert.alert(
          'Error',
          `Failed to retrieve your location: ${error.message}. Make sure your location is enabled.`,
        );
        setLoading(false);
      },
    );
  }, []);

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
            'Location permission is required to display your current location.',
          );
          setLoading(false);
        }
      }
    } catch (err) {
      console.warn(err);
      setLoading(false);
    }
  }, [fetchCurrentLocation]);

  const fetchWeather = async (latitude: number, longitude: number) => {
    setWeatherLoading(true);
    try {
      const data = await getWeatherData(latitude, longitude);
      setWeather(data);
    } catch (error) {
      setWeatherError('Error fetching weather data');
      console.error('Error fetching weather data:', error);
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    // Intenta obtener la ubicación guardada desde AsyncStorage
    const getStoredLocation = async () => {
      try {
        const storedLocation = await AsyncStorage.getItem('currentLocation');
        if (storedLocation) {
          setCurrentLocation(JSON.parse(storedLocation));
        } else {
          requestLocationPermission();
        }
      } catch (error) {
        console.error('Error loading location from AsyncStorage:', error);
        requestLocationPermission();
      }
    };

    getStoredLocation();
  }, [requestLocationPermission]);

  return { currentLocation, loading, weather, weatherLoading, weatherError };
};

export default useCurrentLocation;
