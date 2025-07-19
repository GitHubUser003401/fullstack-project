import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';
import cron from 'node-cron';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirCodes = path.join(__dirname, "codes");

if(!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}
cron.schedule('*/20 * * * *', () => {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    fs.readdir(dirCodes, (err, files) => {
        if (err) return;
        files.forEach(file => {
            const filePath = path.join(dirCodes, file);
            fs.stat(filePath, (err, stats) => {
                if (err) return;
                if (now - stats.mtimeMs > oneHour) {
                    fs.unlink(filePath, (err) => {
                        if (!err) console.log(`Deleted old code file: ${file}`);
                    });
                }
            });
        });
    });
});


const generateFile = (language, code) => {
    const jobId = uuid();
    const fileName = `${jobId}.${language}`;
    const filePath = path.join(dirCodes, fileName);
    fs.writeFileSync(filePath, code);
    return filePath;
}

export default generateFile;