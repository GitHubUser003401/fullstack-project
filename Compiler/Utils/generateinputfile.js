import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const dirInputs = path.join(__dirname, "inputs");

if(!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, { recursive: true });
}


const generateInputFile = (input) => {
    const jobId = uuid();
    const InputFileName = `${jobId}.txt`;
    const inputFilePath = path.join(dirInputs, InputFileName);
    fs.writeFileSync(inputFilePath, input);
    return inputFilePath;
}

export default generateInputFile;