import path from 'path';
import { connectToMongoDB } from './mongo';
import { loadWeatherData } from './loadWeatherData';
import { getAlerts } from './alerts';
import { storeWeatherRecords, readWeatherRecords, saveAlert } from './database';

async function main() {
  try {
    await connectToMongoDB();
    console.log('Connected to MongoDB');

    const csvPath = path.resolve(__dirname, 'data/weather-data.csv');
    const records = await loadWeatherData(csvPath);
    console.log(`Loaded ${records.length} records from CSV`);

    await storeWeatherRecords(records);
    console.log('Stored records in MongoDB');

    const dbRecords = await readWeatherRecords();
    console.log(`Retrieved ${dbRecords.length} records from MongoDB`);

    for (let i = 0; i < dbRecords.length; i++) {
      const current = dbRecords[i];
      const previous = i > 0 ? dbRecords[i - 1] : undefined;

      const alerts = getAlerts(current, previous);
      console.log(`Record ${i + 1} at ${current.record_time}`);
      console.log(current);

      if (alerts.length) {
        console.log(`Alerts: ${alerts.join(', ')}`);
        for (const type of alerts) {
          try {
            await saveAlert(current, type);
            console.log(`Alert saved: ${type}`);
          } catch (err) {
            console.error(` Failed to save alert "${type}":`, err);
          }
        }
      } else {
        console.log('No alerts');
      }

      console.log('---');
    }

    console.log('Processing complete');
  } catch (err) {
    console.error('Error:', err instanceof Error ? err.message : err);
  }
}

main();