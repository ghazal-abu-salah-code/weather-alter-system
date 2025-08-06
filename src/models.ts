import mongoose from 'mongoose';

// Schema 
const weatherSchema = new mongoose.Schema({
  record_time: Date,
  air_pres: Number,
  air_temp: Number,
  water_temp: Number,
  wind_dir: Number,
  wind_speed: Number,
});

export const WeatherModel = mongoose.model('WeatherRecord', weatherSchema);

const alertSchema = new mongoose.Schema({
  location: String,
  type: String,
  value: Number,
  timestamp: Date,
});

export const Alert = mongoose.model('Alert', alertSchema);