import mongoose from "mongoose";
import TestCaseStruct from "../Models/Test_cases.js";

export const TestCaseUpdateCode = async (req, res) => {
    try {
        const { test_case_input, test_case_output, problemId, timeout } = req.body;
        if (!(test_case_input && test_case_output && problemId)) {
            return res.status(400).send("Please provide all required fields.");
        }
        const pid = new mongoose.Types.ObjectId(problemId);

        const updatedTestCase = await TestCaseStruct.findOneAndUpdate(
            { problemId: pid },
            { test_case_input, test_case_output, timeout: timeout || 2000 }, // default to 2 seconds if not provided
            { new: true }
        );

        if (!updatedTestCase) {
            return res.status(404).send("Test case not found for the given problem ID");
        }

        res.status(200).json({ message: "Test cases updated successfully", testCases: updatedTestCase });
    } catch (error) {
        console.error("Error updating test cases:", error);
        if (error.name === 'CastError') {
            return res.status(400).send("Invalid problem ID format");
        }
        res.status(500).send("Internal Server Error");
    }
}