import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';
import cron from 'node-cron';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
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

const wrapPythonCode = (code, inputData) => {
    if (!inputData || inputData.trim() === "") {
        return code; // No input provided, return original code
    }

    // Split input by lines and then by spaces to create a flat list
    const inputs = inputData.trim().split('\n').flatMap(line => line.trim().split(/\s+/));

    const wrappedCode = `
import sys
from io import StringIO

# Prepare inputs
_inputs = ${JSON.stringify(inputs)}
_input_index = 0

def input(prompt=""):
    global _input_index
    if _input_index >= len(_inputs):
        raise EOFError("No more input available")
    value = _inputs[_input_index]
    _input_index += 1
    return value

# Original user code starts here
${code}
`;

    return wrappedCode;
};

const generatePythonFile = (language, code, input) => {
    const jobId = uuid();
    const fileName = `${jobId}.${language}`;
    const filePath = path.join(dirCodes, fileName);
    const wrappedCode = wrapPythonCode(code, input);
    fs.writeFileSync(filePath, wrappedCode);
    return filePath;
}

export default generatePythonFile;