import { error } from 'console';
import mongoose from 'mongoose' ;

const alertSchema = new mongoose.Schema({
  location: String,
  type: String,
  value: Number,
  timestamp: Date,
});

const Alert = mongoose.model('Alert', alertSchema);

export async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/weather-alerts', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
}

export async function saveAlert(record: any, alertType: string) {
let parsedDate: Date;

if (typeof record.record_time === 'string') {
  const rawTime = record.record_time.replace(' ', 'T');
  parsedDate = new Date(rawTime);
} else if (record.record_time instanceof Date) {
  parsedDate = record.record_time;
} else {
  console.error('Unrecognized date format:', record.record_time);
  return;
}

if (isNaN(parsedDate.getTime())) {
  console.error('Invalid Date:', record.record_time);
  return;
}
  const alert = new Alert({
    location: record.location || 'Unknown',
    type: alertType,
    value: record[alertType],
    timestamp: parsedDate,
  });
  await alert.save();
}