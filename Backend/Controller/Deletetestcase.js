import mongoose from "mongoose";
import TestCaseStruct from "../Models/Test_cases.js";

export const DeleteTestCaseCode = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("Problem ID is required.");
        }
        const pid = new mongoose.Types.ObjectId(id);

        const deletedTestCase = await TestCaseStruct.findOneAndDelete({ problemId: pid });

        if (!deletedTestCase) {
            return res.status(404).send("No test cases found for the given problem ID.");
        }

        res.status(200).json({ message: "Test cases deleted successfully", testCase: deletedTestCase });
    } catch (error) {
        console.error("Error deleting test cases:", error);
        if (error.name === 'CastError') {
            return res.status(400).send("Invalid problem ID format.");
        }
        res.status(500).send("Internal Server Error");
    }
}