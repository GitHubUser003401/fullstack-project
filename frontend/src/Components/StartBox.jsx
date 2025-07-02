import { useNavigate } from 'react-router-dom';

function StartBox({className}) {
  const navigate = useNavigate(); 
  return (
    <div className={className}>
      <div className="flex flex-col h-screen justify-between items-center opacity-90">
        <div className="w-2/3 h-36 mt-[30px] shadow-xl shadow-orange-600 bordering grid grid-rows-2 animated-gradient place-items-center text-clip overflow-hidden">
          <h1 className="mt-[20px] row-start-1 font-imperialscript text-6xl text-purple-950 transition delay-50 duration-1000 hover:scale-110 animated-entry">Welcome to <span className="bg-gradient-to-r from-[#050505] via-[#af0000] to-[#5f5f5f] bg-clip-text text-transparent ">Codelite</span></h1>
          <h2 className="italic text-lg row-start-2 text-amber-800 drop-shadow-lg font-tomorrow uppercase animated-entry">Choose an option to continue</h2>
        </div>

      <div className="w-2/5 h-40 mb-[30px] shadow-xl shadow-orange-600 bordering grid grid-rows-2 animated-gradient place-items-center text-clip overflow-hidden">  
          <button className = "antialiased font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100 row-start-1 "
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button className= "antialiased font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100 row-start-2"
            onClick={() => navigate('/register')}
          >
            Sign-Up
          </button>
        </div>

      </div>
    </div>
  )
}

export default StartBox