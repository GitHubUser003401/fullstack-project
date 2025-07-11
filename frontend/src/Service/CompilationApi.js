import axios from 'axios';
const COMPILER_URL = import.meta.env.VITE_REACT_APP_URL_COMPILER;

export const compileCode = async (language, code, input) => {
    try {
        const response = await axios.post(`${COMPILER_URL}/compile`, {
            language,
            code,
            input
        }, {
            withCredentials: true // Include cookies in the request
        });
        return response.data;
    } catch (error) {
        throw error
    }
};