import react from 'react';
import { useEffect } from 'react';
import { getAnything } from '../service/api'; // Adjust the import path as necessary
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function AdminRouting({ children }) {
    const navigate = useNavigate();
    const [Loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const response = await getAnything();
                if (response.user && response.user.role === "Admin"){
                    setIsAdmin(true);
                }
            } catch (error) {
                if (error === 'TokenExpiredError' || error === 'Invalid token') {
                    navigate('/login', { state: { message: 'Session expired, please log in again.' } });
                }
            } finally {
                setLoading(false);
            }
        };
        checkAdminStatus();
    }, []);
    if (Loading) {
        return <div className="flex justify-center items-center h-screen font-tomorrow">Loading...</div>
    }
    if (!isAdmin) {
        return <div className="flex justify-center items-center h-screen font-tomorrow text-2xl text-red-600">You are not authorized to access this page.</div>
    }
    return children;
}
export default AdminRouting;