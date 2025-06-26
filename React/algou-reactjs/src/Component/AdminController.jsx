import react from 'react';
import { useNavigate } from 'react-router-dom';

function AdminController({ className }) {
    const navigate = useNavigate();

    
    return (
        <div className={className + "animated-entry flex justify-center py-8"}>
            <div className = "w-4/5 h-32 bg-gradient-to-br from-[#4671ff] via-[#11eff7] to-[#ffffff] flex items-center justify-between bordering shadow-lg shadow-cyan-400">
            <h1 className = "text-4xl font-unna">
                Want to create a new problem set? (Admin Only)
            </h1>
            <button className = "w-44 h-12 mr-16 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
            onClick={() => navigate('/createproblemset')} >
                Create Problem Set
            </button>
            </div>
        </div>
    )

}
export default AdminController;