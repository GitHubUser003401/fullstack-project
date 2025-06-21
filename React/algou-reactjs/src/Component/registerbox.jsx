import react from 'react';
import { useState } from 'react';
import { registerUser } from '../service/api';
import { useNavigate } from 'react-router-dom';
function RegisterBox({ className }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        Phone_Number: "",
        Age: "",
        Role: "",
    });
    const handleRegister = async () => {
        const name = formData.username.trim();
        const word = name.split(" ");
        const firstname = word[0] || "";
        const lastname = word.length > 1 ? word[word.length - 1] : "";

        const dataToSend = {
            ...formData,
            firstname,
            lastname,
        };
        const response = await registerUser(dataToSend);
       try { 
        navigate('/Confirmation', {state: { message : response.message,
        user: response.user
         }})
       } catch (errorMessage) {
        navigate('/Confirmation', {state: { message : errorMessage }})
       }
        
    }

    const box = " focus:outline-none focus:ring-2 placeholder-black bg-gray-300 rounded-full truncate w-52 h-8 transition delay-50 duration-500 hover:scale-105 hover:translate-y-1"

    return (
        <div className={className}>
            <div className="flex justify-end opacity-90">
                <div className="w-1/3 h-screen mr-[100px] shadow-xl shadow-orange-600 animated-gradient grid grid-rows-12 place-items-center text-wrap overflow-hidden">
                    <h1 className="mt-[40px] row-start-1 font-extrabold italic text-3xl text-amber-800 transition delay-50 duration-1000 hover:scale-110">Register to <span className="bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] bg-clip-text text-transparent ">#######</span></h1>
                    <h2 className="row-start-3 italic text-lg text-amber-800 drop-shadow-lg tracking tracking-wider uppercase ">Enter your details</h2>
                    <input type="text" placeholder='Enter Your Username' className={`row-start-4 ${box}`} value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} required />
                    <input type="password" placeholder='Password' className={`row-start-5 ${box}`} value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
                    <input type="email" placeholder='Email Address' className={`row-start-6 ${box}`} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                    <input type="number" placeholder='Contact_Number' className={`row-start-7 ${box}`} value={formData.Phone_Number} onChange={e => setFormData({ ...formData, Phone_Number: e.target.value })} required />
                    <input type="number" placeholder='Age' className={`row-start-8 ${box}`} value={formData.Age} onChange={e => setFormData({ ...formData, Age: e.target.value })} required />
                    <select className={`row-start-9 ${box}`} value={formData.Role} onChange={e => setFormData({ ...formData, Role: e.target.value })} required>
                        <option value="" disabled selected>Select Role</option>
                        <option value="option1">Admin</option>
                        <option value="option2">Student</option>
                    </select>
                    <button className="antialiased font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg row-start-11 rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                        onClick={handleRegister}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}
export default RegisterBox;