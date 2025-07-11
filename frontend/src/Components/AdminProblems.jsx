import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProblem } from "../Service/ProblemfetchApi";
import { deleteProblem } from "../Service/ProblemDeleteApi";
import Spinner from "./Spinner";


function AdminProblems({className}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let problems = useSelector((state) => state.problem.problems);
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);
    const [deletingId, setDeletingId] = useState(null);

    const userId = user._id;
    const username = user.username;
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


    const adminProblems = problems.filter(problem => {
        const [createdById, createdByUsername] = problem.createdBy.split('|');
        return createdById === userId && createdByUsername === username;
    });

    return (
        <div className={className + "animated-entry min-h-screen"}>
            <h1 className="font-newsreader mt-4 text-neutral-800 bg-gradient-to-tr w-1/3 from-[#ba4b4b] from-[0%] via-[#550101] via-[20%] to-[#e84a0b] to-[100%] text-2xl">
                Admin Problem Set Section
            </h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border mt-4 border-gray-500 bg-black table-fixed">
                    <thead>
                        <tr className="bg-yellow-900 text-white font-tomorrow">
                            <th className="border border-gray-500 py-2 px-6 w-1/5">Title</th>
                            <th className="border border-gray-500 py-2 px-6 w-1/5">Difficulty</th>
                            <th className="border border-gray-500 py-2 px-6 w-1/5">Created At</th>
                            <th className="border border-gray-500 py-2 px-6 w-3/5">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminProblems.map((problem, idx) => (
                            <tr key={problem._id || idx} className="hover:bg-cyan-800 transition duration-300">
                                <td className="border border-gray-500 py-2 px-6 text-orange-600 text-center">{problem.title}</td>
                                <td className="border border-gray-500 py-2 px-6 text-orange-600 text-center">{problem.difficulty}</td>
                                <td className="border border-gray-500 py-2 px-6 text-orange-600 text-center">
                                    {problem.createdAt && new Date(problem.createdAt).toLocaleDateString()}
                                </td>
                                <td className="border border-gray-500 py-2 px-6 text-center flex gap-5">
                                    <button className="antialiased font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg row-start-6 rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                                        onClick={() => navigate(`/dashboard/adminspace/Adminproblems/editproblem/${problem._id}`, { state: { problem : problem } })}
                                    >
                                        Edit
                                    </button>
                                    <button className="antialiased font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg row-start-6 rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                                        onClick={() => navigate(`/dashboard/adminspace/Adminproblems/problemconfirmation`, { state: { message: "Your Current Problem" , problem: problem } })}>
                                        View
                                    </button>
                                    <button className="antialiased font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg row-start-6 rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                                        onClick = {async () => {
                                            if (loading) return;
                                            const confirmed = window.confirm("Are you sure you want to delete this problem?");
                                            if (confirmed) {
                                                setDeletingId(problem._id);
                                                dispatch({ type: 'auth/setloading' });
                                                try {
                                                    const response = await deleteProblem(problem._id);
                                                    problems = problems.filter(p => p._id !== problem._id);
                                                    dispatch({ type: 'problem/setProblems', payload: problems });
                                                    navigate('/dashboard/adminspace/Adminproblems/problemconfirmation', { state: { message: response.message, problem: response.problem } });
                                                } catch (error) {
                                                    if (error.response) {
                                                        if (error.response.status === 401 || error.response.status === 403) {
                                                            dispatch({ type: 'auth/logout' });
                                                            navigate('/login', { state: { message: error.response.data.message } });
                                                        } else {
                                                            navigate('/login', { state: { message: error.response.data.message } });
                                                        }
                                                    } else {
                                                        navigate('/login', { state: { message: error.message || "Network error." } });
                                                    }   
                                                } finally {
                                                    dispatch({ type: 'auth/clearLoading' });
                                                }
                                        }}}
                                        disabled={loading}
                                        >
                                        {(loading && deletingId === problem._id) ? <><Spinner /> Deleting...</> : "Delete"}
                                    </button>
                                </td>
                                
                            </tr>
                        ))}
                        {problems.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-4 font-gruppo text-3xl text-center text-red-500">
                                    No problems available at the moment.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )


}
export default AdminProblems; 