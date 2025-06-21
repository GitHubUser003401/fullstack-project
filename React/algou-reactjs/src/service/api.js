import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_URL_BACKEND;

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return (response.data);
    } catch (error) {
        const message = error.response ? error.response.data : 'Network Error';
        throw message;
    }
}