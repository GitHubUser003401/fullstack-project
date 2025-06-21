import react from 'react';
import { useLocation } from 'react-router-dom';
function ConfirmBox({ className }) {
    const location = useLocation();
    const message = location.state?.message;
    const user = location.state?.user;
    return (
        <div className={className}>
            <div className="w-1/3 h-screen mr-[100px] shadow-xl shadow-orange-600 animated-gradient grid grid-rows-5 place-items-center text-clip">
                {message && <p className="text-green-600 mb-4">{message}</p>}
                {user && (
                    <div>
                        <h2 className="text-lg font-semibold">User Details:</h2>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone Number: {user.Phone_Number}</p>
                        <p>Age: {user.Age}</p>
                        <p>Role: {user.Role}</p>
                    </div>
                )}
            </div>
        </div>
    );

}
export default ConfirmBox;