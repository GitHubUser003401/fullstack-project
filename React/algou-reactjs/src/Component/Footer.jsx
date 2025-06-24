import react from 'react';

function Footer({ className }) {
    return (
        <footer className={className}>
            <div className = "w-full h-24 bg-black divide-y-[2px] divide-white divide-opacity-50">
            <div className = "w-full h-12 bg-gradient-to-r grid from-slate-900 via-slate-800 to-slate-600">
            </div>
            <div className = "w-full h-12 flex justify-center items-center">
                <p className = "text-white font-[Times New Roman] font-semibold text-sm">

                    @2025 All rights reserved | This website is made with <span className = "text-red-600">❤</span> by <span className = "bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] bg-clip-text text-transparent ">ALGOU-STUDENT.</span>
                </p>
            </div>

            </div>
        </footer>
    );
}
export default Footer