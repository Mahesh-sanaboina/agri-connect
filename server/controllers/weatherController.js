// @desc    Get weather data (proxy to OpenWeatherMap)
// @route   GET /api/weather
const getWeather = async (req, res) => {
  try {
    const { city = 'Hyderabad', lat, lon } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;

    // If no API key, return mock data for development
    if (!apiKey || apiKey === 'your_weather_api_key') {
      return res.json({
        success: true,
        data: getMockWeatherData(city)
      });
    }

    let url;
    if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},IN&appid=${apiKey}&units=metric`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== '200') {
      return res.json({ success: true, data: getMockWeatherData(city) });
    }

    // Process weather data
    const current = data.list[0];
    const forecast = [];
    const seenDates = new Set();

    for (const item of data.list) {
      const date = item.dt_txt.split(' ')[0];
      if (!seenDates.has(date) && seenDates.size < 7) {
        seenDates.add(date);
        forecast.push({
          date,
          temp: Math.round(item.main.temp),
          tempMin: Math.round(item.main.temp_min),
          tempMax: Math.round(item.main.temp_max),
          humidity: item.main.humidity,
          weather: item.weather[0].main,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          windSpeed: item.wind.speed,
          rain: item.rain ? item.rain['3h'] || 0 : 0
        });
      }
    }

    // Generate farming recommendations
    const recommendations = generateRecommendations(current);

    res.json({
      success: true,
      data: {
        city: data.city.name,
        current: {
          temp: Math.round(current.main.temp),
          feelsLike: Math.round(current.main.feels_like),
          humidity: current.main.humidity,
          weather: current.weather[0].main,
          description: current.weather[0].description,
          icon: current.weather[0].icon,
          windSpeed: current.wind.speed,
          pressure: current.main.pressure
        },
        forecast,
        recommendations
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

function generateRecommendations(weatherData) {
  const recommendations = [];
  const temp = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  const hasRain = weatherData.weather[0].main.toLowerCase().includes('rain');
  const windSpeed = weatherData.wind.speed;

  if (hasRain) {
    recommendations.push({
      type: 'warning',
      icon: '🌧️',
      text: 'Rain expected. Avoid pesticide spraying today.',
      priority: 'high'
    });
    recommendations.push({
      type: 'tip',
      icon: '💧',
      text: 'Good time for transplanting seedlings.',
      priority: 'medium'
    });
  }

  if (temp > 38) {
    recommendations.push({
      type: 'warning',
      icon: '🌡️',
      text: 'Extreme heat alert! Irrigate crops in early morning or evening.',
      priority: 'high'
    });
  }

  if (humidity > 80) {
    recommendations.push({
      type: 'warning',
      icon: '🍄',
      text: 'High humidity. Watch for fungal diseases in crops.',
      priority: 'high'
    });
  }

  if (windSpeed > 20) {
    recommendations.push({
      type: 'warning',
      icon: '💨',
      text: 'Strong winds expected. Secure crop supports and avoid spraying.',
      priority: 'high'
    });
  }

  if (temp >= 25 && temp <= 35 && !hasRain) {
    recommendations.push({
      type: 'tip',
      icon: '🌱',
      text: 'Ideal weather for field work and fertilizer application.',
      priority: 'medium'
    });
  }

  if (humidity >= 40 && humidity <= 70) {
    recommendations.push({
      type: 'tip',
      icon: '✅',
      text: 'Good humidity levels for most crop growth.',
      priority: 'low'
    });
  }

  return recommendations;
}

function getMockWeatherData(city) {
  return {
    city: city,
    current: {
      temp: 32,
      feelsLike: 36,
      humidity: 65,
      weather: 'Partly Cloudy',
      description: 'scattered clouds',
      icon: '03d',
      windSpeed: 12,
      pressure: 1012
    },
    forecast: [
      { date: new Date().toISOString().split('T')[0], temp: 32, tempMin: 26, tempMax: 35, humidity: 65, weather: 'Clouds', description: 'scattered clouds', icon: '03d', windSpeed: 12, rain: 0 },
      { date: new Date(Date.now() + 86400000).toISOString().split('T')[0], temp: 30, tempMin: 25, tempMax: 33, humidity: 72, weather: 'Rain', description: 'light rain', icon: '10d', windSpeed: 15, rain: 5 },
      { date: new Date(Date.now() + 172800000).toISOString().split('T')[0], temp: 28, tempMin: 24, tempMax: 31, humidity: 80, weather: 'Rain', description: 'moderate rain', icon: '10d', windSpeed: 18, rain: 12 },
      { date: new Date(Date.now() + 259200000).toISOString().split('T')[0], temp: 31, tempMin: 25, tempMax: 34, humidity: 60, weather: 'Clear', description: 'clear sky', icon: '01d', windSpeed: 8, rain: 0 },
      { date: new Date(Date.now() + 345600000).toISOString().split('T')[0], temp: 33, tempMin: 27, tempMax: 36, humidity: 55, weather: 'Clear', description: 'clear sky', icon: '01d', windSpeed: 10, rain: 0 },
      { date: new Date(Date.now() + 432000000).toISOString().split('T')[0], temp: 34, tempMin: 28, tempMax: 37, humidity: 50, weather: 'Clouds', description: 'few clouds', icon: '02d', windSpeed: 11, rain: 0 },
      { date: new Date(Date.now() + 518400000).toISOString().split('T')[0], temp: 31, tempMin: 26, tempMax: 34, humidity: 68, weather: 'Rain', description: 'light rain', icon: '10d', windSpeed: 14, rain: 3 }
    ],
    recommendations: [
      { type: 'tip', icon: '🌱', text: 'Ideal weather for field work and fertilizer application.', priority: 'medium' },
      { type: 'tip', icon: '✅', text: 'Good humidity levels for most crop growth.', priority: 'low' },
      { type: 'warning', icon: '🌧️', text: 'Rain expected tomorrow. Plan pesticide application for today.', priority: 'high' }
    ]
  };
}

module.exports = { getWeather };
