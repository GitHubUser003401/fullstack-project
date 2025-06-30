import react from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserProblemById } from '../service/api';
import { useState } from 'react';

function ProblemBox({ className }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [problem, setProblem] = useState({
        title: "",
        description: "",
        constraints: [],
        SampleInput: [],
        SampleOutput: []
    });
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await UserProblemById(id);
                setProblem({
                    title: response.title,
                    description: response.description,
                    constraints: response.constraints || [],
                    SampleInput: response.SampleInput || [],
                    SampleOutput: response.SampleOutput || []
                });
            } catch (error) {
                if (error === 'TokenExpiredError') {
                    navigate('/login', { state: { message: 'Session expired, please log in again.' } });
                } else if (error === 'Invalid token') {
                    navigate('/login', { state: { message: 'Invalid token, please log in again.' } });
                } else {
                    setError(error);
                }
            }
        }
        fetchProblem();
    }, [id, navigate]);

    return (
        <div className={className + " animated-entry w-1/2 bg-slate-400 overflow-y-scroll h-screen mt-2 mb-2 ml-2 bordering p-10"}>

            <h1 className="text-3xl font-newsreader bg-gradient-to-r from-purple-500 via-fuchsia-800 bg-clip-text text-transparent">
                {problem.title || "Problem Title Not Found"}
            </h1>
            <p className="text-lg mt-5 text-indigo-950">
                {problem.description || "Problem Description Not Found"}
            </p>
            <h2 className="text-3xl mt-10 font-newsreader bg-gradient-to-r from-purple-500 via-fuchsia-800 bg-clip-text text-transparent">
                Constraints
            </h2>
                <ul className="list-disc text-red-800 pl-5">
                    {problem.constraints.map((constraint, idx) => (
                        <li key={idx} className="text-lg">
                            {constraint}
                        </li>)
                    )}
                    {problem.constraints.length === 0 && (
                        <li className="text-lg">No constraints provided</li>
                    )}
                </ul>
            <div className="mt-4">
                <table className = " border-collapse border border-slate-800 table-fixed w-full mt-10 bg-black">
                    <thead>
                        <tr className = "bg-slate-600 text-slate-300 font-newsreader" >
                            <th className="border text-lg w-1/2">Sample Input</th>
                            <th className="border text-lg w-1/2">Sample Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problem.SampleInput.map((input, idx) => (
                            <tr key={idx}>
                                <td className="border text-red-800 font-bold text-lg">{input}</td>
                                <td className="border text-red-800 font-bold text-lg">{problem.SampleOutput[idx]}</td>
                            </tr>
                        ))}
                        {problem.SampleInput.length === 0 && (
                            <tr>
                                <td className="border text-red-800 font-bold text-lg">No sample input provided</td>
                                <td className="border text-red-800 font-bold text-lg">No sample output provided</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <h1 className = "text-2xl font-gruppo text-red-500 mt-4">
                {error && (typeof error === 'string' ? error : error?.message || "An error occurred")}
            </h1>
        </div>
    )
}
export default ProblemBox;