import axios from 'axios';
const API_URL = import.meta.env.VITE_REACT_APP_URL_BACKEND;

axios.defaults.withCredentials = true; // Enable sending cookies with requests


export const createProblem = async (problemData) => {
    try {
        const response = await axios.post(`${API_URL}/createproblem`, problemData, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
