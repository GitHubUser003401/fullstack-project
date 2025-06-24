import React from 'react'

function Navbar({className}) {
    return (
        <>
        <nav>
            <div className = {className}>
            <div className = "w-full bg-gradient-to-r grid from-slate-900 via-slate-800 to-slate-600 h-28">
                <div className = "flex justify-between">
                <h1 className = "text-5xl bg-gradient-to-r animated-entry from-[#e3e3e38a] via-[#cdcdcd] to-[#757575] bg-clip-text text-transparent mt-[10px] ml-[40px]">
                    ######
                </h1>
                <a href = "/profile">
                    <img src = "/pexels-alex-montes-892479-1820563.jpg"
                    className = "shadow-2xl shadow-orange-600 w-12 h-12 rounded-full animated-entry transition delay-100 duration-500 hover:scale-125 mt-[10px] mr-[10px]"
                    alt = "Profile"
                    />
                </a>

                </div>
                <div className = "border-t-2 border-t-slate-100 w-full mt-[10px]">
                    <button className="w-44 font-serif h-9 bg-slate-400 border-sky-800 border-r-4 hover:text-xl ">
                        Home
                    </button>
                    <button className="w-44 font-serif h-9 bg-slate-400 border-sky-800 border-r-4 hover:text-xl ">
                        ######
                    </button>
                    <button className="w-44 font-serif h-9 bg-slate-400 border-sky-800 border-r-4 hover:text-xl ">
                        #####
                    </button>
                    <button className="w-44 font-serif h-9 bg-slate-400 border-sky-800 border-r-4 hover:text-xl "
                    onClick={() => localStorage.removeItem('token')}>
                        Log-Out
                    </button>
                </div>
            </div>
            </div>
        </nav>
        </>
        
    )
}
export default Navbar;