import axios from 'axios';
const API_URL = import.meta.env.VITE_REACT_APP_URL_BACKEND;

axios.defaults.withCredentials = true; // Enable sending cookies with requests

export const fetchProblems = async () => {
    try {
        const response = await axios.get(`${API_URL}/problemfetch`, {
            withCredentials: true, // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        let message, errorName;
        if (error.response) {
            if (typeof error.response.data === 'object' && error.response.data !== null) {
                message = error.response.data.message || JSON.stringify(error.response.data);
                errorName = error.response.data.error;
            }
            else {
                message = error.response.data;
            }
        } else {
            message = 'Network Error';
        }
        throw message;
    }
}