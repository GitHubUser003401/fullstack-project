import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin } from "../Service/CreateAdmin";
import Spinner from "./Spinner";

function AdminReferralBox({ className, setDialogOpen, setDialogMessage, setOnDialogConfirm }) {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");

    const handleReferral = async () => {
        if (!email) {
            setDialogMessage("Please enter an email address.");
            setDialogOpen(true);
            setOnDialogConfirm(() => () => {});
            return;
        }
        setDialogMessage("Are you sure you want to refer this user as admin?")
        setDialogOpen(true);
        setOnDialogConfirm(() => async () => {
            if (loading) return;
            dispatch({ type: 'auth/setloading' });
            try {
                const response = await addAdmin(email);
                setMessage(response.message);
                setEmail("");
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401 || error.response.status === 403) {
                        // Handle unauthorized access
                        location.state = { message: error.response.data.message }
                        dispatch({ type: 'auth/logout' });
                        console.error("Unauthorized access:", error.response.data);
                        navigate('/login', { state: { message: error.response.data.message } });
                    } else {
                        setMessage(typeof error.response.data === 'object' ? error.response.data?.message || error.response.data?.error : error.response.data);
                        console.error("Error response:", error.response.data);
                    }
                } else {
                    setMessage("An unexpected error occurred. Please try again later.");
                    console.error("Error:", error);
                }
            } finally {
                dispatch({ type: 'auth/clearLoading' });
            }
        });
    }

    return (
        <div className={className + " w-[1000px] mt-11 mb-11 bg-radial-[at_25%_50%] from-sky-300 via-blue-500 to-indigo-700 to-80% p-4 min-h-[400px] flow-shadow bordering"}>
            <img className="float-right w-[200px] h-[200px] flip-3d-y" src="/professional.png" />
            <h1 className="text-4xl font-newsreader tracking-tighter text-center underline decoration-indigo-600 underline-offset-4 pt-4 bg-gradient-to-r from-[#ff0808] from-0% via-[#bdbdbd] via-40% to-[#00a3d5] bg-clip-text text-transparent">Admin Referral</h1>
            <p className="text-xl font-newsreader mt-5 text-amber-800">
                If you are an admin, you can refer other users to become admins. Please ensure that the email you provide is valid and that the user is aware of their referral.
                <br />
                As an admin, you can nominate other users to join the admin team. Please use this responsibility wisely and refer only those individuals whom you trust and who demonstrate expertise and commitment to our platform’s values.
                <br />
                <br />
                <span className="text-lg font-tomorrow italic text-red-700">Note: Referrals should be made with care, as admin privileges are critical to maintaining the quality and security of our community. After the referral, User must login again as an admin.</span>
            </p>
            <div className="flex flex-col w-full h-fit items-center mt-12">
                <label className='font-newsreader mb-2 text-xl text-amber-700'>Email: </label>
                <input type="email" placeholder='Email' className="p-1 focus:outline-none focus:ring-2 placeholder-black bg-gray-300 rounded-full truncate w-[300px] h-8 transition delay-50 duration-500 hover:scale-105 hover:translate-y-1" value={email} onChange={e => setEmail(e.target.value)} />

                <button className="antialiased font-normal italic text-indigo-700 font-serif text-lg w-60 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100 mt-6"
                    onClick={handleReferral}
                    disabled={loading}>
                    {loading ? "Processing..." : "Refer Admin"}
                </button>
                <div className="w-fit h-fit mb-[20px]">
                    {loading && <Spinner />}
                </div>
                {message && <p className="text-lg font-tomorrow text-red-600 mt-4">{message}</p>}
            </div>
        </div>
    )
}

export default AdminReferralBox;