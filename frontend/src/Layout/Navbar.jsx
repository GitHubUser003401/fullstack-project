import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Service/LoginApi";


function Navbar({ className }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = async () => {
        try {
            const response = await logoutUser()
            dispatch({type: 'auth/logout'});
        } catch (error) {
            const message = error.response ? error.response.data : 'Network Error';
            console.error(message);
            // Optionally, you can show an error message to the user
            alert("Logout failed: " + message);
        }
    }

    return (
        <>
            <nav>
                <div className={className}>
                    <div className="w-full h-14 bg-gradient-to-br from-[#222426] via-[#646363] to-[#1a1a1a] flex items-center gap-20 ">
                        <div>
                            <h1 className="font-imperialscript animated-entry text-5xl bg-gradient-to-br from-[#4671ff] via-[#11eff7] to-[#ffffff] bg-clip-text text-transparent ">
                                Codelite
                            </h1>
                        </div>
                        <div className="flex items-center gap-8">
                            <button className="w-28 text-xl font-bold font-gruppo h-9 animated-entry hover:underline"
                                onClick={() => navigate('/dashboard')}>
                                Dashboard
                            </button>
                            <button className="w-28 text-xl font-bold font-gruppo h-9 animated-entry hover:underline"
                                onClick = {handleLogout}>
                                Log-Out
                            </button>
                            <button className="w-32 text-xl font-bold font-gruppo h-9 animated-entry hover:underline"
                                onClick={() => navigate('/dashboard/adminspace')}>
                                Admin Space
                            </button>
                        </div>
                        <div className="flex items-center gap-6 ml-auto animated-entry mr-[10px]">
                            <h1 className="text-xl font-bold font-gruppo hover:underline">
                                Signed in as: {user.username}
                            </h1>
                            <a href="/dashboard/profile">
                                <img src="/pexels-alex-montes-892479-1820563.jpg"
                                    className="custom-shadow w-12 h-12 rounded-full animated-entry transition delay-100 duration-500 hover:scale-115 "
                                    alt="Profile"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </>

    )
}
export default Navbar;