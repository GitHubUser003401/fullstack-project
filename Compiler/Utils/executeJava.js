import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import cron from 'node-cron';
import { v4 as uuid } from 'uuid';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}
cron.schedule('*/20 * * * *', () => {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    fs.readdir(dirCodes, (err, folders) => {
        if (err) return;
        folders.forEach(folder => {
            const folderPath = path.join(dirCodes, folder);
            fs.stat(folderPath, (err, stats) => {
                if (err) return;
                if (now - stats.mtimeMs > oneHour) {
                    fs.rmdir(folderPath, { recursive: true }, (err) => {
                        if (!err) console.log(`Deleted old job directory: ${folder}`);
                    });
                }
            });
        })
    });
})

const executeJava = async (code, inputFilePath, timeout) => {
    const jobId = uuid();
    const jobDir = path.join(dirCodes, jobId);
    if (!fs.existsSync(jobDir)) {
        fs.mkdirSync(jobDir, { recursive: true });
    }
    const javaFile = path.join(jobDir, "Main.java");
    fs.writeFileSync(javaFile, code);
    const inputRedirect = inputFilePath ? `< "${inputFilePath}"` : "";
    return new Promise((resolve, reject) => {
        const startTime = process.hrtime.bigint();
        exec(`javac "${javaFile}" && cd "${jobDir}" && java Main ${inputRedirect}`,
             {timeout: timeout},
            (error, stdout, stderr) => {
            const endTime = process.hrtime.bigint();
            const executionTime = Number((endTime - startTime) / BigInt(1e6)); // Convert to milliseconds
            const memoryUsed = process.memoryUsage().heapUsed / 1024;
            if (error) {
                if (error.killed) {
                    reject({error: "Execution timed out",
                            executionTime, memoryUsed: Math.floor(memoryUsed)});
                    return;
                }
                reject({error, stderr, executionTime, memoryUsed: Math.floor(memoryUsed)});
                return;
            }
            if (stderr) {
                reject({stderr,executionTime, memoryUsed: Math.floor(memoryUsed)});
                return;
            }
            resolve({output: stdout,
                executionTime, memoryUsed: Math.floor(memoryUsed)
            });
        });
    });
};

export default executeJava