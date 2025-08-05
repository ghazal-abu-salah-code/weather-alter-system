import fs from 'fs';
import csvParser from 'csv-parser';
import mongoose from 'mongoose';

export interface WeatherRecord {
  record_time: string;
  air_pres: number | null;
  air_temp: number | null;
  water_temp: number | null;
  wind_dir: number | null;
  wind_speed: number | null;
}

const weatherRecordSchema = new mongoose.Schema<WeatherRecord>({
  record_time: String,
  air_pres: Number,
  air_temp: Number,
  water_temp: Number,
  wind_dir: Number,
  wind_speed: Number,
});

const WeatherRecordModel = mongoose.model<WeatherRecord>('WeatherRecord', weatherRecordSchema);

// تحميل CSV وحفظه في قاعدة البيانات
export async function loadWeatherData(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const records: WeatherRecord[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => {
        records.push({
          record_time: data.record_time,
          air_pres: data.air_pres ? Number(data.air_pres) : null,
          air_temp: data.air_temp ? Number(data.air_temp) : null,
          water_temp: data.water_temp ? Number(data.water_temp) : null,
          wind_dir: data.wind_dir ? Number(data.wind_dir) : null,
          wind_speed: data.wind_speed ? Number(data.wind_speed) : null,
        });
      })
      .on('end', async () => {
        try {
          await WeatherRecordModel.insertMany(records);
          console.log('✅ Data inserted into MongoDB');
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
}
