const express = require('express');
const router = express.Router();
const Weather = require('../../models/WeatherSchema');

router.post('/', async (req, res) => {
  const { location, lat, lon, temperature, condition } = req.body;

  if (!location || !lat || !lon || !temperature || !condition) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const weather = new Weather({ location, lat, lon, temperature, condition });
    await weather.save();
    res.status(201).json(weather);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
