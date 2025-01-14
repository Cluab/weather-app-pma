const express = require('express');
const router = express.Router();
const { createWeatherRecord } = require('../../controllers/weatherController');

// Define the POST route for creating a weather record
router.post('/', createWeatherRecord);

module.exports = router;
