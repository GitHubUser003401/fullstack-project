import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { compileCode } from "../Service/CompilationApi";
import { useDispatch, useSelector } from "react-redux";
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { submitCode } from "../Service/SubmissionApi";
import Spinner from "./Spinner";
import { ReviewCode } from "../Service/AiReviewAPI";
import ReactMarkdown from 'react-markdown';

function EditorBox() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const currentProblem = useSelector((state) => state.problem.currentProblem);
    const loading = useSelector((state) => state.auth.loading);

    const [code, setCode] = useState(`#include <iostream>
using namespace std;
int main() {
cout << "Hello, World!" << endl;
return 0;
}`)
    const [output, setOutput] = useState("");
    const [input, setInput] = useState("");
    const [activeTab, setActiveTab] = useState("output");
    const [verdict, setVerdict] = useState("");
    const [Review, setReview] = useState("");

    const handleRun = async () => {
        if (loading) return;
        dispatch({ type: 'auth/setloading' });
        try {
            const response = await compileCode('cpp', code, input);
            setOutput(response.output);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 403) {
                    // Handle unauthorized access
                    location.state = { message: error.response.data.message }
                    dispatch({ type: 'auth/logout' });
                    console.error("Unauthorized access:", error.response.data);
                    console.log(error.response.data.message)
                    navigate('/login');
                } else {
                    setOutput(typeof error.response.data === 'object' ? error.response.data?.message || error.response.data?.error : error.response.data);
                    console.error("Compilation error:", error.response.data);
                }
            } else {
                setOutput(error.message || "Network error.");
                console.error(error);
            }
        } finally {
            dispatch({ type: 'auth/clearLoading' });
        }
    }
    const handleSubmit = async () => {
        if (loading) return;
        dispatch({ type: 'auth/setloading' });
        try {
            const response = await submitCode(currentProblem._id, code, 'cpp');
            if (response.verdict === "Accepted") {
                dispatch({ type: 'submission/clearSubmissions' });
                navigate(`/dashboard/problems/Problemdescription/${currentProblem._id}/Problemsubmission`, { state: { message: "Submission successful!", verdict: response } });
            } else {
                setVerdict(response);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 403) {
                    // Handle unauthorized access
                    location.state = { message: error.response.data.message }
                    dispatch({ type: 'auth/logout' });
                    console.error("Unauthorized access:", error.response.data);
                    navigate('/login');
                } else {
                    setVerdict(typeof error.response.data === 'object' ? error.response.data?.message || error.response.data?.error : error.response.data);
                    console.error("Submission error:", error.response.data);
                }
            } else {
                setVerdict(error.message || "Network error.");
                console.error("Submission error:", error);
            }
        } finally {
            dispatch({ type: 'auth/clearLoading' });
        }
    }

    const handleReview = async () => {
        if (loading) return;
        dispatch({ type: 'auth/setloading' });
        try {
            const response = await ReviewCode(code, currentProblem.description);
            setReview(response.aiReviewResponse);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 403) {
                    // Handle unauthorized access
                    location.state = { message: error.response.data.message }
                    dispatch({ type: 'auth/logout' });
                    console.error("Unauthorized access:", error.response.data);
                    navigate('/login');
                } else {
                    setReview(typeof error.response.data === 'object' ? error.response.data?.message || error.response.data?.error : error.response.data);
                    console.error("Code review error:", error.response.data);
                }
            } else {
                setReview(error.message || "Network error.");
                console.error("Code review error:", error);
            }

        } finally {
            dispatch({ type: 'auth/clearLoading' });
        }
    }

    return (
        <div className="">
            <div className="w-full min-h-12 pl-4 pt-2 flex items-end gap-4">
                <button className={`truncate p-2 rounded-l-md h-fit font-newsreader rounded-br-xl rounded-tr-4xl transition-all duration-500
                ${activeTab === 'output' ? 'bg-gradient-to-br min-w-1/3 text-xl from-[#ffb347] via-[#ddd28f] to-[#6a82fb] tracking-wider text-red-600' : 'bg-cyan-500 min-w-1/4 hover:bg-blue-500 text-white hover:text-yellow-500'}`}
                    onClick={() => setActiveTab('output')}>
                    Output
                </button>
                <button className={`truncate p-2 rounded-l-md h-fit font-newsreader rounded-br-xl rounded-tr-4xl transition-all duration-500
                ${activeTab === 'verdict' ? 'bg-gradient-to-br min-w-1/3 text-xl from-[#ffb347] via-[#ddd28f] to-[#6a82fb] tracking-wider text-red-600' : 'bg-cyan-500 min-w-1/4 hover:bg-blue-500 text-white hover:text-yellow-500'}`}
                    onClick={() => setActiveTab('verdict')}>
                    Verdict
                </button>
                <button className={`truncate p-2 rounded-l-md h-fit font-newsreader rounded-br-xl rounded-tr-4xl transition-all duration-500
                ${activeTab === 'CodeReview' ? 'bg-gradient-to-br min-w-1/3 text-xl from-[#ffb347] via-[#ddd28f] to-[#6a82fb] tracking-wider text-red-600' : 'bg-cyan-500 min-w-1/4 hover:bg-blue-500 text-white hover:text-yellow-500'}`}
                    onClick={() => setActiveTab('CodeReview')}>
                    Code Review
                </button>
            </div>

            <div className="flow-shadow flex flex-col items-center min-h-screen w-full rounded-xl bg-gradient-to-br from-[#e6b93e] via-[#bebcb0] to-[#e6b93e]">
                <CodeMirror
                    value={code}
                    theme={dracula}
                    onChange={(value) => setCode(value)}
                    extensions={[cpp()]}
                    padding={10}
                    className="border border-gray-300 rounded-xl mt-4 "
                    style={{
                        fontSize: 8,
                        backgroundColor: '#282a36',
                        height: '400px',
                        width: '600px',
                        overflow: 'auto',
                    }} />
                <textarea className="w-[600px] bg-[#2c2f3c] text-amber-50 mt-4 p-2 border rounded"
                    rows={3}
                    placeholder="Custom Input (optional)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                {activeTab === 'output' && (
                    <>
                        <div className="mt-4 w-[600px] h-fit bg-gradient-to-br from-[#4671ff] via-[#11eff7] to-[#ffffff] p-4 rounded-lg shadow-lg mb-[20px]">
                            <h2 className="text-md font-semibold">Output:</h2>
                            <pre className="p-4 rounded-md mt-2 bg-[#2c2f3c] text-amber-50 overflow-x-auto"
                                style={{ fontSize: '12px' }}>
                                {output}
                            </pre>
                        </div>
                        <button className="mb-[20px] antialiased mt-[30px] font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#c27171] shadow-lg  rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                            onClick={handleRun}
                            disabled={loading}>
                            {loading ? "Running..." : "Run Code"}
                        </button>
                        <div className="w-fit h-fit">
                            {loading && <Spinner />}
                        </div>
                    </>
                )}

                {activeTab === "verdict" && (
                    <>
                        <button className="mb-[20px] antialiased mt-[30px] font-normal italic text-green-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#a8ff78] shadow-lg  rounded-lg truncate animated-pulse hover:font-bold hover:text-green-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                            onClick={handleSubmit}
                            disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                        <div className="w-fit h-fit mb-[20px]">
                            {loading && <Spinner />}
                        </div>

                        <div className="w-[600px] h-fit bg-amber-100 mb-10 p-5 font-tomorrow rounded-br-xl rounded-tr-4xl">
                            <h2 className="text-md font-semibold">Verdict: <span className="text-red-500">
                                {verdict ? verdict.verdict : "No verdict yet"}
                            </span>
                            </h2>
                            <h2 className="text-md font-semibold mt-2"> Message:
                            </h2>
                            <p className="overflow-x-auto text-md p-4 rounded-md mt-2 bg-[#2c2f3c] text-amber-100">
                                <pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'Tomorrow' }}>
                                    {verdict.output}
                                    {verdict.testCasesPassed ? `\nTest Cases Passed: ${verdict.testCasesPassed}` : ""}
                                    {verdict.totalTestCases ? `\nTotal Test Cases: ${verdict.totalTestCases}` : ""}
                                    {verdict.executionTime ? `\nExecution Time: ${verdict.executionTime} ms` : ""}
                                </pre>
                            </p>
                        </div>
                    </>
                )}
                {activeTab === "CodeReview" && (
                    <>
                        <button className="mb-[20px] antialiased mt-[30px] font-normal italic text-fuchsia-600 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#8153c6] shadow-lg  rounded-lg truncate animated-pulse hover:font-bold hover:text-fuchsia-800 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                            onClick={handleReview}
                            disabled={loading}>
                            {loading ? "Reviewing" : "Review Code"}
                        </button>
                        <div className="w-fit h-fit mb-[20px]">
                            {loading && <Spinner />}
                        </div>
                        <div className="w-[600px] h-fit bg-fuchsia-200 mb-10 p-5 font-tomorrow rounded-br-xl rounded-tr-4xl">
                            <h2 className="text-md text-fuchsia-900 font-semibold">Code Review:</h2>
                            <p className="overflow-x-auto text-md p-4 rounded-md mt-2 bg-[#2c2f3c] text-fuchsia-500">
                                <pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'Tomorrow' }}>
                                    <ReactMarkdown>
                                        {Review ? Review : "No review yet"}
                                    </ReactMarkdown>

                                </pre>
                            </p>

                        </div>

                    </>

                )}



            </div>
        </div>
    )
}

export default EditorBox;