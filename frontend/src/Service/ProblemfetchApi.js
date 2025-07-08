import axios from 'axios';
const API_URL = import.meta.env.VITE_REACT_APP_URL_BACKEND;

axios.defaults.withCredentials = true; // Enable sending cookies with requests

export const fetchProblem = async () => {
    try {

    } catch (error) {
        
    }
}


export const getproblems = () => {
    return (
       [
            { title: "a" },
            { title: "b" },
            { title: "c" },
            { title: "d" },
            { title: "e" },
            { title: "f" },
            { title: "g" },
            { title: "h" },
            { title: "i" },
            { title: "j" },
            { title: "k" },
            { title: "l" },
            { title: "m" },
            { title: "n" },
            { title: "o" },
            { title: "p" },
            { title: "q" },
            { title: "r" },
            { title: "s" },
            { title: "t" },
            { title: "u" },
            { title: "v" },
            { title: "w" },
            { title: "x" },
            { title: "y" },
            { title: "z" }
        ])
}