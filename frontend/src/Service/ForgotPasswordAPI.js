import axios from 'axios';
const API_URL = import.meta.env.VITE_REACT_APP_URL_BACKEND;

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/forgotpassword`, { email });
        return response.data;
    } catch (error) {
        throw error;
    }
}