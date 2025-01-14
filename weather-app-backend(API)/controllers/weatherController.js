exports.getWeatherData = async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat && !lon) {
    return res
      .status(400)
      .json({ error: 'Latitude and Longitude are required' });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch weather data');

    const weatherData = await response.json();
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
