import { useNavigate } from "react-router-dom";
import { fetchProblems } from "../Service/ProblemfetchApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function ProblemSet({ className }) {
    const navigate = useNavigate();
    const loading = useSelector((state) => state.problems.loading);
    const dispatch = useDispatch();
    const problems = useSelector((state) => state.problems.problems);
    const error = useSelector((state) => state.problems.error);

    useEffect(() => {
        dispatch({ type: 'problem/clearError' });
        dispatch({ type: 'auth/clearError' });
    }, [dispatch]);

    useEffect(() => {

        if (loading) return;
        dispatch({ type: 'problem/fetchProblemStart' });
        const fetchData = async () => {
            try {
                const ProblemList = await fetchProblems();
                dispatch({ type: 'problem/fetchProblemSuccess', payload: ProblemList.problemlist });
            } catch (error) {
                dispatch({ type: 'problem/fetchProblemFailure', payload: error });
                console.error("Error fetching problems:", error);
            }
        }
        fetchData();
    }, [dispatch, loading]);

    return (
        <div className = {className + " animated-entry min-h-screen"}>
            <h1 className = "text-2xl h-16 flex items-end font-semibold">
                <span className = "bg-gradient-to-r from-[#b438ee] via-[#d21396] to-[#d5d4d4] w-2/3 font-light font-newsreader ">Here is the Problem Sets Section</span>
            </h1>
            <div className = "overflow-x-auto mt-6">
                <table className = "min-w-full border-collapse border border-gray-500 bg-black table-fixed">
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
                        {problems.map((problem, idx) => (
                            <tr key={problem._id || idx} className="hover:bg-cyan-800 transition duration-300"
                            onClick={() => navigate(`/problemDescription/${problem._id}`)}>
                                <td className=" border border-gray-500 py-2 px-6 text-orange-600 text-center">{problem.title}</td>
                                <td className=" border border-gray-500 py-2 px-6 text-orange-600 text-center">{problem.difficulty}</td>
                                <td className=" border border-gray-500 py-2 px-6 text-orange-600 text-center">
                                    {problem.tags && problem.tags.join(', ')}
                                </td>
                                <td className=" border border-gray-500 py-2 px-6 text-orange-600 text-center">{problem.createdBy}</td>
                                <td className=" border border-gray-500 py-2 px-6 text-orange-600 text-center">
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
                        {error && (
                            <tr>
                                <td colSpan={5} className = "py-4 font-gruppo text-3xl text-center text-red-500">
                                    {typeof error === "string" ? error : error?.message || "An error occurred while fetching problems."}
                                </td>
                                </tr>)}
                        {loading && (
                            <tr>
                                <td colSpan={5} className = "py-4 font-gruppo text-3xl text-center text-blue-500">
                                    Loading problems...
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ProblemSet;