import react from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProblems } from '../service/api';

function ProblemSet({ className }) {
    const navigate = useNavigate();
    const [problems, setProblems] = useState([]);
    useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await getProblems();
                    setProblems(response.problemlist || []);
                } catch (error) {
                    if (error === 'TokenExpiredError') {
                        navigate('/login', { state: { message: 'Session expired, please log in again.' }});
                    } else if (error === 'Invalid token') {
                        navigate('/login', { state: { message: 'Invalid token, please log in again.' }});
                    } else {
                        navigate('/login', { state: { message: error }});
                    }
                }
        };
        fetchData();
    }, [navigate]);


    return (
        <div className = {className + " animated-entry min-h-screen"}>
            <h1 className = "text-2xl h-16 flex items-end font-semibold">
                <span className = "bg-gradient-to-r from-[#b438ee] via-[#d21396] to-[#d5d4d4] w-2/3 font-light font-newsreader ">Here is the Problem Sets Section</span>
            </h1>
            <div className = "overflow-x-auto mt-6">
                <table className = "min-w-full bg-black ">
                    <thead className = "bg-gray-600 text-white font-newsreader">
                        <tr>
                            <th className = "py-2 px-10">Title</th>
                            <th className = "py-2 px-10 ">Difficulty</th>
                            <th className = "py-2 px-10 ">Tag</th>
                            <th className = "py-2 px-10 ">Created By</th>
                            <th className = "py-2 px-10 ">Created At</th>
                        </tr>
                    </thead>
                    <tbody className = "divide-y divide-gray-500">
                        {problems.map((problem, idx) => (
                            <tr key={problem._id || idx} className="hover:bg-gray-600 transition duration-300">
                                <td className="py-2 px-10 text-orange-600">{problem.title}</td>
                                <td className="py-2 px-10 text-orange-600">{problem.difficulty}</td>
                                <td className="py-2 px-10 text-orange-600">
                                    {problem.tags && problem.tags.join(', ')}
                                </td>
                                <td className="py-2 px-10 text-orange-600">{problem.createdBy}</td>
                                <td className="py-2 px-10 text-orange-600">
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
        </div>
    )
}
export default ProblemSet;