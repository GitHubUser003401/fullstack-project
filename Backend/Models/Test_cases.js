import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'problem',
        required: true,
    },
    test_case_input: {
        type: [String],
        required: true,
    },
    test_case_output: {
        type: [String],
        required: true,
    },
    timeout: {
        type: Number,
        default: 2000, // in milliseconds, default 2s
    },
    visible: {
        type: Boolean,
        default: false,
    }
});
const TestCaseStruct = mongoose.model('test_case', testCaseSchema);
export default TestCaseStruct;