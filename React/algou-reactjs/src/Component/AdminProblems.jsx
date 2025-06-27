import react, { useEffect, useState } from 'react';
import { deleteProblem, getAdminProblems } from '../service/api';
import { useNavigate } from 'react-router-dom';

function AdminProblems({ className }) {
    const navigate = useNavigate();
    const [problems, setProblems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAdminProblems();
                setProblems(response.adminProblems || []);
            } catch (error) {
                if (error === 'TokenExpiredError') {
                    navigate('/login', { state: { message: 'Session expired, please log in again.' } });
                } else if (error === 'Invalid token') {
                    navigate('/login', { state: { message: 'Invalid token, please log in again.' } });
                } else {
                    navigate('/login', { state: { message: error } });
                }
            }
        };
        fetchData();
    }, [navigate]);

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
                        {problems.map((problem, idx) => (
                            <tr key={problem._id || idx} className="hover:bg-cyan-800 transition duration-300">
                                <td className="border border-gray-500 py-2 px-6 text-orange-600 text-center">{problem.title}</td>
                                <td className="border border-gray-500 py-2 px-6 text-orange-600 text-center">{problem.difficulty}</td>
                                <td className="border border-gray-500 py-2 px-6 text-orange-600 text-center">
                                    {problem.createdAt && new Date(problem.createdAt).toLocaleDateString()}
                                </td>
                                <td className="border border-gray-500 py-2 px-6 text-center flex gap-5">
                                    <button className="antialiased font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg row-start-6 rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                                        onClick={() => navigate(`/edit-problem/${problem._id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button className="antialiased font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg row-start-6 rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                                    >
                                        View
                                    </button>
                                    <button className="antialiased font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg row-start-6 rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                                        onClick={async () => {
                                            const confirmed = window.confirm("Are you sure you want to delete this problem?");
                                            if (confirmed) {
                                                try {
                                                    const response = await deleteProblem(problem._id);
                                                    setProblems(problems.filter(p => p._id !== problem._id));
                                                    navigate('/ProblemConfirmation', { state: { message: response.message, problem: response.problem } });
                                                } catch (error) {
                                                    if (error === 'TokenExpiredError') {
                                                        navigate('/login', { state: { message: 'Session expired, please log in again.' } });
                                                    } else if (error === 'Invalid token') {
                                                        navigate('/login', { state: { message: 'Invalid token, please log in again.' } });
                                                    } else {
                                                        navigate('/ProblemConfirmation', { state: { message: error } });
                                                    }
                                                }
                                            }
                                        }}>
                                        Delete
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
export default AdminProblems