import axios from 'axios';
const API_URL = import.meta.env.VITE_REACT_APP_URL_BACKEND;

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        const message = error.response ? error.response.data : 'Network Error';
        console.error(error);
        throw message;

    }
}
export const LoginUser = async (userdata) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userdata);
        return response.data;
    } catch (error) {
        const message = error.response ? error.response.data : 'Network Error';
        throw message;
    }
}
export const getAnything = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/anything`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        let message, errorName;
        if(error.response){
            if (typeof error.response.data === 'object' && error.response.data !==null){
                message = error.response.data.message || JSON.stringify(error.response.data);
                errorName = error.response.data.error;
            }
             else {
                message = error.response.data;
            }
        } else {
            message = 'Network Error';
        }
        if (errorName === 'TokenExpiredError' || message === 'Invalid token') {
            localStorage.removeItem('token');
            throw errorName || message;
        }
        throw message;
    }
}

export const getProblems = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/problemLists`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        let message, errorName;
        if(error.response){
            if (typeof error.response.data === 'object' && error.response.data !==null){
                message = error.response.data.message || JSON.stringify(error.response.data);
                errorName = error.response.data.error;
            }
             else {
                message = error.response.data;
            }
        } else {
            message = 'Network Error';
        }
        if (errorName === 'TokenExpiredError' || message === 'Invalid token') {
            localStorage.removeItem('token');
            throw errorName || message;
        }
        throw message;
    }
}

export const createProblems = async (problemData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/createProblem`, problemData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        let message, errorName;
        if(error.response){
            if (typeof error.response.data === 'object' && error.response.data !==null){
                message = error.response.data.message || JSON.stringify(error.response.data);
                errorName = error.response.data.error;
            }
             else {
                message = error.response.data;
            }
        } else {
            message = 'Network Error';
        }
        if (errorName === 'TokenExpiredError' || message === 'Invalid token') {
            localStorage.removeItem('token');
            throw errorName || message;
        }
        throw message;
    }
}