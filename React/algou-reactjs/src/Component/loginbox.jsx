import react from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../service/api';

function LoginBox({ className }) {
  const navigate = useNavigate();
  const [Error, setError] = useState("");
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  })
  const handleLogin = async () => {
    try {
      await LoginUser(loginData);
      navigate('/Home');
    } catch (errorMessage) {
      setError(
        typeof errorMessage === "string" ? errorMessage : errorMessage?.message
      );
      setloginData({
        email: "",
        password: "",
      })
    }
  }


  return (
    <div className={className}>
      <div className="flex justify-end opacity-90">
        <div className="w-1/3 h-screen mr-[100px] shadow-2xl shadow-orange-600 animated-gradient grid grid-rows-8 place-items-center text-wrap overflow-hidden">
          <h1 className="mt-[40px] row-start-2 font-extrabold italic text-3xl text-amber-800 transition delay-50 duration-1000 hover:scale-110 animated-entry">Login to <span className="bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] bg-clip-text text-transparent ">#######</span></h1>
          <h2 className="row-start-3 italic text-lg text-amber-800 drop-shadow-lg tracking tracking-wider uppercase animated-entry">Enter your credentials</h2>
          <input type="email" placeholder='Email' className="row-start-4 focus:outline-none focus:ring-2 placeholder-black bg-gray-300 rounded-full truncate w-52 h-8 transition delay-50 duration-500 hover:scale-105 hover:translate-y-1" value={loginData.email} onChange={e => setloginData({ ...loginData, email: e.target.value })} required />
          <input type="password" placeholder='Password' className="row-start-5 mb-[10px] focus:outline-none focus:ring-2 placeholder-black bg-gray-300 rounded-full truncate w-52 h-8 transition delay-50 duration-500 hover:scale-105 hover:translate-y-1" value={loginData.password} onChange={e => setloginData({ ...loginData, password: e.target.value })} required />
          <button className="antialiased font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg row-start-6 rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
            onClick={handleLogin}>
            Login
          </button>
          {Error && (
            <h2 className="text-red-600 font-semibold row-start-7 animated-entry">
            {typeof Error === "string" ? Error : Error?.message || "An error occurred"}
          </h2>)}
        </div>
      </div>
    </div>
  );
}
export default LoginBox;