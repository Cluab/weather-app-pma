const express = require('express');
const router = express.Router();
const { getWeatherData } = require('../../controllers/weatherController');
const validateRequest = require('../../middlewares/validateCoordinates');

router.get('/', validateRequest, getWeatherData);

module.exports = router;
