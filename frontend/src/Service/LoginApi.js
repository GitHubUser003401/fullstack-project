import axios from 'axios';
const API_URL = import.meta.env.VITE_REACT_APP_URL_BACKEND;

export const LoginUser = async (userdata) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userdata);
        return response.data;
    } catch (error) {
        const message = error.response ? error.response.data : 'Network Error';
        throw message;
    }
}