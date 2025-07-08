import { useLocation, useNavigate } from 'react-router-dom';
function ConfirmBox({ className }) {
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message;
    const user = location.state?.user;
    return (
        <div className={className}>
            <div className="w-1/3 h-screen shadow-xl shadow-orange-600 animated-gradient flex flex-col text-clip">
                {message && <p className="text-red-800 animated-entry font-tomorrow text-2xl mt-[150px]">
                        {typeof message === "string"
                            ? message
                            : message?.message || "An error occurred"}
                    </p>}
                {!user && <button className= "antialiased font-normal mt-[20px] italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100 row-start-4"
            onClick={() => navigate('/register')}
          >
            Sign-Up
          </button>}
                {user && (
                    <div className="text-teal-700 animated-entry font-tomorrow text-xl mt-[30px] space-y-3">
                        <h2 className="text-lg font-semibold">User Details:</h2>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone Number: {user.Phone_Number}</p>
                        <p>Age: {user.Age}</p>
                        <p>Role: {user.Role}</p>
                    </div>
                )}{user && <button className="antialiased font-normal mt-[20px] italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100 "
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>
                }

            </div>
        </div>
    );
}
export default ConfirmBox;