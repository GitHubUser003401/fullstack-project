import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProblem } from "../Service/ProblemfetchApi";

function ProblemSet({ className }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const problems = useSelector((state) => state.problem.problems);
    const [Page, setPage] = useState(1);
    const perPage = 10; // Number of problems per page

    useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetchProblem();
                    dispatch({ type: 'problem/setProblems', payload: response.problemlist }); 
                } catch (error) {
                    if (error.response) {
                        if (error.response.status === 401 || error.response.status === 403) {
                            // Handle unauthorized access
                            
                            dispatch({ type: 'auth/logout' });
                            console.error("Unauthorized access:", error.response.data);
                            navigate('/login', { state: { message: error.response.data.message } });
                        } else { 
                            navigate('/login', { state: { message: error.response.data.message } });
                        }
                    } else {
                    navigate('/login', { state: { message: error.message || "Network error." } });
                    // Optionally, you can handle the error state here
                }
            }
        };
        fetchData();
    }, [navigate]);

    const startIndex = (Page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const currentProblems = problems.slice(startIndex, endIndex);
    const totalPages = Math.ceil((problems.length / perPage) || 1);


    return (
        <div className = {className + " animated-entry min-h-screen"}>
            <h1 className = "text-2xl h-16 flex items-end font-semibold">
                <span className = "bg-gradient-to-r from-[#b438ee] via-[#d21396] to-[#d5d4d4] w-1/3 font-light font-newsreader ">Here is the Problem Section</span>
            </h1>
            <div className = "overflow-x-auto">
                <table className = "min-w-full mb-[20px] border-collapse border border-gray-500 bg-black table-fixed">
                    <thead className = "bg-gray-600 text-white font-newsreader">
                        <tr>
                            <th className = "border border-gray-500 py-2 px-6 w-1/5">Title</th>
                            <th className = "border border-gray-500 py-2 px-6 w-1/5">Difficulty</th>
                            <th className = "border border-gray-500 py-2 px-6 w-1/5">Tag</th>
                            <th className = "border border-gray-500 py-2 px-6 w-1/5">Created By</th>
                            <th className = "border border-gray-500 py-2 px-6 w-1/5">Created At</th>
                        </tr>
                    </thead>
                    <tbody className = "">
                        {currentProblems.map((problem, idx) => (
                            <tr key={problem._id || idx} className="hover:bg-cyan-800 transition duration-300"
                            onClick={() => navigate(`/dashboard/problems/Problemdescription/${problem._id}`, { state: { problem: problem } })}>
                                <td className=" border border-gray-500 py-2 px-6 h-20 text-orange-600 text-center">{problem.title}</td>
                                <td className=" border border-gray-500 py-2 px-6 h-20 text-orange-600 text-center">{problem.difficulty}</td>
                                <td className=" border border-gray-500 py-2 px-6 h-20 text-orange-600 text-center">
                                    {problem.tags && problem.tags.join(', ')}
                                </td>
                                <td className=" border border-gray-500 py-2 px-6 h-20 text-orange-600 text-center">{problem.createdBy}</td>
                                <td className=" border border-gray-500 py-2 px-6 h-20 text-orange-600 text-center">
                                    {problem.createdAt && new Date(problem.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                                ))}
                        {problems.length == 0 && (
                            <tr>
                                <td colSpan={5} className = "py-4 font-gruppo text-3xl text-center text-red-500">
                                    No problems available at the moment.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className = "flex justify-center mt-2 gap-2 mb-16">
                <button
                    className = "px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                    onClick={() => setPage(Page - 1)}
                    disabled={Page === 1} >
                    Previous
                </button>
                <span className= "px-4 py-2">{Page} / {totalPages}</span>
                <button
                    className = "px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                    onClick={() => setPage(Page + 1)}
                    disabled={Page === totalPages} >
                    Next
                </button>
            </div>

        </div>
    )
}
export default ProblemSet;
 
