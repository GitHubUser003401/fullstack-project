import react from 'react';

function LoginBox() {
  return (
    <>
      <div className="flex justify-end opacity-90">
        <div className="w-1/3 h-screen mr-[100px] shadow-2xl shadow-orange-600 animated-gradient grid grid-rows-8 place-items-center text-wrap overflow-hidden">
          <h1 className="mt-[40px] row-start-2 font-extrabold italic text-3xl text-amber-800 transition delay-50 duration-1000 hover:scale-110">Login to <span className="bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] bg-clip-text text-transparent ">#######</span></h1>
          <h2 className="row-start-3 italic text-lg text-amber-800 drop-shadow-lg tracking tracking-wider uppercase ">Please enter your credentials</h2>
          <input type = "text" placeholder='Username' className = "row-start-4 focus:outline-none focus:ring-2 placeholder-black bg-gray-300 rounded-full truncate w-52 h-8 transition delay-50 duration-500 hover:scale-105 hover:translate-y-1" required />
          <input type = "password"  placeholder='Password' className = "row-start-5 mb-[10px] focus:outline-none focus:ring-2 placeholder-black bg-gray-300 rounded-full truncate w-52 h-8 transition delay-50 duration-500 hover:scale-105 hover:translate-y-1" required/>
          <button className="antialiased font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg row-start-6 rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100">
            Login
          </button>
        </div>
      </div>
    </>
  );
}
export default LoginBox;