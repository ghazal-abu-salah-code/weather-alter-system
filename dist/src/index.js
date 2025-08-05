"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongo_1 = require("./mongo");
const alerts_1 = require("./alerts");
async function main() {
    try {
        await mongoose_1.default.connect('mongodb://localhost:27017/weatherDB');
        // حمل بيانات من CSV (مرة وحدة فقط)
        // await loadCSVToDB('src/data/weather-data.csv');
        // اقرأ البيانات من قاعدة البيانات
        const records = await mongo_1.WeatherRecordModel.find().lean();
        for (const record of records) {
            const normalizedRecord = {
                ...record,
                record_time: typeof record.record_time === 'string' ? record.record_time : '',
            };
            const alerts = (0, alerts_1.getAlerts)(normalizedRecord);
            console.log('Record:', normalizedRecord);
            console.log('Alerts:', alerts);
        }
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error:', error);
    }
}
main();
