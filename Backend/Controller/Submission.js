import axios from 'axios';
import mongoose from 'mongoose';
import SubmissionProblem from '../Models/SubmissionProblem.js';
import TestCaseStruct from '../Models/Test_cases.js';

const COMPILER_URL = process.env.COMPILER_URL;

axios.defaults.withCredentials = true; // Enable sending cookies with requests

export const submitCode = async (req, res) => {
    let verdict = "Pending";
    try {
        const { problemId, code, language } = req.body;
        if (!problemId || !code || !language) {
            return res.status(400).json({ success: false, error: "Problem ID, code, and language are required." });
        }
        const pid = new mongoose.Types.ObjectId(problemId);

        const testCases = await TestCaseStruct.findOne({ problemId: pid });
        if (!testCases) {
            return res.status(404).json({ success: false, error: "No test cases found for the given problem ID." });
        }

        let testCasesPassed = 0;
        let outputMessage = '';
        let executionTime = 0;
        let memoryUsed = 0;

        for (let i = 0; i < testCases.test_case_input.length; i++) {
            try {
                const response = await axios.post(`${COMPILER_URL}/compile`, {
                    language,
                    code,
                    input: testCases.test_case_input[i],
                    timeout: testCases.timeout || 100000 // Use the timeout from test cases or default to 2 seconds
                }, {
                    withCredentials: true, // This sends cookies automatically
                    headers: {
                        Cookie: req.headers.cookie // Pass the cookies
                    }
                });

                const actualOutput = (response.data.output || '').trim();
                const expectedOutput = (testCases.test_case_output[i] || '').trim();

                executionTime += response.data.executionTime || 0;
                memoryUsed = Math.max(memoryUsed, response.data.memoryUsed || 0);
                if (actualOutput === expectedOutput) {
                    testCasesPassed++;
                } else {
                    verdict = "Wrong Answer";
                    outputMessage = `Test case ${i + 1} failed. \nExpected: ${expectedOutput}\nGot: ${actualOutput}`;
                    break;
                }
            } catch (error) {
                if (error.response) {
                if (error.response.status === 401 || error.response.status === 403) {
                    return res.status(error.response.status).json({ success: false, error: "Unauthorized access. Please log in." });
                }
                }
                if (error.response?.data?.error?.includes('Execution timed out')) {
                    verdict = "Time Limit Exceeded";
                    outputMessage = `Test case ${i + 1} timed out.`;
                } else if (error.response?.data?.error) {
                    verdict = 'Compilation Error';
                    outputMessage = error.response.data.error;
                } else {
                    verdict = 'Runtime Error';
                    outputMessage = error.message || "An error occurred during execution.";
                }
                break;
            }
        }
        if (verdict === "Pending") {
            verdict = testCasesPassed === testCases.test_case_input.length ? "Accepted" : "Wrong Answer";
        }
        if (verdict === "Accepted") {
            outputMessage = `All ${testCasesPassed} test cases passed successfully.`;
        }

        const uid = new mongoose.Types.ObjectId(req.user._id);

        let submissionDoc = await SubmissionProblem.findOne({ problemId: pid, userId: req.user._id });
        if (!submissionDoc) {
            submissionDoc = new SubmissionProblem({
                problemId: pid,
                userId: uid,
                submissions: []
            });
        }
        const newSubmission = {
            code,
            language,
            verdict,
            timestamp: new Date(),
            executionTime,
            memoryUsed,
            testCasesPassed,
            totalTestCases: testCases.test_case_input.length
        };
        submissionDoc.submissions.push(newSubmission);
        submissionDoc.lastSubmission = new Date();
        if (verdict === "Accepted") {

            const newSubId = submissionDoc.submissions[submissionDoc.submissions.length - 1]._id;

            if (!submissionDoc.bestSubmission) {
                submissionDoc.bestSubmission = newSubId;

            } else {

                const bestSubmission = submissionDoc.submissions.id(submissionDoc.bestSubmission);

                if (!bestSubmission || (typeof bestSubmission.executionTime === "number" && typeof newSubmission.executionTime === "number" && newSubmission.executionTime < bestSubmission.executionTime)) {
                    submissionDoc.bestSubmission = newSubId;
                }
            }
        }
        await submissionDoc.save();
        res.status(200).json({
            verdict,
            output: outputMessage,
            testCasesPassed,
            totalTestCases: testCases.test_case_input.length,
            executionTime,
            memoryUsed
        });
    } catch (error) {
        verdict = "Internal Error";
        console.error("Error in submission:", error);
        res.status(500).json({ success: false, error: "An error occurred while processing your submission.", verdict });
    }
}
