import react, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProblems } from '../service/api';

function ProblemForm({className}){
    const navigate = useNavigate();
    const [Error, setError] = useState("");
    const [Problems , setProblems] = useState({
        title: "",
        description: "",
        SampleInput: "",
        SampleOutput: "",
        constraints: "",
        tags: [],
        difficulty: "",
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createProblems(Problems);
            navigate('/ProblemConfirmation', {state: { message: response.message, problem: response.problem }});
        } catch (error) {
            if (error === 'TokenExpiredError') {
                navigate('/login', { state: { message: 'Session expired, please log in again.' }});
            } else if (error === 'Invalid token') {
                navigate('/login', { state: { message: 'Invalid token, please log in again.' }});
            } else {
                setError(error);
            }
    }
}

    return (
        <div className = {className + "w-full min-h-screen"}>
            <form>

            </form>
        </div>
    )
}
export default ProblemForm;