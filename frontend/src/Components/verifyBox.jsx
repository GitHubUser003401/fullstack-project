import { useEffect } from "react";
import { useState } from "react";
import { verifyEmailCode } from "../Service/verifyEmail";
import { useRef } from "react";

function VerifyBox({ className }) {
    const [message, setMessage] = useState("");
    const hasVerified = useRef(false);

    useEffect(() => {
        if (hasVerified.current) return; // Prevent multiple verifications
        const verifyEmail = async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get("token");
            if (!token) {
                setMessage("No verification code provided.");
                return;
            }
            hasVerified.current = true; // Set flag to prevent re-verification
            try {
                const response = await verifyEmailCode(token);
                setMessage(response);
            } catch (err) {
                if (err.response && err.response.data) {
                    setMessage(typeof err.response.data === "string" ? err.response.data : err.response.data.message || "An error occurred during verification.");
                } else {
                    setMessage("Verification failed. Please try again later.");
                }
            }
        }
        verifyEmail()
    }, [])

    return (
        <div className={className + " w-full h-screen items-center flex justify-center"}>
            <div className="w-[500px] h-[300px] bg-amber-500/20 backdrop-blur-xs rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold font-baskervville text-red-700 ">{message}</span>
            </div>
        </div>
    )
}

export default VerifyBox;