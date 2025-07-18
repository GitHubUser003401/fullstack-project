import { useState } from "react";
import { resetPassword } from "../Service/ResetPasswordApi";
import { useDispatch, useSelector } from "react-redux";

function ResetBox({ className }) {
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const loading = useSelector((state) => state.auth.loading);
    const dispatch = useDispatch();

    const PasswordConfirmation = async () => {
        if (!password || password.length < 6 || password.length > 32) {
            setMessage("Password must be between 6 and 32 characters.");
            return;
        }
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (!token) {
            setMessage("No reset token provided.");
            return;
        }
        if (loading) return;
        dispatch({ type: 'auth/setloading' });
        try {
            const response = await resetPassword(token, password);
            setMessage(response.message || "Password reset successfully.");
            // Optionally redirect or clear the form after successful reset
        } catch (error) {
            setMessage(error.message || "An error occurred while resetting the password.");
        } finally {
            dispatch({ type: 'auth/clearLoading' });
            setPassword(""); // Clear the password field after submission
        }
    }


    return (
        <div className={className + " w-full h-screen items-center flex justify-center"}>
            <div className="w-[500px] h-[300px] bg-amber-500/20 backdrop-blur-xs rounded-lg ">
                <h1 className="text-center text-2xl font-newsreader font-bold text-amber-800 p-4">
                    Enter your New Password - ( Password should be between 6 and 32 characters )
                </h1>
                <div className=" w-full flex flex-col items-center">
                    <label className='font-newsreader'>Password</label>
                    <input type="password" placeholder='Password' className="p-2 focus:outline-none focus:ring-2 placeholder-black bg-gray-300 rounded-full truncate w-64 h-8 transition delay-50 duration-500 hover:scale-105 hover:translate-y-1" value={password} onChange={e => setPassword(e.target.value)} required />
                    <button className="mt-[100px] bg-gradient-to-r from-red-500 font-gruppo to-red-700 text-blue-400 font-bold py-2 px-4 rounded-full hover:scale-115 transition duration-400"
                        onClick={PasswordConfirmation}
                        disabled={loading}>
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                    {message && (
                        <div className=" animated-entry mt-4 w-full text-center text-red-600">
                            {typeof message === "string" ? message : message?.message || "An error occurred"}
                        </div>
                    )}
                </div>

            </div>
        </div>

    )
}

export default ResetBox;