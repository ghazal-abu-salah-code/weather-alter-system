
import * as fs from 'fs';
import * as readline from 'readline';

async function splitCSV() {
    const fileStream = fs.createReadStream('src/data/weather-data.csv');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let headers = '';
    let outputStream: fs.WriteStream | null = null;
    let lineCount = 0;
    let fileIndex = 1;
    const linesPerFile = 1000;

 
 for await (const line of rl) {
    if (lineCount === 0) {
      headers = line;
      outputStream = fs.createWriteStream('weather-part-${fileIndex}.csv');
      outputStream.write(headers + '\n');
      lineCount++;
      continue;
    }

    if ((lineCount - 1) % linesPerFile === 0) {
      if (outputStream) outputStream.end();
      fileIndex++;
      outputStream = fs.createWriteStream('src/data/split-${fileIndex}.csv');
      outputStream.write(headers + '\n');
    }

    outputStream!.write(line + '\n');
    lineCount++;
  }

  if (outputStream) outputStream.end();
  console.log(' File successfully split into ${fileIndex} parts');
}

splitCSV();
