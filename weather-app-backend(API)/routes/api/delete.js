const express = require('express');
const router = express.Router();
const Weather = require('../../models/WeatherSchema');

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Weather.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
