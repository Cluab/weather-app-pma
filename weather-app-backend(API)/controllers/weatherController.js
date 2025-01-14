const Weather = require('../models/WeatherSchema');

const createWeatherRecord = async (req, res) => {
  const { lat, lon } = req.body;

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: 'Latitude and Longitude are required' });
  }

  try {
    // Fetch current weather from OpenWeather API
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const weatherResponse = await fetch(weatherUrl); // Using Node.js 20 native fetch
    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data from OpenWeather API');
    }

    const weatherData = await weatherResponse.json();

    // Extract relevant data
    const newRecord = {
      location: weatherData.name || 'Unknown Location',
      lat,
      lon,
      temperature: weatherData.main.temp,
      condition: weatherData.weather[0].description,
    };

    // Save the record to the database
    const weather = new Weather(newRecord);
    await weather.save();

    res.status(201).json(weather); // Respond with the created record
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createWeatherRecord };
