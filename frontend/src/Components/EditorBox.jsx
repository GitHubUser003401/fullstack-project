import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { compileCode } from "../Service/CompilationApi";
import { useDispatch, useSelector } from "react-redux";
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { dracula } from '@uiw/codemirror-theme-dracula';

function EditorBox() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const loading = useSelector((state) => state.auth.loading);
    const [code, setCode] = useState(`#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`)
    const [output, setOutput] = useState("");

    const [input, setInput] = useState("");

    const handleRun = async () => {
        if (loading) return;
        dispatch({ type: 'auth/setloading' });
        try {
            const response = await compileCode('cpp', code, input);
            setOutput(response.output);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 403) {
                    // Handle unauthorized access
                    location.state = { message: error.response.data.message }
                    dispatch({ type: 'auth/logout' });
                    console.error("Unauthorized access:", error.response.data);
                    console.log(error.response.data.message)
                    navigate('/login');
                } else {
                    setOutput(typeof error.response.data === 'object' ? error.response.data?.message || error.response.data?.error : error.response.data);
                    console.error("Compilation error:", error.response.data);
                }
            } else {
                setOutput(error.message || "Network error.");
                console.error(error);
            }
        } finally {
            dispatch({ type: 'auth/clearLoading' });
        }
    }
    return (
        <div className="flex flex-col items-center min-h-screen w-full">
            <CodeMirror
                value={code}
                theme={dracula}
                onChange={(value) => setCode(value)}
                extensions={[cpp()]}
                padding={10}
                className="border border-gray-300 rounded-xl mt-4 w-7/8"
                style={{
                    fontSize: 8,
                    backgroundColor: '#282a36',
                    height: '400px',
                    overflow: 'auto',
                }} />
            
            <button className="antialiased mt-[30px] font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg row-start-6 rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                onClick={handleRun}
                disabled={loading}> 
                {loading ? "Running..." : "Run Code"}
            </button>
            <textarea className="w-7/8 bg-[#282a36] text-amber-50 mt-4 p-2 border rounded"
                rows={3}
                placeholder="Custom Input (optional)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <div className="mt-4 w-7/8 h-fit  bg-gradient-to-br from-[#4671ff] via-[#11eff7] to-[#ffffff] p-4 rounded-lg shadow-lg mb-[20px]">
                <h2 className="text-md font-semibold">Output:</h2>
                <pre className="p-4 rounded-md mt-2 bg-[#282a36] text-amber-50 overflow-x-auto"
                style={{ fontSize: '12px'}}>
                    {output}
                </pre>
            </div>
        </div>
    )
}
export default EditorBox;