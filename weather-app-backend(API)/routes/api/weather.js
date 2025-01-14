const express = require('express');
const router = express.Router();
const { getWeatherData } = require('../../controllers/weatherController');
const validateRequest = require('../../middlewares/validateRequest');

router.get('/', validateRequest, getWeatherData);

module.exports = router;
