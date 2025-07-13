import mongoose from 'mongoose';
import SubmissionProblem from '../Models/SubmissionProblem.js';

export const fetchSubmissionCode = async (req, res) => {
    try {
        const { problemId } = req.params;
        if (!problemId) {
            return res.status(400).send("Problem ID is required.");
        }
        const pid = new mongoose.Types.ObjectId(problemId);
        const uid = new mongoose.Types.ObjectId(req.user._id);

        const submissionDoc = await SubmissionProblem.findOne({ problemId: pid, userId: uid });
        if (!submissionDoc) {
            return res.status(404).send("No submissions found for the given problem ID.");
        }

        res.status(200).json({
            message: "Submissions fetched successfully",
            submissions: submissionDoc.submissions,
            bestSubmission: submissionDoc.bestSubmission,
            lastSubmission: submissionDoc.lastSubmission
        })
    } catch (error) {
        console.error("Error fetching submissions:", error);
        if (error.name === 'CastError') {
            return res.status(400).send("Invalid problem ID format.");
        }
        res.status(500).send("Internal Server Error");
    }
}