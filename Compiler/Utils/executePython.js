import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import cron from 'node-cron';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

cron.schedule('*/20 * * * *', () => {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    fs.readdir(outputPath, (err, files) => {
        if (err) return;
        files.forEach(file => {
            const filePath = path.join(outputPath, file);
            fs.stat(filePath, (err, stats) => {
                if (err) return;
                if (now - stats.mtimeMs > oneHour) {
                    fs.unlink(filePath, (err) => {
                        if (!err) console.log(`Deleted old file: ${file}`);
                    });
                }
            });
        });
    });
});
const executePython = async (filePath, timeout) => {
    return new Promise((resolve, reject) => {
        const startTime = process.hrtime.bigint();
        exec(`python3 "${filePath}"`,
            { timeout: timeout },
            (error, stdout, stderr) => {
                const endTime = process.hrtime.bigint();
                const executionTime = Number((endTime - startTime) / BigInt(1e6));
                const memoryUsed = process.memoryUsage().heapUsed / 1024;
                if (error) {
                    if (error.killed) {
                        reject({ error: "Execution timed out", executionTime, memoryUsed: Math.floor(memoryUsed) });
                        return;
                    }
                    reject({ error, stderr, executionTime, memoryUsed: Math.floor(memoryUsed) });
                    return;
                }
                if (stderr) {
                    reject({ stderr, executionTime, memoryUsed: Math.floor(memoryUsed) });
                    return;
                }
                resolve({ output: stdout, executionTime, memoryUsed: Math.floor(memoryUsed) });
            }
        );
    });
};

export default executePython;