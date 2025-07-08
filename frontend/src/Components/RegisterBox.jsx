import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../Service/RegisterApi';
function RegisterBox({ className }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        Phone_Number: "",
        Age:  "",
        Role: "",
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = formData.username.trim();
        const word = name.split(" ");
        const firstname = word[0] || "";
        const lastname = word.length > 1 ? word[word.length - 1] : "";

        const dataToSend = {
            ...formData,
            firstname,
            lastname,
        };

        try { 
        const response = await registerUser(dataToSend);
        navigate('/Confirmation', {state: { message : response.message,
        user: response.user
         }})
       } catch (errorMessage) {
        navigate('/Confirmation', {state: { message : errorMessage }})
       }
        
    }

        
        

    const box = " focus:outline-none focus:ring-2 placeholder-black bg-gray-300 rounded-full truncate w-52 h-8 transition delay-50 duration-500 hover:scale-105 hover:translate-y-1"

    return (
        <div className={className + "animated-entry"}>
            <div className="flex flex-col h-screen justify-between items-center opacity-90">
                <div className="w-2/3 h-28 mt-[10px] bordering shadow-xl shadow-orange-600 animated-gradient grid grid-rows-2 place-items-center text-wrap overflow-hidden p-2">
                    <h1 className="row-start-1 font-imperialscript text-6xl text-purple-950 transition delay-50 duration-1000 hover:scale-110 animated-entry">Register to <span className="bg-gradient-to-r from-[#050505] via-[#af0000] to-[#5f5f5f] bg-clip-text text-transparent">Codelite</span></h1>
                    <h2 className="row-start-2 italic text-lg text-amber-800 drop-shadow-lg font-tomorrow uppercase animated-entry">Enter your details</h2>
                </div>
                <div className = "flex flex-row w-2/3 h-3/4 mb-[10px]">
                <div className = "w-3/5 h-full bordering pb-12 pt-12 shadow-2xl shadow-orange-600 animated-gradient place-items-center text-wrap overflow-hidden">
                <form onSubmit={handleSubmit} className='flex flex-col justify-between items-center'>
                    <div className = "grid grid-cols-2 grid-rows-6 items-center gap-3.5">
                    <label className = "row-start-1  font-newsreader text-xl bg-gradient-to-r from-[#050505] via-[#af0000] to-[#5f5f5f] bg-clip-text text-transparent ">UserName:</label>   
                    <input type="text" placeholder='Enter Your Username' className={`${box}`} value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} required />
                    <label className='row-start-2  font-newsreader text-xl bg-gradient-to-r from-[#050505] via-[#af0000] to-[#5f5f5f] bg-clip-text text-transparent'>Password:</label>
                    <input type="password" placeholder='Password' className={`${box}`} value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
                    <label className = 'row-start-3  font-newsreader text-xl bg-gradient-to-r from-[#050505] via-[#af0000] to-[#5f5f5f] bg-clip-text text-transparent'>Email:</label>
                    <input type="email" placeholder='Email Address' className={`${box}`} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                    <label className='row-start-4  font-newsreader text-xl bg-gradient-to-r from-[#050505] via-[#af0000] to-[#5f5f5f] bg-clip-text text-transparent'>Contact Number:</label>
                    <input type="number" placeholder='Contact_Number' className={`${box}`} value={formData.Phone_Number} onChange={e => setFormData({ ...formData, Phone_Number: e.target.value })} required />
                    <label className='row-start-5  font-newsreader text-xl bg-gradient-to-r from-[#050505] via-[#af0000] to-[#5f5f5f] bg-clip-text text-transparent'>Age:</label>
                    <input type="number" placeholder='Age' className={`${box}`} value={formData.Age} onChange={e => setFormData({ ...formData, Age: e.target.value })} required />
                    <label className='row-start-6  font-newsreader text-xl bg-gradient-to-r from-[#050505] via-[#af0000] to-[#5f5f5f] bg-clip-text text-transparent'>Role:</label>
                    <select className={`${box}`} value={formData.Role} onChange={e => setFormData({ ...formData, Role: e.target.value })} required>
                        <option value= "" disabled >Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Student">Student</option>
                    </select>
                    </div>
                    <div className = "w-full h-24 flex items-center justify-center mt-4 ">
                    <button className="justify-center-safe antialiased font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                        type = "submit">
                        Register
                    </button>
                    </div>
                </form>
                </div>
                </div>

            </div>
        </div>
    );
}
export default RegisterBox;