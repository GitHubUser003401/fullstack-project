import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createProblem } from "../Service/ProblemCreateApi";
import { updateProblem } from "../Service/ProblemUpdate";
import Spinner from "./Spinner";

function ProblemForm({ className }) {
    const { id } = useParams();
    const location = useLocation();
    const updateproblem = location.state?.problem;
    // If id is present, it means we are editing an existing problem
    const loading = useSelector((state) => state.auth.loading);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const update = useSelector((state) => state.problem.currentProblem);
    const user = useSelector((state) => state.auth.user);
    const [Problems, setProblems] = useState({
        title: "",
        description: "",
        SampleInput: [],
        SampleOutput: [],
        constraints: [],
        tags: [],
        difficulty: "",
        createdBy: `${user._id}|${user.username}`,
    });

    useEffect(() => {
        if (id) {
            const editData = updateproblem || update;
            if (editData) {
                if (updateproblem) {
                    dispatch({ type: 'problem/setCurrentProblem', payload: updateproblem });
                    // If we are editing a problem, set the form fields with the existing problem data
                }
                setProblems({
                    title: editData.title,
                    description: editData.description,
                    SampleInput: editData.SampleInput || [],
                    SampleOutput: editData.SampleOutput || [],
                    constraints: editData.constraints || [],
                    tags: editData.tags || [],
                    difficulty: editData.difficulty,
                    createdBy: `${user._id}|${user.username}`,
                });
            }
        }
    }, [id])

    const [Error, setError] = useState("");

    const [tagInput, setTagInput] = useState("");
    const [constraintsInput, setConstraintsInput] = useState("");
    const [newsampleInput, setNewSampleInput] = useState("");
    const [newsampleOutput, setNewSampleOutput] = useState("");

    const handleSampleInputKeyDown = (e) => {
        if (e.key === 'Enter' && newsampleInput.trim()) {
            e.preventDefault();
            if (!Problems.SampleInput.includes(newsampleInput.trim()))
                setProblems(prev => ({
                    ...prev,
                    SampleInput: [...prev.SampleInput, newsampleInput.trim()]
                }))
            setNewSampleInput("");
        }
    };
    const handleSampleOutputKeyDown = (e) => {
        if (e.key === 'Enter' && newsampleOutput.trim()) {
            e.preventDefault();
            if (!Problems.SampleOutput.includes(newsampleOutput.trim()))
                setProblems(prev => ({
                    ...prev,
                    SampleOutput: [...prev.SampleOutput, newsampleOutput.trim()]
                }))
            setNewSampleOutput("");
        }
    };
    const handleConstraintsKeyDown = (e) => {
        if (e.key === 'Enter' && constraintsInput.trim()) {
            e.preventDefault();
            if (!Problems.constraints.includes(constraintsInput.trim()))
                setProblems(prev => ({
                    ...prev,
                    constraints: [...prev.constraints, constraintsInput.trim()]
                }))
            setConstraintsInput("");
        }
    };

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!Problems.tags.includes(tagInput.trim()))
                setProblems(prev => ({
                    ...prev,
                    tags: [...prev.tags, tagInput.trim()]
                }))
            setTagInput("");
        }
    };
    const handleTagRemove = (tagToRemove) => {
        setProblems(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };
    const handleSampleInputRemove = (inputToRemove) => {
        setProblems(prev => ({
            ...prev,
            SampleInput: prev.SampleInput.filter(input => input !== inputToRemove)
        }));
    };
    const handleSampleOutputRemove = (outputToRemove) => {
        setProblems(prev => ({
            ...prev,
            SampleOutput: prev.SampleOutput.filter(output => output !== outputToRemove)
        }));
    };
    const handleConstraintsRemove = (constraintToRemove) => {
        setProblems(prev => ({
            ...prev,
            constraints: prev.constraints.filter(constraint => constraint !== constraintToRemove)
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        dispatch({ type: 'auth/setloading' });
        try {
            if (id) {
                const response = await updateProblem(id, Problems);
                dispatch({ type: 'problem/clearCurrentProblem' });
                navigate('/dashboard/adminspace/Adminproblems/problemconfirmation', { state: { message: response.message, problem: response.problem } });
            } else {
            const response = await createProblem(Problems);
            navigate('/dashboard/adminspace/createproblemset/problemconfirmation', { state: { message: response.message, problem: response.problem } });
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 403) {
                    // Handle unauthorized access
                    dispatch({ type: 'auth/logout' });
                    console.error("Unauthorized access:", error.response.data);
                    navigate('/login', { state: { message: error.response.data.message } });
                } else {
                    setError(error.response.data)
                }
            } else {
                setError(error);
            } 
        } finally {
                dispatch({ type: 'auth/clearLoading' });
        }
    }
    return (
        <div className={className + "w-full min-h-screen flex justify-center "}>
            <form onSubmit={handleSubmit} className="mt-[50px] w-3/4 mb-[50px] min-h-screen bg-gradient-to-br space-y-9 from-[#e6b93e] from-[0%] via-[#d3d1c6] via-[65%] to-[#e6b93e] to-[100%] bordering flex flex-col items-center">
                <h1 className="text-4xl font-newsreader font-light text-purple-800 shadow-xl mt-4">
                    Create a Problem Set.
                </h1>
                <input type="text" placeholder="Title of the Problem" value={Problems.title} onChange={e => setProblems({ ...Problems, title: e.target.value })} className="focus:outline-none focus:ring-2 placeholder-black bg-gray-300 rounded-full truncate w-2/3 h-8 transition delay-50 duration-500 hover:scale-105 hover:translate-y-1" />
                <textarea placeholder="Description of the Problem" value={Problems.description} onChange={e => setProblems({ ...Problems, description: e.target.value })} className="focus:outline-none focus:ring-2 placeholder-black bg-gray-300 truncate w-2/3 h-96 transition delay-50 duration-500 text-wrap hover:scale-105 hover:translate-y-1" ></textarea>

                <textarea placeholder="Type Sample Input In Order and Enter" className="focus:outline-none focus:ring-2 placeholder-black bg-gray-300 truncate text-wrap w-2/3 h-16 transition delay-50 duration-500 hover:scale-105 hover:translate-y-1"
                    value={newsampleInput}
                    onChange={e => setNewSampleInput(e.target.value)}
                    onKeyDown={handleSampleInputKeyDown}
                >
                </textarea>
                <div className="flex gap-2 flex-wrap">
                    {Problems.SampleInput.map(input => (
                        <span key={input} className="bg-gray-400 break-words whitespace-normal font-newsreader min-w-24 max-w-3xl text-center animated-entry text-black rounded-full">
                            {input}
                            <button onClick={() => handleSampleInputRemove(input)} className=" ml-2 mr-2 mt-1 mb-1 text-red-500 hover:text-red-700 hover:bg-red-400 focus:outline-none" aria-label={`Remove ${input} sample input`}>
                                X
                            </button>
                        </span>
                    ))}
                </div>
                <textarea placeholder="Type Sample Output In Order and Enter" className="focus:outline-none focus:ring-2 placeholder-black bg-gray-300  truncate w-2/3 h-16 text-wrap transition delay-50 duration-500 hover:scale-105 hover:translate-y-1"
                    value={newsampleOutput}
                    onChange={e => setNewSampleOutput(e.target.value)}
                    onKeyDown={handleSampleOutputKeyDown}
                >

                </textarea>
                <div className="flex gap-2 flex-wrap">
                    {Problems.SampleOutput.map(output => (
                        <span key={output} className="bg-gray-400 break-words whitespace-normal font-newsreader min-w-24 max-w-3xl text-center animated-entry text-black rounded-full">
                            {output}
                            <button onClick={() => handleSampleOutputRemove(output)} className=" ml-2 mr-2 mt-1 mb-1 text-red-500 hover:text-red-700 hover:bg-red-400 focus:outline-none" aria-label={`Remove ${output} sample output`}>
                                X
                            </button>
                        </span>
                    ))}
                </div>
                <textarea placeholder="Type Constraints and Enter" className="focus:outline-none focus:ring-2 placeholder-black bg-gray-300 truncate w-2/3 h-16 text-wrap transition delay-50 duration-500 hover:scale-105 hover:translate-y-1"
                    value={constraintsInput}
                    onChange={e => setConstraintsInput(e.target.value)}
                    onKeyDown={handleConstraintsKeyDown}
                >

                </textarea>
                <div className="flex gap-2 flex-wrap">
                    {Problems.constraints.map(constraint => (
                        <h1 key={constraint} className="bg-gray-400 break-words whitespace-normal font-newsreader min-w-24 max-w-3xl text-center animated-entry text-black rounded-full">
                            {constraint}
                            <button onClick={() => handleConstraintsRemove(constraint)} className=" ml-2 mr-2 mt-1 mb-1 text-red-500 hover:text-red-700 hover:bg-red-400 focus:outline-none" aria-label={`Remove ${constraint} constraint`}>
                                X
                            </button>
                        </h1>
                    ))}
                </div>

                <input type="text" placeholder="Type a tag and press Enter" className="focus:outline-none focus:ring-2 placeholder-black bg-gray-300 rounded-full truncate w-2/3 h-8 transition delay-50 duration-500 hover:scale-105 hover:translate-y-1"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                />
                <div className="flex gap-2 flex-wrap">
                    {Problems.tags.map(tag => (
                        <span key={tag} className="bg-gray-400 break-words whitespace-normal font-newsreader min-w-24 max-w-3xl text-center animated-entry text-black rounded-full">
                            {tag}
                            <button onClick={() => handleTagRemove(tag)} className=" ml-2 mr-2 mt-1 mb-1 text-red-500 hover:text-red-700 hover:bg-red-400 focus:outline-none" aria-label={`Remove ${tag} tag`}>
                                X

                            </button>
                        </span>
                    ))}
                </div>
                <select name="difficulty" value={Problems.difficulty} onChange={e => setProblems({ ...Problems, difficulty: e.target.value })} className="focus:outline-none focus:ring-2 placeholder-black bg-gray-300 rounded-full truncate w-2/3 h-8 transition delay-50 duration-500 hover:scale-105 hover:translate-y-1">
                    <option value="" disabled >Select Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <button type="submit" className="antialiased font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg  rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                    disabled={loading}>
                    {loading ? "Submitting ..." : "Submit Problem"}
                </button>
                {Error && <p className="text-red-500 text-center font-gruppo font-bold">{typeof Error === "string" ? Error : Error?.message || "An Error Occured"}</p>}
                {loading && <Spinner />}
            </form>
        </div>
    )
}

export default ProblemForm;