import axios from 'axios';
import {WeatherResponse} from '../types/weather.types';
import {WEATHER_API_KEY} from '@env';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';


export const getWeatherData = async (
  lat: number,
  lon: number,
): Promise<WeatherResponse> => {
  try {
    const response = await axios.get<WeatherResponse>(BASE_URL, {
      params: {
        lat: lat,
        lon: lon,
        appid: WEATHER_API_KEY,
        units: 'metric',
        lang: 'en',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos del clima:', error);
    throw error;
  }
};
