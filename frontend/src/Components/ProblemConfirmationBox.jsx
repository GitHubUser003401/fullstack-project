import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { createTestCases } from '../Service/TestCasesApi';
import { updateTestCases } from '../Service/TestCasesupdateApi';
import { useState } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';



function ConfirmProblemBox({ className }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    let message = location.state?.message;
    const problem = location.state?.problem;
    let testCases = location.state?.testCases;
    if (typeof message === 'object') {
        message = message?.message || message.toString();
    }
    const [status, setStatus] = useState("");
    const hasSent = useRef(false);

    useEffect(() => {
        const sendTestCases = async () => {
            if (hasSent.current) return; // Prevent multiple submissions
            if (testCases && problem) {
                hasSent.current = true; // Mark as sent
                const testCasewithID = { ...testCases, problemId: problem._id };
                try {
                    const isEditMode = location.pathname.includes('editproblem') || testCases.problemId;
                    if (isEditMode) {
                        await updateTestCases(testCases);
                        setStatus("Test cases updated successfully!");
                    } else {
                        await createTestCases(testCasewithID);
                        setStatus("Test cases created successfully!");
                    }
                } catch (error) {
                    if (error.response) {
                        if (error.response.status === 401 || error.response.status === 403) {
                            // Handle unauthorized access
                            location.state = { message: error.response.data.message }
                            dispatch({ type: 'auth/logout' });
                            console.error("Unauthorized access:", error.response.data);
                            navigate('/login', { state: { message: error.response.data.message } });
                        } else if (error.response.status === 400 && error.response.data.includes("already exist")) {
                            try {
                                await updateTestCases(testCasewithID);
                                setStatus("Test cases updated successfully!");
                                return;
                            } catch (updateError) {
                                setStatus("Failed to update test cases. Please try again by Editing Problem. :" + (updateError.response.data || updateError.response.data?.message));
                                console.error("Error updating test cases:", updateError);
                            }
                        } else {
                            setStatus("Failed to create test cases. Please try again by Editing Problem. :" + (error.response.data || error.response.data?.message));
                            console.error("Error creating test cases:", error);
                        }
                    } else {
                        setStatus("Failed to create test cases. Please try again by Editing Problem. :" + error.message);
                        console.error("Error creating test cases:", error);
                        alert("Failed to create test cases. Please try again by Editing Problem..");
                    }
                }
            }
        }
        sendTestCases();
    }, [testCases, problem]);

    return (
        <div className={className + "w-full min-h-screen flex justify-center"}>
            <div className="mt-[100px] w-2/3 mb-[50px] min-h-screen bg-gradient-to-br space-y-9 from-[#e6b93e] via-[#bebcb0] to-[#e6b93e] bordering flex flex-col items-center">
                {message && <p className="text-teal-700 animated-entry font-tomorrow text-2xl mt-[50px]">
                    {message}
                </p>}
                {problem && <div className="text-teal-700 animated-entry font-tomorrow text-xl mt-[30px] space-y-3">
                    <h1 className="text-lg font-semibold break-all whitespace-pre-wrap">Problem Details: </h1>
                    <p className='break-all whitespace-pre-wrap '>Title: {problem.title}</p>
                    <p className='break-all whitespace-pre-wrap '>Description: {problem.description}</p>
                    <p className='break-all whitespace-pre-wrap '>Sample Input: {problem.SampleInput.join(', ')}</p>
                    <p className='break-all whitespace-pre-wrap '>Sample Output: {problem.SampleOutput.join(', ')}</p>
                    <p className='break-all whitespace-pre-wrap '>Constraints: {problem.constraints.join(', ')}</p>
                    <p className='break-all whitespace-pre-wrap '>Tags: {problem.tags.join(', ')}</p>
                    <p className='break-all whitespace-pre-wrap '>Difficulty: {problem.difficulty}</p>
                    <p className='break-all whitespace-pre-wrap '>Created By: {problem.createdBy}</p>
                    <p className='break-all whitespace-pre-wrap '>Created At: {problem.createdAt && new Date(problem.createdAt).toLocaleDateString()}</p>
                </div>}
                {status && <p className="text-blue-700 w-2/3 text-center font-gruppo font-bold mt-4">{status}</p>}
                <button className="mt-[50px] antialiased font-normal italic text-indigo-700 font-serif text-lg mb-[20px] w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                    onClick={() => navigate('/dashboard/adminspace')}>
                    Back to Home
                </button>
            </div>
        </div>
    )
}
export default ConfirmProblemBox;