import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditorBox from "./EditorBox";


function ProblemBox({ className }) {
    const location = useLocation();
    const problem = location.state?.problem;
    const dispatch = useDispatch();
    const currentProblem = useSelector((state) => state.problem.currentProblem);
    const navigate = useNavigate();

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
            <div className="w-7/8 flex text-center justify-center flow-shadow break-all whitespace-pre-wrap mt-[30px] h-fit bg-gradient-to-br from-[#e6b93e] via-[#bebcb0] to-[#e6b93e] rounded-3xl">
                <h1 className="max-w-full min-w-fit text-2xl font-newsreader bg-gradient-to-r from-[#0399d5] via-[#2b04d9] to-[#008fa8] bg-clip-text text-transparent">
                    {currentProblem ? currentProblem.title : problem ? problem.title : "Problem Title Not Available"}
                </h1>
            </div>
            <div className='mt-[15px] flex w-full min-h-screen'>
                <div className=" flow-shadow w-1/2 rounded-xl bg-gradient-to-br from-[#e6b93e] via-[#bebcb0] to-[#e6b93e] m-2">
                    <div className="w-full p-4 h-fit break-all">
                        <h2 className="text-xl font-semibold font-newsreader">Problem Description:</h2>
                        <p className=" break-all mt-2 whitespace-pre-wrap">
                            {currentProblem ? currentProblem.description : problem ? problem.description : "No description available."}
                        </p>
                    </div>
                    <div className="w-full p-4 h-fit break-all">
                        <h2 className="text-xl mt-10 font-newsreader ">
                            Constraints:
                        </h2>
                        <ul className="list-disc text-red-800 pl-5">
                            {currentProblem.constraints.map((constraint, idx) => (
                                <li key={idx} className="text-lg font-newsreader break-all whitespace-pre-wrap">
                                    {constraint}
                                </li>)
                            )}
                            {currentProblem.constraints.length === 0 && (
                                <li className="text-lg font-newsreader">No constraints provided</li>
                            )}
                        </ul>
                    </div>
                    <div className=" overflow-x-auto mt-4">
                        <table className=" border-collapse border border-slate-800 table-fixed min-w-full mt-10 bg-black">
                            <thead>
                                <tr className="bg-slate-600 text-blue-500 font-newsreader" >
                                    <th className="border border-amber-100 text-lg w-1/2 ">Sample Input</th>
                                    <th className="border border-amber-100 text-lg w-1/2">Sample Output</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {currentProblem.SampleInput.map((input, idx) => (
                                    <tr key={idx}>
                                        <td className="border border-amber-100 text-red-800 min-w-fit font-newsreader font-bold text-lg">{input}</td>
                                        <td className="border border-amber-100 text-red-800 min-w-fit font-newsreader font-bold text-lg">{currentProblem.SampleOutput[idx]}</td>
                                    </tr>
                                ))}
                                {currentProblem.SampleInput.length === 0 && (
                                    <tr>
                                        <td className="border border-amber-100 text-red-800 min-w-fit font-newsreader font-bold text-lg">No sample input provided</td>
                                        <td className="border border-amber-100 text-red-800 min-w-fit font-newsreader font-bold text-lg">No sample output provided</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className=" flow-shadow w-1/2 rounded-xl bg-gradient-to-br from-[#e6b93e] via-[#bebcb0] to-[#e6b93e] m-2">
                    <EditorBox />
                </div>
            </div>
        </div>
    )
}
export default ProblemBox;