import { useLocation, useNavigate } from "react-router-dom";

function SubmissionConfirmationBox({ className }) {
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message;
    const verdict = location.state?.verdict;
    return (
        <div className={className + " text-center"}>
            {message && (
                <p className="text-red-800 animated-entry font-tomorrow text-2xl mt-[10px]">
                    {typeof message === "string"
                    ? message
                    : message?.message || "An error occurred"}
                    </p>
            )}
            {verdict && (
                <div className="text-emerald-500 animated-entry font-tomorrow text-lg mt-[30px] space-y-3">
                    <h2 className="text-lg font-semibold">Submission Verdict:</h2>
                    <p className="break-all whitespace-pre-wrap">Verdict: {verdict.verdict}</p>
                    <p className="break-all whitespace-pre-wrap">Output: {verdict.output}</p>
                    <p className="break-all whitespace-pre-wrap">Test Cases Passed: {verdict.testCasesPassed}</p>
                    <p className="break-all whitespace-pre-wrap">Execution Time: {verdict.executionTime} ms</p>
                    <p className="break-all whitespace-pre-wrap">Memory Used: {verdict.memoryUsed} KB</p>
                </div>)}
                <button className="cursor-pointer mt-[20px] antialiased font-normal italic text-indigo-700 font-serif text-lg mb-[20px] w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                    onClick={() => navigate('/dashboard')}>
                    Back to Home
                </button>
        </div>
    )
}
export default SubmissionConfirmationBox