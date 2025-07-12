import mongoose from "mongoose";
import TestCaseStruct from "../Models/Test_cases.js";


export const TestCaseCreationCode = async (req, res) => {
    try {
        const { problemId, test_case_input, test_case_output } = req.body;
        if (!(problemId && test_case_input && test_case_output)) {
            return res.status(400).send("Please provide all required fields.");
        }
        const pid = new mongoose.Types.ObjectId(problemId);
        // Check if test cases for this problem already exist
        const existing = await TestCaseStruct.findOne({ problemId: pid });
        
        if (existing) {
            return res.status(400).send("Test cases for this problem already exist. Use update instead.");
        }


        try {
            const newTestCase = await TestCaseStruct.create({
                problemId : pid,
                test_case_input,
                test_case_output,
            });
            res.status(201).json({ message: "Test case created successfully", testCase: newTestCase });
        } catch (err) {
            console.error("Error creating test case:", err);
            return res.status(400).send("Error in creating test case: " + err.message);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}
