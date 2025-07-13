import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditorBox from "./EditorBox";
import { fetchSubmissions } from "../Service/FetchSubmissions";


function ProblemBox({ className }) {
    const location = useLocation();
    const problem = location.state?.problem;
    const dispatch = useDispatch();
    const currentProblem = useSelector((state) => state.problem.currentProblem);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("output");
    const [submissionError, setSubmissionError] = useState("");
    const submissions = useSelector((state) => state.submission.submissions);
    const [submissionData, setSubmissionData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = currentProblem._id || problem._id;
                console.log("Fetching submissions for problem ID:", id);
                if (id) {
                const response = await fetchSubmissions(id);
                dispatch({
                    type: 'submission/setSubmissions', payload: {
                        submissions: response.submissions,
                        bestSubmission: response.bestSubmission,
                        lastSubmission: response.lastSubmission
                    }
                })
                setSubmissionData(response);
            }} catch (error) {
                if (error.response) {
                    if (error.response.status === 401 || error.response.status === 403) {
                        // Handle unauthorized access
                        dispatch({ type: 'auth/logout' });
                        console.error("Unauthorized access:", error.response.data);
                        navigate('/login', {
                            state: { message: error.response.data.message }
                        });
                    } else if (error.response.status === 404) {
                        // Handle not found error
                        setSubmissionError("No submissions available.");
                        console.error("Problem not found:", error.response.data);
                    } else {
                        // Handle other errors
                        setSubmissionError("An error occurred while fetching submissions.");
                        console.error("Error fetching submissions:", error.response.data);
                    }
                } else {
                    // Handle network or other errors
                    setSubmissionError("Network error or server is down.");
                    console.error("Network error:", error.message);
                }
            }
        }
        fetchData();
    }, [navigate, activeTab])

    useEffect(() => {
        if (problem) {
            dispatch({ type: 'problem/setCurrentProblem', payload: problem });
        } else if (currentProblem) {
            // If the problem is not passed via state, we can use the currentProblem from the Redux store
        } else {
            window.alert("No problem data available.");
            // Optionally, you can redirect to a different page or handle the error state
            navigate('/dashboard/problems')
        }
    }, [navigate])

    return (
        <div className={className + " animated-entry flex flex-col items-center w-full min-h-screen"}>
            <div className="max-w-7/8 min-w-1/2 flex text-center justify-center flow-shadow break-words whitespace-pre-wrap mt-[30px] h-fit bg-gradient-to-br from-[#e6b93e] via-[#bebcb0] to-[#e6b93e] rounded-3xl">
                <h1 className="max-w-full min-w-fit text-2xl font-newsreader bg-gradient-to-r from-[#0399d5] via-[#2b04d9] to-[#008fa8] bg-clip-text text-transparent">
                    Q: {currentProblem ? currentProblem.title : problem ? problem.title : "Problem Title Not Available"}
                </h1>
            </div>
            <div className='mt-[15px] flex w-full min-h-screen'>
                <div className=" w-2/5 m-4">
                    <div className="w-full min-h-12 pl-4 pt-2 flex items-end gap-4">
                        <button className={`truncate p-2 rounded-l-md h-fit font-newsreader rounded-br-xl rounded-tr-4xl transition-all duration-500
                            ${activeTab === 'output' ? 'bg-gradient-to-br text-xl min-w-1/3 from-[#ffb347] via-[#ddd28f] to-[#6a82fb] tracking-wider text-red-600' : 'bg-cyan-500 hover:bg-blue-500 min-w-1/4 text-white hover:text-yellow-500'}`}
                            onClick={() => setActiveTab('output')}>
                            ProblemID
                        </button>
                        <button className={`truncate w-1/4 p-2 rounded-l-md h-fit font-newsreader rounded-br-xl rounded-tr-4xl transition-all duration-500
                            ${activeTab === 'verdict' ? 'bg-gradient-to-br text-xl min-w-1/3 from-[#ffb347] via-[#ddd28f] to-[#6a82fb] tracking-wider text-red-600' : 'bg-cyan-500 min-w-1/4 hover:bg-blue-500 text-white hover:text-yellow-500'}`}
                            onClick={() => setActiveTab('verdict')}>
                            Submissions
                        </button>

                    </div>
                    <div className="flow-shadow p-2 rounded-xl bg-gradient-to-br from-[#e6b93e] via-[#bebcb0] to-[#e6b93e] h-fit">
                        {activeTab === "output" && (
                            <>
                                <div className="w-full p-4 h-fit break-words">
                                    <h2 className="text-xl font-semibold font-newsreader">Problem Description:</h2>
                                    <p className="break-words mt-2 whitespace-pre-wrap">
                                        {currentProblem ? currentProblem.description : problem ? problem.description : "No description available."}
                                    </p>
                                </div>
                                <div className="w-full p-4 h-fit break-words">
                                    <h2 className="text-xl mt-20 font-newsreader ">
                                        Constraints:
                                    </h2>
                                    <ul className="list-disc text-red-800 pl-5">
                                        {currentProblem && currentProblem.constraints.map((constraint, idx) => (
                                            <li key={idx} className="text-lg font-newsreader break-words whitespace-pre-wrap">
                                                {constraint}
                                            </li>)
                                        )}
                                        {currentProblem && currentProblem.constraints.length === 0 && (
                                            <li className="text-lg font-newsreader">No constraints provided</li>
                                        )}
                                    </ul>
                                </div>
                                <div className=" overflow-x-auto mt-20">
                                    <table className=" border-collapse border border-slate-800 table-fixed min-w-full mt-10 mb-12 bg-black">
                                        <thead>
                                            <tr className="bg-slate-600 text-blue-500 font-newsreader tracking-tight" >
                                                <th className="border border-amber-100 text-lg w-1/2 ">Sample Input</th>
                                                <th className="border border-amber-100 text-lg w-1/2">Sample Output</th>
                                            </tr>
                                        </thead>
                                        <tbody className="">
                                            {currentProblem && currentProblem.SampleInput.map((input, idx) => (
                                                <tr key={idx} className="hover:bg-sky-500 transition duration-300 tracking-tight">
                                                    <td className="px-4 border border-amber-100 text-red-800 min-w-fit font-newsreader font-bold text-lg whitespace-pre-wrap">{input}</td>
                                                    <td className="px-4 border border-amber-100 text-red-800 min-w-fit font-newsreader font-bold text-lg whitespace-pre-wrap">{currentProblem.SampleOutput[idx]}</td>
                                                </tr>
                                            ))}
                                            {currentProblem && currentProblem.SampleInput.length === 0 && (
                                                <tr>
                                                    <td className="border border-amber-100 text-red-800 min-w-fit font-newsreader font-bold text-lg">No sample input provided</td>
                                                    <td className="border border-amber-100 text-red-800 min-w-fit font-newsreader font-bold text-lg">No sample output provided</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </>)
                        }
                        {activeTab === "verdict" && (
                            <div className="w-full p-4 h-fit break-words">
                                <h2 className="text-xl font-semibold font-newsreader">Submissions:</h2>
                                <p className="mt-2">This section will display the submission history and verdicts.</p>
                                {submissionError && (
                                    <p className="text-red-600 mt-2">{submissionError}</p>
                                )}
                                {((submissionData.submissions && submissionData.submissions.length > 0)
                                    ? submissionData.submissions
                                    : (submissions && submissions.length > 0)
                                        ? submissions
                                        : []).length !== 0 && (
                                        <ul className="mt-2 space-y-4">
                                            {((submissionData.submissions && submissionData.submissions.length > 0)
                                                ? submissionData.submissions
                                                : submissions).slice(-5).reverse().map((submission, idx) => (
                                                    <li key={submission._id || idx} className="text-lg p-4 bordering bg-gradient-to-br from-[#4671ff] via-[#11eff7] to-[#ffffff]  font-newsreader break-words whitespace-pre-wrap">
                                                        <span className="ml-2">Verdict: <span className="font-semibold">{submission.verdict}</span></span> |
                                                        <span className="ml-2">Lang: {submission.language}</span> |
                                                        <span className="ml-2">Time: {submission.executionTime} ms</span> |
                                                        <span className="ml-2">Passed: {submission.testCasesPassed}/{submission.totalTestCases}</span>
                                                        <span className="ml-2">Date: {new Date(submission.timestamp).toLocaleString()}</span>
                                                    </li>))}
                                        </ul>
                                    )
                                }
                            </div>
                        )}
                    </div>


                </div>
                <div className=" w-3/5 m-4">
                    <EditorBox />
                </div>
            </div>
        </div>
    )
}
export default ProblemBox;