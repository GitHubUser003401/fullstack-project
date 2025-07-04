import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyAuth } from "../Service/LoginApi";

function AuthChecker() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        const checkAuth = async () => { 
                try {
                    const response = await verifyAuth();
                    if (response) {
                        dispatch({ type: 'auth/setAuthenticated', payload: { user: response.user } });
                    } else {
                        dispatch({ type: 'auth/clearAuth' });
                    }
                } catch (error) {
                    dispatch({ type: 'auth/clearAuth' });
                    console.error("Authentication check failed:", error);
            }
        };
        checkAuth();
    }, [dispatch]);
    return null;
}
export default AuthChecker;