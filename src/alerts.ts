import { WeatherRecord } from './loadWeatherData';

export function getAlerts(current: WeatherRecord, previous?: WeatherRecord): string[] {
  const alerts: string[] = [];

<<<<<<< HEAD
  if (record.air_temp !== null && record.air_temp > 45) {
    alerts.push('High air temperature alert');
  }
  if (record.wind_speed !== null && record.wind_speed > 20) {
    alerts.push('High wind speed alert');
  }
  if (record.water_temp !== null && record.water_temp > 30) {
    alerts.push('High water temperature alert');
=======
  // Wind Alerts
  if (current.wind_speed > 120 && current.air_pres < 970) {
    alerts.push("Hurricane Alert");
  } else if (current.wind_speed > 80) {
    alerts.push("High Wind Alert");
  } else if (current.wind_speed >= 40) {
    alerts.push("Strong Wind Advisory");
  } else if (current.wind_speed < 2) {
    alerts.push("Calm Wind Alert");
  }

  // Air Temperature Alerts
  if (current.air_temp < -10) {
    alerts.push("Extreme Cold");
  } else if (current.air_temp > 40) {
    alerts.push("Heatwave");
  }

  // Rapid Temperature Drop (within 1 hour)
  if (previous) {
    const tempDrop = previous.air_temp - current.air_temp;
    const timeDiff = Math.abs(new Date(current.record_time).getTime() - new Date(previous.record_time).getTime());
    if (tempDrop > 10 && timeDiff <= 60 * 60 * 1000) {
      alerts.push("Rapid Temperature Drop");
    }
  }

  // Water Temperature Alerts
  if (current.water_temp < 5) {
    alerts.push("Cold Water");
  } else if (current.water_temp > 30) {
    alerts.push("Hot Water");
  }

  // Air Pressure Alerts
  if (current.air_pres < 980) {
    alerts.push("Low Pressure");
  } else if (current.air_pres > 1030) {
    alerts.push("High Pressure");
  }

  // Rapid Pressure Drop (within 3 hours)
  if (previous) {
    const presDrop = previous.air_pres - current.air_pres;
    const timeDiff = Math.abs(new Date(current.record_time).getTime() - new Date(previous.record_time).getTime());
    if (presDrop > 10 && timeDiff <= 3 * 60 * 60 * 1000) {
      alerts.push("Rapid Pressure Drop");
    }
  }

  // Wind Direction Shift (over 90° within 1 hour)
  if (previous) {
    const dirChange = Math.abs(current.wind_dir - previous.wind_dir);
    const timeDiff = Math.abs(new Date(current.record_time).getTime() - new Date(previous.record_time).getTime());
    if (dirChange > 90 && timeDiff <= 60 * 60 * 1000) {
      alerts.push("Sudden Wind Direction Shift");
    }
>>>>>>> weather-alerts-sys
  }

  return alerts;
}
