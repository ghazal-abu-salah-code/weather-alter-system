
import { loadWeatherData } from './loadWeatherData';

test('should parse CSV and return array of records', async () => {
  const data = await loadWeatherData('src/data/sample.csv');
  expect(data.length).toBeGreaterThan(0);
  expect(data[0]).toHaveProperty('record_time');
});


//
