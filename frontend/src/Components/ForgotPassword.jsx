import { useState } from "react";
import { forgotPassword } from "../Service/ForgotPasswordAPI";
import { useDispatch, useSelector } from "react-redux";

function ForgotPasswordBox({ className }) {
    const [message, setMessage] = useState();
    const [Email, setEmail] = useState("");
    const loading = useSelector((state) => state.auth.loading);
    const dispatch = useDispatch();

    const handleResetPassword = async () => {
        if (!Email) {
            setMessage("Please enter your email");
            return;
        }
        if (loading) return;
        dispatch({ type: 'auth/setloading' });
        try {
            const response = await forgotPassword(Email);
            setMessage(response.message || "Reset link sent to your email");
        } catch (error) {
            if (error.response) {
                setMessage(typeof error.response.data === 'object' ? error.response.data?.message || error.response.data?.error : error.response.data);
                console.error("Error sending reset link:", error.response.data);
            } else {
                setMessage(error.message || "Network error.");
                console.error("Network error:", error);
            }
        } finally {
            dispatch({ type: 'auth/clearLoading' });
        }
        
    } 

    return (
        <div className={className + " w-full h-screen items-center flex justify-center"}>
            <div className="w-[500px] min-h-[300px] bg-amber-500/20 backdrop-blur-xs rounded-lg">
                <h1 className="text-center text-2xl font-newsreader font-bold text-amber-800 p-4">
                    Enter your email to reset your password
                </h1>
                <div className=" w-full flex flex-col items-center">
                    <label className='font-newsreader'>Email</label>
                    <input type="email" placeholder='Email' className="p-2 focus:outline-none focus:ring-2 placeholder-black bg-gray-300 rounded-full truncate w-64 h-8 transition delay-50 duration-500 hover:scale-105 hover:translate-y-1" value={Email} onChange={e => setEmail(e.target.value)} required />
                    <button className="cursor-pointer mt-[100px] bg-gradient-to-r from-red-500 font-gruppo to-red-700 text-blue-400 font-bold py-2 px-4 rounded-full hover:scale-115 transition duration-400"
                    onClick={handleResetPassword}
                    disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
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
export default ForgotPasswordBox;