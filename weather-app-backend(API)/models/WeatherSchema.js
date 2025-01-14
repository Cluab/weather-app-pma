const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  location: { type: String, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  temperature: { type: Number, required: true },
  condition: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
