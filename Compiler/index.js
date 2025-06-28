const express = require("express");
const generateFile = require("./generatefile");
const executeCpp = require("./executecpp");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/compile", async (req, res) => {
    const { language = 'cpp', code } = req.body;
    if (code === undefined || code.trim() === "") {
        return res.status(400).json({ success: false, error: "Code is required" });
    }
    try {
        const filepath = generateFile(language, code);
        const output = await executeCpp(filepath);
        res.json({ filepath });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }

});

app.get("/", (req, res) => {
    res.send("Compiler server is running");
});

app.listen(3000, () => {
    console.log("Compiler server is running on port 3000");
});