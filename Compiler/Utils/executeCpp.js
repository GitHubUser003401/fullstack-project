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

const executeCpp = async (filePath, inputFilePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);

    const inputRedirect = inputFilePath ? `< "${inputFilePath}"` : "";
    return new Promise((resolve, reject) => {
        exec(`g++ "${filePath}" -o "${outPath}" && cd "${outputPath}" && "${outPath}"${inputRedirect}`, (error, stdout, stderr) => {
            if (error) {
                reject({error, stderr});
                return;
            }
            if (stderr) {
                reject({stderr});
                return;
            }
            resolve(stdout);
        });
    });
};

export default executeCpp;