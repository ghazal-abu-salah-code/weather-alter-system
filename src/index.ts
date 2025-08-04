
import { connectToMongoDB, saveAlert } from './mongo';
import { loadWeatherData } from './loadWeatherData';
import { getAlerts } from './alerts';
import path from 'path';
const MAX_RECORDS = 5;

async function main() {
  try {
    await connectToMongoDB();
    console.log('Connected to MongoDB');
const absolutePath = path.resolve(__dirname, 'data/weather-data.csv');
   
const data = await loadWeatherData(absolutePath); 

    console.log(`Loaded ${data.length} records`);

    const limitedData = data.slice(0, MAX_RECORDS);

    for (let i = 0; i < limitedData.length; i++) {
      const record = limitedData[i];
      console.log(`Record ${i + 1}:`);
      console.log(record);

      const alerts = getAlerts(record);

 if (alerts.length) {
        console.log(`Alerts: ${alerts.join(', ')}`);

        for (const type of alerts) {
          try {
            await saveAlert(record, type);
            console.log(`Alert saved: ${type} at ${record.record_time}`);
          } catch (saveErr) {
            console.error(`Failed to save alert "${type}":, saveErr`);
          }
        }
      } else {
        console.log('No alerts');
      }

      console.log('---');
    }

    console.log('Processing complete');
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to load weather data:', err.message);
    } else {
      console.error('Unknown error:', err);
    }
  }
}

main();