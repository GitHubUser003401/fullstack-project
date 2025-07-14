import mongoose from "mongoose";
import SubmissionProblem from "../Models/SubmissionProblem.js";

export const fetchAllSubmissions = async (req, res) => {
    try { 
        const { problemId } = req.params;
        if (!problemId) {
            return res.status(400).send("Problem ID is required.");
        }
        const pid = new mongoose.Types.ObjectId(problemId);

        const docs = await SubmissionProblem.find({ problemId: pid }).populate('userId', 'username');
        if (!docs || docs.length === 0) {
            return res.status(404).send("No submissions found for the given problem ID.");
        }

        const allSubmissions = [];

        docs.forEach(doc => {
            doc.submissions.forEach(sub => {
                allSubmissions.push({
                    ...sub.toObject(),
                    userId: doc.userId._id,
                    username: doc.userId.username
                })
            })
        })

        res.status(200).json({
            message: "All submissions fetched successfully",
            submissions: allSubmissions
        });
    } catch (error) {
        console.error("Error fetching submissions:", error);
        if (error.name === 'CastError') {
            return res.status(400).send("Invalid problem ID format.");
        }
        res.status(500).send("Internal Server Error");
    }
}