const mongoose = require('mongoose');

// Define schema
const weatherSchema = new mongoose.Schema({
  location: { type: String, required: true }, // City or location name
  lat: { type: Number, required: true }, // Latitude
  lon: { type: Number, required: true }, // Longitude
  temperature: { type: Number, required: true }, // Temperature in Kelvin
  condition: { type: String, required: true }, // Weather condition (e.g., Clouds, Rain)
  createdAt: { type: Date, default: Date.now }, // Timestamp for record creation
});

// Create and export model
const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
