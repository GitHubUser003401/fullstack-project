import executeCpp from "../Utils/executeCpp.js";
import generateFile from "../Utils/generateFile.js";
import generateInputFile from "../Utils/generateinputfile.js";

export const compileCode = async (req, res) => {
    const { language = 'cpp', code, input } = req.body;
    if (code === undefined || code.trim() === "") {
        return res.status(400).json({ success: false, error: "Code is required" });
    }
    try {
        const filepath = generateFile(language, code);
        const inputFile = generateInputFile(input);
        const output = await executeCpp(filepath, inputFile);
        res.json({output});
    } catch (error) {
        res.status(500).json({ success: false, error: error.stderr || error.error || "An error occured" });
    }
};