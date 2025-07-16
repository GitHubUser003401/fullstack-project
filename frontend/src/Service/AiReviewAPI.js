import axios from 'axios';
const COMPILER_URL = import.meta.env.VITE_REACT_APP_URL_COMPILER;

axios.defaults.withCredentials = true; // Include cookies in the request


export const ReviewCode = async (code, description) => {
    try {
        const response = await axios.post(`${COMPILER_URL}/ai-review`, {
            code,
            description
        }, {
            withCredentials: true // Include cookies in the request
            });
        return response.data;
    } catch (error) {
        throw error;
    }
}