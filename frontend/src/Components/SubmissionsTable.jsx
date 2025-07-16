import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllSubmissions } from "../Service/FetchAllSubmissionsApi";
import { useLocation, useNavigate } from "react-router-dom";

function SubmissionsTable({ className }) {
    const navigate = useNavigate();
    const location = useLocation();
    const submissions = useSelector((state) => state.submission.submissions);
    const problem = useSelector((state) => state.problem.currentProblem);
    // If the problem is not provided, use the submissions from the Redux store
    // If the problem is provided, fetch submissions for that problem
    // If neither is provided, show an empty table with a message
    const ShowAll = location.state?.showAll
    const [AllSubmissions, setAllSubmissions] = useState([]);
    const [message, setMessage] = useState("");
    const [Page, setPage] = useState(1);
    const perPage = 10; // Number of problems per page
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchData = async () => {
            if (ShowAll && problem._id) {
                try {
                    const response = await fetchAllSubmissions(problem._id);
                    setAllSubmissions(response.submissions || []);
                    setMessage("");
                } catch (error) {
                    if (error.response) {
                        if (error.response.status === 401 || error.response.status === 403) {
                            // Handle unauthorized access
                            console.error("Unauthorized access:", error.response.data);
                            navigate('/login', { state: { message: error.response.data.message } });
                        } else {
                            setMessage(error.response.data || "An error occurred while fetching submissions.");
                            setAllSubmissions([]);
                            console.error("Error fetching submissions:", error.response.data);
                        }
                    } else {
                        setMessage(error.message || "Network error.");
                        setAllSubmissions([]);
                        console.error("Network error:", error);
                    }
                }
            } else {
                setAllSubmissions(submissions || []);
                setMessage("");
            }
        };
        fetchData();
    }, [navigate])

    const startIndex = (Page - 1) * perPage;
    const endIndex = startIndex + perPage;
    // Reverse the order of submissions to show the latest first
    const sortedSubmissions = [...AllSubmissions].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const currentSubmissions = sortedSubmissions.slice(startIndex, endIndex);
    const totalPages = Math.ceil((AllSubmissions.length / perPage) || 1);

    return (
        <div className={`animated-entry w-full min-h-screen flex flex-col items-center ${className}`}>
            <div className="overflow-x-auto w-7/8 ">
                <table className="min-w-full mb-[20px] mt-[50px] border-collapse border-4 border-gray-500 bg-black table-fixed">
                    <thead className="bg-gray-600 text-white font-newsreader">
                        <tr>
                            <th className="border border-gray-500 py-2 px-6 w-1/7">User</th>
                            <th className="border border-gray-500 py-2 px-6 w-1/7">Verdict</th>
                            <th className="border border-gray-500 py-2 px-6 w-1/7">Timestamp</th>
                            <th className="border border-gray-500 py-2 px-6 w-1/7">Execution Time</th>
                            <th className="border border-gray-500 py-2 px-6 w-1/7">Memory Used</th>
                            <th className="border border-gray-500 py-2 px-6 w-1/7">Test Cases Passed</th>
                            <th className="border border-gray-500 py-2 px-6 w-1/7">Total Test Cases</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {currentSubmissions.map((submission, idx) => (
                            <tr key={submission._id || idx} className="hover:bg-cyan-800 font-baskervville transition duration-300">
                                <td className="border border-gray-500 py-2 px-6 text-center text-amber-500">{submission.username || user.username}</td>
                                <td className="border border-gray-500 py-2 px-6 text-center">
                                    <span className={`font-bold ${submission.verdict === "Accepted" ? "text-green-600" : submission.verdict === "Wrong Answer" ? "text-red-600" : "text-yellow-600"}`}>
                                        {submission.verdict}
                                    </span>
                                </td>
                                <td className="border border-gray-500 py-2 px-6 text-center text-amber-500">
                                    {new Date(submission.timestamp).toLocaleString().toLowerCase()}
                                </td>
                                <td className="border border-gray-500 py-2 px-6 text-center text-amber-500">
                                    {submission.executionTime} ms
                                </td>
                                <td className="border border-gray-500 py-2 px-6 text-center text-amber-500
                                    ">
                                    {submission.memoryUsed} kb
                                </td>
                                <td className="border border-gray-500 py-2 px-6 text-center text-amber-500">
                                    {submission.testCasesPassed}
                                </td>
                                <td className="border border-gray-500 py-2 px-6 text-center text-amber-500">
                                    {submission.totalTestCases}
                                </td>
                            </tr>
                        ))}
                        {currentSubmissions.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center font-gruppo text-3xl text-red-500 py-4">
                                    {message || "No submissions found."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            <div className="flex justify-center mt-2 gap-2 mb-16">
                <button
                    className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                    onClick={() => setPage(Page - 1)}
                    disabled={Page === 1} >
                    Previous
                </button>
                <span className="px-4 py-2">{Page} / {totalPages}</span>
                <button
                    className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                    onClick={() => setPage(Page + 1)}
                    disabled={Page === totalPages} >
                    Next
                </button>
            </div>

            <div className="mt-8 mb-16">
                <button
                    className="antialiased font-normal italic text-indigo-700 font-serif text-lg w-52 h-20 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                    onClick={() => navigate(-1)}
                >
                    Back to Problem
                </button>
            </div>
        </div>
    )
}
export default SubmissionsTable;