import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Navbar({className}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'auth/logOut' });
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <>
        <nav>
            <div className = {className}>
            <div className = "w-full bg-gradient-to-br grid from-slate-900 from-[0%] via-slate-500 via-[70%] to-slate-800 h-28">
                <div className = "flex justify-between">
                <h1 className = "text-5xl bg-gradient-to-r animated-entry font-gruppo tracking-wider from-[#e3e3e38a] via-[#cdcdcd] to-[#757575] bg-clip-text text-transparent mt-[10px] ml-[40px]">
                    Codelite
                </h1>
                <a href = "/profile">
                    <img src = "/pexels-alex-montes-892479-1820563.jpg"
                    className = "custom-shadow w-12 h-12 rounded-full animated-entry transition delay-100 duration-500 hover:scale-125 mt-[10px] mr-[10px]"
                    alt = "Profile"
                    />
                </a>

                </div>
                <div className = "border-t-2 border-t-slate-100 w-full bg-black flex mt-[10px]">
                    <button className="w-44 font-serif h-9 bg-slate-400 border-[#551515] border-r-4 hover:text-xl ">
                        Home
                    </button>
                    <button className="w-44 font-serif h-9 bg-slate-400 border-[#551515] border-r-4 hover:text-xl ">
                        ######
                    </button>
                    <button className="w-44 font-serif h-9 bg-slate-400 border-[#551515] border-r-4 hover:text-xl ">
                        #####
                    </button>
                    <button className="w-44 font-serif h-9 bg-slate-400 border-[#551515] border-r-4 hover:text-xl "
                    onClick={handleLogout}>
                        Log-Out
                    </button>
                </div>
            </div>
            </div>
        </nav>
        </>
        
    )
}
export default Navbar;