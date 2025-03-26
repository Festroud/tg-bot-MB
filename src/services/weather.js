const axios = require('axios');
const API_KEY = '6c1adb1e2f167c7c8a33c0b029b54ac2';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEO_URL = 'http://api.openweathermap.org/geo/1.0/reverse';

async function getWeather(city) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'ru',
      },
    });
    return formatWeatherData(response.data);
  } catch (error) {
    console.error('Ошибка при запросе погоды:', error);
    return 'Не удалось получить данные о погоде. Проверьте название города.';
  }
}

async function getWeatherByCoords(lat, lon) {
  try {
    const geoResponse = await axios.get(GEO_URL, {
      params: {
        lat,
        lon,
        limit: 1,
        appid: API_KEY
      }
    });
    
    const city = geoResponse.data[0]?.name || "вашем городе";
    
    const weatherResponse = await axios.get(BASE_URL, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'ru',
      },
    });
    
    return formatWeatherData(weatherResponse.data);
  } catch (error) {
    console.error('Ошибка при запросе погоды по координатам:', error);
    return 'Не удалось определить погоду для вашего местоположения.';
  }
}

function formatWeatherData(data) {
  const city = data.name;
  const temperature = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const icon = getWeatherIcon(data.weather[0].icon);

  return `
${icon} ${city}
🌡 Температура: ${temperature}°C (ощущается как ${feelsLike}°C)
🌤 ${capitalizeFirstLetter(description)}
💧 Влажность: ${humidity}%
🌬 Ветер: ${windSpeed} м/с
  `;
}

function getWeatherIcon(iconCode) {
  const icons = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '⛅',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌦️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
  };
  return icons[iconCode] || '🌡️';
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = { 
  getWeather, 
  getWeatherByCoords 
};