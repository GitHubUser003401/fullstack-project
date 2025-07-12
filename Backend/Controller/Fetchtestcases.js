import mongoose from "mongoose";
import TestCaseStruct from '../Models/Test_cases.js';

export const fetchTestCasesByProblemId = async (req, res) => {
    try {
        const { problemId } = req.params;

        if (!problemId) {
            return res.status(400).send("Problem ID is required.");
        }
        const pid = new mongoose.Types.ObjectId(problemId);

        const testCases = await TestCaseStruct.findOne({ problemId: pid });
        if (!testCases) {
            return res.status(404).send("No test cases found for the given problem ID.");
        }
        res.status(200).json(testCases);
    } catch (error) {
        console.error("Error fetching test cases:", error);
        if (error.name === 'CastError') {
            return res.status(400).send("Invalid problem ID format.");
        }
        res.status(500).send("Internal Server Error");
    }
}