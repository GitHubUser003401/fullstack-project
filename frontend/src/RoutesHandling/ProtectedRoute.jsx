import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Only set a default message if none exists
    const state = location.state || { message: "Please login to continue." };
    console.log(state)
    return <Navigate to="/login" state={state} />;
  }
  return children;
};
export default ProtectedRoute;