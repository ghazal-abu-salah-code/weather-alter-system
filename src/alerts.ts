import { WeatherRecord } from './loadWeatherData';

export function getAlerts(record: WeatherRecord): string[] {
  const alerts: string[] = [];

  if (record.wind_speed > 120 && record.air_pres < 970) alerts.push(" Hurricane Alert");
  else if (record.wind_speed > 80) alerts.push(" High Wind Alert");
  else if (record.wind_speed >= 40) alerts.push(" Strong Wind Advisory");
  else if (record.wind_speed < 2) alerts.push(" Calm Wind Alert");

  if (record.air_temp < -10) alerts.push(" Extreme Cold");
  else if (record.air_temp > 40) alerts.push(" Heatwave");

  if (record.water_temp < 5) alerts.push(" Cold Water");
  else if (record.water_temp > 30) alerts.push(" Hot Water");

  if (record.air_pres < 980) alerts.push(" Low Pressure");
  else if (record.air_pres > 1030) alerts.push("High Pressure");

  return alerts;
}