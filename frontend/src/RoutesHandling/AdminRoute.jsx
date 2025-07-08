import { useSelector } from "react-redux";

function AdminRoute({ children }) {
    const Role = useSelector((state) => state.auth.user?.Role);
    if (Role !== "Admin") {
        return (
            <div className="relative w-full flex flex-col justify-center min-h-screen overflow-hidden shiny-bg bg-gradient-to-bl from-[#222426] via-[#777676] to-[#1a1a1a]  ">
                <h1 className="text-4xl font-unna text-center text-red-600 font-bold animated-entry">
                  You do not have permission to access this page. Please log in as an Admin.
                </h1>
                </div>
        )
    }
    return children;
}

export default AdminRoute;