import react from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
function ConfirmBox({ className }) {
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message;
    const user = location.state?.user;
    return (
        <div className={className}>
            <div className="w-1/3 h-screen shadow-xl shadow-orange-600 animated-gradient grid grid-rows-5 text-clip">
                {message && <p className="text-sky-600 animated-entry font-bold text-2xl mt-[150px]">{message}</p>}
                {user && (
                    <div className="text-sky-600 animated-entry text-xl mt-[100px] space-y-1">
                        <h2 className="text-lg font-semibold">User Details:</h2>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone Number: {user.Phone_Number}</p>
                        <p>Age: {user.Age}</p>
                        <p>Role: {user.Role}</p>
                    </div>
                )}{user && <button className="row-start-5 antialiased font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100 "
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