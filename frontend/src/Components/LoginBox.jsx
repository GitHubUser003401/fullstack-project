import react from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function LoginBox({className}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [Error, setError] = useState(location.state?.message || "");
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  })



const handleSubmit = async (e) => {
    e.preventDefault();
    try {

    } catch (error) {

    }
};


  return (
    <div className={className}>
      <div className="flex flex-col h-screen items-center justify-between opacity-90">
        <div className="w-2/3 h-30 mt-[10px] bordering shadow-2xl shadow-orange-600 animated-gradient grid grid-rows-2 place-items-center text-wrap overflow-hidden p-2">
          <h1 className=" row-start-1 font-imperialscript text-6xl text-purple-950 transition delay-50 duration-1000 hover:scale-110 animated-entry">Login to <span className="bg-gradient-to-r from-[#050505] via-[#af0000] to-[#5f5f5f] bg-clip-text text-transparent">Codelite</span></h1>
          <h2 className="row-start-2 italic text-lg text-amber-800 drop-shadow-lg font-tomorrow uppercase animated-entry">Enter your credentials</h2>
        </div>
        
        <div className = "w-2/5 h-48 mb-[50px] bordering shadow-2xl shadow-orange-600 animated-gradient place-items-center text-wrap overflow-hidden">
        <form onSubmit={handleSubmit} className = "w-full items-center flex flex-col ">
          <div className = "flex flex-col">
          <label className='font-newsreader'>Email</label> 
          <input type="email" placeholder='Email' className="focus:outline-none focus:ring-2 placeholder-black bg-gray-300 rounded-full truncate w-52 h-8 transition delay-50 duration-500 hover:scale-105 hover:translate-y-1" value={loginData.email} onChange={e => setloginData({ ...loginData, email: e.target.value })} required />
          
          <label className = 'font-newsreader'>Password</label>
          <input type="password" placeholder='Password' className="mb-[10px] focus:outline-none focus:ring-2 placeholder-black bg-gray-300 rounded-full truncate w-52 h-8 transition delay-50 duration-500 hover:scale-105 hover:translate-y-1" value={loginData.password} onChange={e => setloginData({ ...loginData, password: e.target.value })} required />
          </div>

          <button className="antialiased font-normal italic text-indigo-700 font-serif text-lg w-36 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg row-start-6 rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
            type = "submit">
            Login
          </button>
          {Error && (
            <h2 className="text-red-600 font-extrabold row-start-7 animated-entry">
            {typeof Error === "string" ? Error : Error?.message || "An error occurred"}
          </h2>)}
        </form>
        
        </div>
      </div>
    </div>
  );
}

export default LoginBox;