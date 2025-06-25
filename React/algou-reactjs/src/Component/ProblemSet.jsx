import react from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProblemSet({ className }) {
    const navigate = useNavigate();
    const [data , setData] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAnything();
                setData(response);
            } catch (error) {
                if (error === 'TokenExpiredError') {
                    navigate('/login', { state: { message: 'Session expired, please log in again.' }});
                } else if (error === 'Invalid token') {
                    navigate('/login', { state: { message: 'Invalid token, please log in again.' }});
                } else{
                    navigate('/login', { state: { message: error }});
                }
            }
    };
    fetchData();
}, [navigate]);
    const [problems, setProblems] = useState([]);




    return (
        <div className = {className}>
            <h1 className = "text-lg h-16 flex items-end text-purple-700 font-semibold">
                <span className = "bg-teal-600 w-1/3">Here is the Problem Set Section</span>
            </h1>

        </div>
    )
}
export default ProblemSet;