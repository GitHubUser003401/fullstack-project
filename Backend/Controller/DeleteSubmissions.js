import mongoose from "mongoose";
import SubmissionProblem from "../Models/SubmissionProblem.js";

export const deletesubmissionCode = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("Problem ID is required.");
        }
        const pid = new mongoose.Types.ObjectId(id);

        const result = await SubmissionProblem.deleteMany({ problemId: pid });
        if (result.deletedCount === 0) {
            return res.status(404).send("No submissions found for the given problem ID.");
        }
        res.status(200).json({ message: "Submissions deleted successfully", deletedCount: result.deletedCount });
    } catch (error) {
        console.error("Error deleting submissions:", error);
        if (error.name === 'CastError') {
            return res.status(400).send("Invalid problem ID format.");
        }
        res.status(500).send("Internal Server Error");
    }
}

