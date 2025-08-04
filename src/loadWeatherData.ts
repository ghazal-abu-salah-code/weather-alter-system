

import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

export type WeatherRecord = {
  record_time: string;
  air_pres: number;
  air_temp: number;
  water_temp: number;
  wind_dir: number;
  wind_speed: number;
};


 
export function loadWeatherData(filePath: string): Promise<WeatherRecord[]> {
    return new Promise((resolve) => {
        const data: WeatherRecord[] = [];

        const absolutePath = path.resolve(__dirname, filePath); // ← يحول المسار إلى مطلق

        fs.createReadStream(absolutePath)
            .pipe(csv())
            .on('data', (row) => {
                data.push({
                    record_time: row.record_time,
                    air_pres: Number(row.air_pres),
                    air_temp: Number(row.air_temp),
                    water_temp: Number(row.water_temp),
                    wind_dir: Number(row.wind_dir),
                    wind_speed: Number(row.wind_speed),
                });
            })
            .on('end', () => resolve(data));
    });
}