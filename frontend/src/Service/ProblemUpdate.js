import axios from 'axios';
const API_URL = import.meta.env.VITE_REACT_APP_URL_BACKEND;

axios.defaults.withCredentials = true; // Enable sending cookies with requests

export const updateProblem = async (id, updateProblem) => {
    try {
        const response = await axios.put(`${API_URL}/updateproblem/${id}`, updateProblem, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}