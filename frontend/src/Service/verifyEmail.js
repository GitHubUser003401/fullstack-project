import axios from "axios";
const API_URL = import.meta.env.VITE_REACT_APP_URL_BACKEND;

export const verifyEmailCode = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/verify-email?token=${token}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
