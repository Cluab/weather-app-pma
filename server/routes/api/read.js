const express = require('express');
const router = express.Router();
const Weather = require('../../models/WeatherSchema');

router.get('/', async (req, res) => {
  try {
    const weatherRecords = await Weather.find();
    res.status(200).json(weatherRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
