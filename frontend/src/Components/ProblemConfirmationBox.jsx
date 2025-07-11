import { useLocation, useNavigate } from 'react-router-dom';

function ConfirmProblemBox({ className }) {
    const navigate = useNavigate();
    const location = useLocation();
    let message = location.state?.message;
    const problem = location.state?.problem;
    if (typeof message === 'object') {
        message = message?.message || message.toString();
    }
    
    return (
        <div className={className + "w-full min-h-screen flex justify-center"}>
            <div className="mt-[100px] w-2/3 mb-[50px] min-h-screen bg-gradient-to-br space-y-9 from-[#e6b93e] via-[#bebcb0] to-[#e6b93e] bordering flex flex-col items-center">
                {message && <p className="text-teal-700 animated-entry font-tomorrow text-2xl mt-[50px]">
                    {message}
                </p>}
                {problem && <div className="text-teal-700 animated-entry font-tomorrow text-xl mt-[30px] space-y-3">
                    <h1 className="text-lg font-semibold break-all whitespace-pre-wrap">Problem Details: </h1>
                    <p className='break-all whitespace-pre-wrap  '>Title: {problem.title}</p>
                    <p className='break-all whitespace-pre-wrap  '>Description: {problem.description}</p>
                    <p className='break-all whitespace-pre-wrap  '>Sample Input: {problem.SampleInput.join(', ')}</p>
                    <p className='break-all whitespace-pre-wrap  '>Sample Output: {problem.SampleOutput.join(', ')}</p>
                    <p className='break-all whitespace-pre-wrap  '>Constraints: {problem.constraints.join(', ')}</p>
                    <p className='break-all whitespace-pre-wrap  '>Tags: {problem.tags.join(', ')}</p>
                    <p className='break-all whitespace-pre-wrap  '>Difficulty: {problem.difficulty}</p>
                    <p className='break-all whitespace-pre-wrap  '>Created By: {problem.createdBy}</p>
                    <p className='break-all whitespace-pre-wrap  '>Created At: {problem.createdAt && new Date(problem.createdAt).toLocaleDateString()}</p>
                </div>}
                <button className="mt-[50px] antialiased font-normal italic text-indigo-700 font-serif text-lg mb-[20px] w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                    onClick={() => navigate('/dashboard/adminspace')}>
                    Back to Home
                </button>
            </div>
        </div>
    )
}
export default ConfirmProblemBox;