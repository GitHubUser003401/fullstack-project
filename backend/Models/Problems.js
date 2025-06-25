import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    SampleInput: {
        type: String,
        required: true,
    },
    SampleOutput: {
        type: String,
        required: true,
    },
    constraints: {
        type: String,
        required: true,
    },
    tags : {
        type: [String],
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
        enum: ["Easy", "Medium", "Hard"],
    },
    createdBy: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const ProblemStruct = mongoose.model("problem", problemSchema);
export default ProblemStruct;