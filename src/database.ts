import { WeatherModel, Alert } from './models';
import { WeatherRecord } from './loadWeatherData';



export async function storeWeatherRecords(records: WeatherRecord[]) {
  await WeatherModel.insertMany(records);
}

export async function readWeatherRecords(): Promise<WeatherRecord[]> {
  const records = await WeatherModel.find().sort({ record_time: 1 });
  return records.map(r => ({
    record_time: r.record_time?.toISOString() ?? '',
    air_pres: r.air_pres ?? 0,
    air_temp: r.air_temp ?? 0,
    water_temp: r.water_temp ?? 0,
    wind_dir: r.wind_dir ?? 0,
    wind_speed: r.wind_speed ?? 0,
  }));
}


export async function saveAlert(alertData: {
  location: string;
  type: string;
  value: number;
  timestamp: Date;
}) {
  const alert = new Alert(alertData);
  await alert.save();
}
