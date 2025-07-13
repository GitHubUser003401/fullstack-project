import axios from 'axios';
const API_URL = import.meta.env.VITE_REACT_APP_URL_BACKEND;

axios.defaults.withCredentials = true; // Enable sending cookies with requests

export const submitCode = async (problemId, code, language) => {
    try {
        const response = await axios.post(`${API_URL}/submission`, {
            problemId,
            code,
            language
        }, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
