import mongoose from 'mongoose';

const WeatherRecordSchema = new mongoose.Schema({
  record_time: String,
  air_pres: Number,
  air_temp: Number,
  water_temp: Number,
  wind_dir: Number,
  wind_speed: Number,
});

export const WeatherRecordModel = mongoose.model('WeatherRecord', WeatherRecordSchema);

export async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/weatherdb');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

