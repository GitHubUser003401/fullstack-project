import react from 'react';
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');
    if (!token) {
        return (
        <div className="absolute text-red-600 font-semibold text-2xl animated-entry flex justify-center items-center w-full h-screen ">
            You need to log in to access this page.
            </div>
        );
    }
    return children;
}
export default ProtectedRoute;