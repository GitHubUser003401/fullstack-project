import { body, validationResult } from 'express-validator';
import executeCpp from "../Utils/executeCpp.js";
import executeJava from "../Utils/executeJava.js";
import executePython from "../Utils/executePython.js";
import generateFile from "../Utils/generateFile.js";
import generateInputFile from "../Utils/generateinputfile.js";
import generatePythonFile from "../Utils/GeneratepythonFile.js";

export const validateCompileRequest = [
    body('language')
        .isIn(['cpp', 'c', 'java', 'py'])
        .withMessage('Invalid language. Supported: cpp, c, java, py'),
    
    body('code')
        .notEmpty()
        .withMessage('Code is required')
        .isLength({ max: 10000000 })
        .withMessage('Code too large (max 10MB)')
        .custom((value) => {
            // Block dangerous patterns
            const dangerous = [
                /system\s*\(/gi,
                /exec\s*\(/gi,
                /Runtime\.getRuntime/gi,
                /subprocess/gi,
                /<script/gi,
                /javascript:/gi,
                /eval\s*\(/gi,
                /ProcessBuilder/gi,
                /\/bin\/(sh|bash)/gi,
                /cmd\.exe/gi,
                /powershell/gi
            ];
            
            for (const pattern of dangerous) {
                if (pattern.test(value)) {
                    throw new Error('Dangerous code pattern detected');
                }
            }
            return true;
        }),
];

export const compileCode = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errors.array()[0].msg,
            details: errors.array()
        });
    }
    const { language = 'cpp', code, input, timeout = 20000 } = req.body;
    if (code === undefined || code.trim() === "") {
        return res.status(400).json({ success: false, error: "Code is required" });
    }

    if (!['cpp', 'c', 'java', 'py'].includes(language)) {
        return res.status(400).json({ success: false, error: "Unsupported language" });
    }

    if (language === 'cpp' && code.includes("cin") && (!input || input.trim() === "")) {
        return res.status(400).json({ success: false, error: "Input required but not provided." });
    }
    if (language === 'java' && code.includes("Scanner") && (!input || input.trim() === "")) {
        return res.status(400).json({ success: false, error: "Input required but not provided." });
    }
    if (language === 'py' && code.includes("input") && (!input || input.trim() === "")) {
        return res.status(400).json({ success: false, error: "Input required but not provided." });
    }

    try {
        if (language === 'cpp') {
            const filepath = generateFile(language, code);
            const inputFile = generateInputFile(input);
            const output = await executeCpp(filepath, inputFile, timeout);
            return res.json({ output: output.output, executionTime: output.executionTime, memoryUsed: output.memoryUsed });
        } else if (language === 'java') {
            const inputFile = generateInputFile(input);
            const output = await executeJava(code, inputFile, timeout);
            return res.json({ output: output.output, executionTime: output.executionTime, memoryUsed: output.memoryUsed });
        } else if (language === 'py') {
            const filepath = generatePythonFile(language, code, input);
            const output = await executePython(filepath, timeout);
            return res.json({ output: output.output, executionTime: output.executionTime, memoryUsed: output.memoryUsed });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.stderr || error.error || "An error occured", executionTime: error.executionTime || null, memoryUsed: error.memoryUsed || null });
    }

};