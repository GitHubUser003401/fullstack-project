import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';


import { compileCode } from '../service/api';
import { useNavigate } from 'react-router-dom';

function EditorBox({ className }) {

    const navigate = useNavigate();
    const [code, setCode] = useState(`#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`)
    const [output, setOutput] = useState("");

    const [input, setInput] = useState("");



    const handleRun = async () => {
        try {
            const response = await compileCode({ language: 'cpp', code, input });
            setOutput(response.output);
        } catch (error) {
            if (error === 'TokenExpiredError') {
                navigate('/login', { state: { message: 'Session expired, please log in again.' } });
            } else if (error === 'Invalid token') {
                navigate('/login', { state: { message: 'Invalid token, please log in again.' } });
            } else {
                setOutput(`Error: ${error.error || error.message || "An error occurred"}`);
            }
        }


    }
    return (
        <div className={className + " animated-entry w-1/2 bg-slate-400 overflow-y-scroll h-screen mt-2 mb-2 ml-2 bordering p-10"}>
            <h1 className="text-3xl font-newsreader bg-gradient-to-r from-purple-500 via-fuchsia-800 bg-clip-text text-transparent">
                Code Editor
            </h1>
            <CodeMirror
                value={code}
                onChange={(value) => setCode(value)}
                extensions={[cpp()]}
                padding={10}
                className="border border-gray-300 rounded-md mt-4"
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 16,
                    backgroundColor: '#f5f5f5',
                    height: '300px'
                }} />
            <textarea className="w-full mt-4 p-2 border rounded"
                rows={3}
                placeholder="Custom Input (optional)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button className="antialiased font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg row-start-6 rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                onClick={handleRun}>
                Run Code
            </button>
            <div className="mt-4">
                <h2 className="text-2xl font-semibold">Output:</h2>
                <pre className="bg-gray-200 p-4 rounded-md mt-2">
                    {output}
                </pre>
            </div>
        </div>
    )
}


export default EditorBox;