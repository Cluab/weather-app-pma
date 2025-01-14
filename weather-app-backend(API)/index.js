require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Import Middleware
const validateWeatherData = require('./middlewares/validateWeather');
const validateCoordinates = require('./middlewares/validateCoordinates');
const errorHandler = require('./middlewares/errorHandler');

// Import Routes
const createRoute = require('./routes/api/create');
const readRoute = require('./routes/api/read');
const updateRoute = require('./routes/api/update');
const deleteRoute = require('./routes/api/delete');
const weatherCreateRoute = require('./routes/api/weatherCreate');
const weatherRoute = require('./routes/api/weather');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Back-end is running!');
});
app.use('/api/weather', weatherRoute);
app.use('/api/create', createRoute);
app.use('/api/read', readRoute);
app.use('/api/update', validateWeatherData, validateCoordinates, updateRoute);
app.use('/api/delete', deleteRoute);
app.use(
  '/api/weather/create',
  validateWeatherData,
  validateCoordinates,
  weatherCreateRoute
);

// Error Handler Middleware (at the end)
app.use(errorHandler);

// Connect to MongoDB and Start Server
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
