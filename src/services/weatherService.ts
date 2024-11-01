// weatherService.ts
import axios from 'axios';
import { WeatherResponse } from '../types/weather.types'; // Asegúrate de importar el tipo

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_API_KEY = '3db4e972a55bd021a3e83d07ba8da9e1'; // Reemplaza con tu API Key

export const getWeatherData = async (lat: number, lon: number): Promise<WeatherResponse> => {
  try {
    const response = await axios.get<WeatherResponse>(BASE_URL, {
      params: {
        lat: lat,
        lon: lon,
        appid: WEATHER_API_KEY,
        units: 'metric',
        lang: 'es',
      },
    });

    return response.data; // Retorna los datos del clima
  } catch (error) {
    console.error('Error al obtener los datos del clima:', error);
    throw error; // Lanzar el error para manejarlo en el componente
  }
};
