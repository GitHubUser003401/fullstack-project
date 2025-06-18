import React from 'react';
function StartBox() {
  return (
    <>
    <div className = "flex justify-end opacity-90">
    <div className = "w-1/3 h-screen mr-[100px] shadow-xl shadow-orange-600 animated-gradient grid grid-rows-5 place-items-center text-clip">
      <h1 className = "mt-[40px] row-start-1 font-extrabold italic text-3xl text-amber-800 transition delay-50 duration-1000 hover:scale-110">Welcome to <span className="bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] bg-clip-text text-transparent ">#######</span></h1>
      <h2 className = "row-start-2 italic text-lg text-amber-800 drop-shadow-lg tracking tracking-wider uppercase">Please Choose an option to continue</h2>
      <button className = "antialiased font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg row-start-3 rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100" >
        Login
      </button>
      <button className = "antialiased font-normal italic text-indigo-700 font-serif text-lg w-1/3 h-12 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] shadow-lg row-start-4 rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100">
        Sign-Up
      </button>
    </div>
    </div>
    </>
  )
}

export default StartBox
