const express = require('express');
const router = express.Router();
const Weather = require('../../models/WeatherSchema');

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedWeather = await Weather.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedWeather);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
