
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {WeatherResponse} from '../types/weather.types';

interface WeatherImageProps {
  weather: WeatherResponse | null;
}

const WeatherImage: React.FC<WeatherImageProps> = ({weather}) => {
  const getWeatherImage = () => {
    if (!weather) {return null;}

    const condition = weather.weather[0].main;

    switch (condition) {
      case 'Clear':
        return require('../assets/img/sun.png');
      case 'Clouds':
        return require('../assets/img/wind.png');
      case 'Rain':
        return require('../assets/img/rain.png');
      case 'Thunderstorm':
        return require('../assets/img/tru.png');
      case 'Snow':
        return require('../assets/img/snow.png');
      default:
        return require('../assets/img/sun.png');
    }
  };

  const weatherImage = getWeatherImage();

  return (
    <>
      {weatherImage && (
        <Image source={weatherImage} style={styles.weatherImage} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  weatherImage: {
    width: 150,
    height: 100,
    marginBottom: 20,
  },
});

export default WeatherImage;
