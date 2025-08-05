import { WeatherRecord } from './loadWeatherData';

export function getAlerts(record: WeatherRecord): string[] {
  const alerts: string[] = [];

  if (record.air_temp !== null && record.air_temp > 45) {
    alerts.push('High air temperature alert');
  }
  if (record.wind_speed !== null && record.wind_speed > 20) {
    alerts.push('High wind speed alert');
  }
  if (record.water_temp !== null && record.water_temp > 30) {
    alerts.push('High water temperature alert');
  }

  return alerts;
}
