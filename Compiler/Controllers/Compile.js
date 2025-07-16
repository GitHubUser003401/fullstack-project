import executeCpp from "../Utils/executeCpp.js";
import generateFile from "../Utils/generateFile.js";
import generateInputFile from "../Utils/generateinputfile.js";

export const compileCode = async (req, res) => {
    const { language = 'cpp', code, input, timeout = 100000 } = req.body;
    if (code === undefined || code.trim() === "") {
        return res.status(400).json({ success: false, error: "Code is required" });
    }

    if (!['cpp', 'c', 'java', 'python'].includes(language)) {
        return res.status(400).json({ success: false, error: "Unsupported language" });
    }

    if (language === 'cpp' && code.includes("cin") && (!input || input.trim() === "")) {
        return res.status(400).json({ success: false, error: "Input required but not provided." });
    }

    try {
        const filepath = generateFile(language, code);
        const inputFile = generateInputFile(input);
        const output = await executeCpp(filepath, inputFile, timeout);
        res.json({ output: output.output, executionTime: output.executionTime, memoryUsed: output.memoryUsed });
    } catch (error) {
        res.status(500).json({ success: false, error: error.stderr || error.error || "An error occured", executionTime: error.executionTime || null, memoryUsed: error.memoryUsed || null });
    }

};