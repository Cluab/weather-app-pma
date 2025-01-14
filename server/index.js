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
const readRoute = require('./routes/api/read');
const updateRoute = require('./routes/api/update');
const deleteRoute = require('./routes/api/delete');
const weatherCreateRoute = require('./routes/api/weatherCreate');
// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Back-end is running!');
});
app.use('/api/read', readRoute);
app.use('/api/update', validateWeatherData, validateCoordinates, updateRoute);
app.use('/api/delete', deleteRoute);
app.use(
  '/api/weather/create',
  validateWeatherData,
  validateCoordinates,
  weatherCreateRoute
);
const path = require('path');

// Serve front-end files
app.use(express.static(path.join(__dirname, '../client/dist')));

// Fallback for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
// Error Handler Middleware
app.use(errorHandler);

// Connect to MongoDB and Start Server
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
