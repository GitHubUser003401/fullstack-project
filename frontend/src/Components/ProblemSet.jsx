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
    const tags = useSelector((state) => state.problem.tag);
    const difficulties = useSelector((state) => state.problem.difficulty);
    const [tag, setTag] = useState("");
    const [difficulty, setDifficulty] = useState("");

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
    const filteredProblems = problems.filter(problem => (problem.tags && problem.tags.length > 0 ? problem.tags.some(t => t.toLowerCase().includes(tags.toLowerCase())) : true) &&
        (difficulties ? problem.difficulty === difficulties : true));
    const currentProblems = filteredProblems.slice(startIndex, endIndex);
    const totalPages = Math.ceil((filteredProblems.length / perPage) || 1);


    return (
        <div className={className + " animated-entry min-h-screen"}>
            <div className="w-[900px] bg-gradient-to-r from-[#b438ee] via-[#d21396] to-[#d5d4d4] rounded-br-xl rounded-tr-[80px] flex p-4 items-center mt-8">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    dispatch({ type: 'problem/setTags', payload: tag });
                    dispatch({ type: 'problem/setDifficulties', payload: difficulty });
                }}
                    className="w-[800px] flex items-center ">
                    <label className="text-white font-semibold font-baskervville w-5xs">Search by Tag:</label>
                    <input type="text" placeholder="Search by Tag" className="focus:outline-none focus:ring-2 placeholder-black bg-gray-300 ml-2 rounded-full truncate w-[200px] h-8 transition delay-50 duration-500 hover:scale-105 hover:translate-y-1"
                        value={tag} onChange={(e) => setTag(e.target.value)} />
                    <label className="text-white font-semibold ml-4 font-baskervville w-4xs">Search by Difficulty:</label>
                    <select name="difficulty" className="focus:outline-none focus:ring-2 placeholder-black bg-gray-300 rounded-full truncate w-[200px] ml-2 h-8 transition delay-50 duration-500 hover:scale-105 hover:translate-y-1"
                        value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="" disabled >Select Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        <option value="">All</option>
                    </select>
                    <button type="submit" className="cursor-pointer ml-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-fuchsia-700 font-newsreader transition duration-300">
                        Search
                    </button>
                </form>
            </div>
            <h1 className="text-2xl h-16 flex items-end font-semibold">
                <span className="bg-gradient-to-r from-[#b438ee] via-[#d21396] to-[#d5d4d4] w-1/3 font-light font-newsreader rounded-br-xl rounded-tr-4xl ">Here is the Problem Section</span>
            </h1>
            <div className="overflow-x-auto">
                <table className="min-w-full mb-[20px] border-collapse border border-gray-500 bg-black table-fixed">
                    <thead className="bg-gray-600 text-white font-baskervville">
                        <tr>
                            <th className="border border-gray-500 py-2 px-6 w-4/10">Title</th>
                            <th className="border border-gray-500 py-2 px-6 w-1/10">Difficulty</th>
                            <th className="border border-gray-500 py-2 px-6 w-1/10">Tag</th>
                            <th className="border border-gray-500 py-2 px-6 w-2/10">Created By</th>
                            <th className="border border-gray-500 py-2 px-6 w-2/10">Created At</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {currentProblems.map((problem, idx) => (
                            <tr key={problem._id || idx} className="hover:bg-cyan-800 cursor-pointer odd:bg-[#000000] even:bg-[#1e1e2f] font-unna text-md transition duration-300"
                                onClick={() => navigate(`/dashboard/problems/Problemdescription/${problem._id}`, { state: { problem: problem } })}>
                                <td className=" border border-gray-500 py-2 px-6 h-16 text-orange-600 text-center">{problem.title}</td>
                                <td className=" border border-gray-500 py-2 px-6 h-16 text-orange-600 text-center">{problem.difficulty && (problem.difficulty === "Easy" ? <span className="text-green-500">{problem.difficulty}</span> : problem.difficulty === "Medium" ? <span className="text-yellow-500">{problem.difficulty}</span> : <span className="text-red-600">{problem.difficulty}</span>)}</td>
                                <td className=" border border-gray-500 py-2 px-6 h-16 text-orange-600 text-center">
                                    {problem.tags && problem.tags.join(', ')}
                                </td>
                                <td className=" border border-gray-500 py-2 px-6 h-16 text-orange-600 text-center">{problem.createdBy}</td>
                                <td className=" border border-gray-500 py-2 px-6 h-16 text-orange-600 text-center">
                                    {problem.createdAt && new Date(problem.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        {currentProblems.length == 0 && (
                            <tr>
                                <td colSpan={5} className="py-4 font-gruppo text-3xl text-center text-red-500">
                                    No problems available at the moment.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-2 gap-2 mb-16">
                <button
                    className="px-4 py-2 bg-gray-700 cursor-pointer text-white rounded disabled:opacity-50"
                    onClick={() => setPage(Page - 1)}
                    disabled={Page === 1} >
                    Previous
                </button>
                <span className="px-4 py-2">{Page} / {totalPages}</span>
                <button
                    className="px-4 py-2 bg-gray-700 cursor-pointer text-white rounded disabled:opacity-50"
                    onClick={() => setPage(Page + 1)}
                    disabled={Page === totalPages} >
                    Next
                </button>
            </div>

        </div>
    )
}
export default ProblemSet;

