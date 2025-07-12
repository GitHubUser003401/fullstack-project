import axios from 'axios';
const API_URL = import.meta.env.VITE_REACT_APP_URL_BACKEND;
axios.defaults.withCredentials = true; // Enable sending cookies with requests
export const fetchTestCases = async (problemId) => {
    try {
        const response = await axios.get(`${API_URL}/testcases/${problemId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error;
    }
}