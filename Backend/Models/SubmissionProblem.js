import mongoose from 'mongoose';

const submissionProblemSchema = new mongoose.Schema({
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'problem',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    submissions: [{
        code: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
            enum: ['cpp', 'py', 'java', 'javascript', 'csharp', 'ruby'],
        },
        verdict: {
            type: String,
            enum: ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error', 'Compilation Error', 'Internal Error', 'Pending'],
            default: 'Pending',
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
        executionTime: {
            type: Number, // in milliseconds
            default: null,
        },
        memoryUsed: {
            type: Number, // in KB
            default: null,
        },
        testCasesPassed: {
            type: Number,
            default: 0,
        },
        totalTestCases: {
            type: Number,
            default: 0,
        }
    }],
    lastSubmission: {
        type: Date,
        default: Date.now,
    },
    bestSubmission: {
        type: mongoose.Schema.Types.ObjectId,
        default: null, // Reference to the best submission (by execution time or first AC)
    }
}, {
    timestamps: true
});

// Index for faster queries
submissionProblemSchema.index({ userId: 1, problemId: 1 });
submissionProblemSchema.index({ 'submissions.timestamp': -1 });

const SubmissionProblem = mongoose.model('SubmissionProblem', submissionProblemSchema);

export default SubmissionProblem;