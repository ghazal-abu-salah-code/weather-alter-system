import fs from 'fs';
import csvParser from 'csv-parser';
import { WeatherRecordModel, connectToMongoDB } from './mongo';

// دالة لتحميل بيانات CSV وتخزينها في MongoDB
async function loadCsvAndStoreToDB(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const records: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => {
        // تحويل الحقول المناسبة لأنواعها الرقمية
        records.push({
          record_time: data.record_time,
          air_pres: parseFloat(data.air_pres),
          air_temp: parseFloat(data.air_temp),
          water_temp: parseFloat(data.water_temp),
          wind_dir: parseFloat(data.wind_dir),
          wind_speed: parseFloat(data.wind_speed),
        });
      })
      .on('end', async () => {
        try {
          // مسح البيانات القديمة (اختياري)
          await WeatherRecordModel.deleteMany({});

          // حفظ البيانات الجديدة في MongoDB
          await WeatherRecordModel.insertMany(records);
          console.log(`Finished reading CSV and storing ${records.length} records in DB.`);
          resolve();
        } catch (err) {
          reject(err);
        }
      })
      .on('error', (err) => reject(err));
  });
}

// دالة لقراءة البيانات من DB وحساب التنبيهات
async function calculateAlerts() {
  // قراءة جميع السجلات من DB
  const records = await WeatherRecordModel.find({}).exec();

  // مثال بسيط لحساب تنبيه: اذا درجة حرارة الهواء أعلى من 30 اطبع تنبيه
  records.forEach(record => {
    if (record.air_temp && record.air_temp > 30) {
      console.log(`Alert! High air temperature at ${record.record_time}: ${record.air_temp}°C`);
    }
  });

  console.log('Finished calculating alerts.');
}

(async () => {
  try {
    await connectToMongoDB();

    await loadCsvAndStoreToDB('./src/data/weather-data.csv');

    await calculateAlerts();

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();
