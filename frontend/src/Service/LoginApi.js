import axios from 'axios';
const API_URL = import.meta.env.VITE_REACT_APP_URL_BACKEND;

axios.defaults.withCredentials = true; // Enable sending cookies with requests

export const loginUser = async (userdata) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userdata, {
            withCredentials: true // Ensure cookies are sent with the request
        })
        return response.data;
    } catch (error) {
        const message = error.response ? error.response.data : 'Network Error';
        throw message;
    }
}

export const logoutUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/logout`, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        const message = error.response ? error.response.data : 'Network Error';
        throw message;
    }
}
