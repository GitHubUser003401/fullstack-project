import axios from "axios";
const API_URL = import.meta.env.VITE_REACT_APP_URL_BACKEND;

export const resetPassword = async (token, password) => {
    try {
        const response = await axios.post(`${API_URL}/resetpassword?token=${token}`, { password });
        return response.data;
    } catch (error) {
        const errorMsg = 
            error?.response?.data?.message || 
            (typeof error?.response?.data === "string" ? error.response.data : null) || 
            error?.message || 
            "An error occurred.";
        throw new Error(errorMsg);
    }
}
