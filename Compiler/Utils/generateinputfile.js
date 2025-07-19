import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';
import cron from 'node-cron';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const dirInputs = path.join(__dirname, "inputs");

if(!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, { recursive: true });
}
cron.schedule('*/20 * * * *', () => {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    fs.readdir(dirInputs, (err, files) => {
        if (err) return;
        files.forEach(file => {
            const filePath = path.join(dirInputs, file);
            fs.stat(filePath, (err, stats) => {
                if (err) return;
                if (now - stats.mtimeMs > oneHour) {
                    fs.unlink(filePath, (err) => {
                        if (!err) console.log(`Deleted old input file: ${file}`);
                    });
                }
            });
        });
    });
});


const generateInputFile = (input) => {
    const jobId = uuid();
    const InputFileName = `${jobId}.txt`;
    const inputFilePath = path.join(dirInputs, InputFileName);
    fs.writeFileSync(inputFilePath, input);
    return inputFilePath;
}

export default generateInputFile;