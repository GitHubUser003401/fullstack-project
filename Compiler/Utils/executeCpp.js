import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const outputPath = path.join(__dirname, "outputs");

if(!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filePath, inputFilePath, timeout) => {
    const jobId = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);

    const inputRedirect = inputFilePath ? `< "${inputFilePath}"` : "";
    return new Promise((resolve, reject) => {
        const startTime = process.hrtime.bigint(); 
        exec(`g++ "${filePath}" -o "${outPath}" && cd "${outputPath}" && "${outPath}"${inputRedirect}`,
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

export default executeCpp;