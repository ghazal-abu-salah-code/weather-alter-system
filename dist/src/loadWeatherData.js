"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCSVToDB = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const mongo_1 = require("./mongo");
async function loadCSVToDB(filePath) {
    return new Promise((resolve, reject) => {
        const records = [];
        fs_1.default.createReadStream(filePath)
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => {
            records.push({
                record_time: data.record_time,
                air_pres: data.air_pres ? Number(data.air_pres) : null,
                air_temp: data.air_temp ? Number(data.air_temp) : null,
                water_temp: data.water_temp ? Number(data.water_temp) : null,
                wind_dir: data.wind_dir ? Number(data.wind_dir) : null,
                wind_speed: data.wind_speed ? Number(data.wind_speed) : null,
            });
        })
            .on('end', async () => {
            try {
                await mongo_1.WeatherRecordModel.insertMany(records);
                console.log('CSV data saved to MongoDB successfully.');
                resolve();
            }
            catch (error) {
                reject(error);
            }
        })
            .on('error', (error) => reject(error));
    });
}
exports.loadCSVToDB = loadCSVToDB;
