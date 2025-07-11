function Footer({ className }) {
    return (
        <footer className={className}>
            <div className = "w-full h-24 bg-black divide-y-[2px] divide-white divide-opacity-50">
            <div className = "w-full h-12 bg-gradient-to-br grid from-[#222426] via-[#646363] to-[#1a1a1a]">
            </div>
            <div className = "w-full h-12 flex justify-center items-center">
                <p className = "text-white font-bodoni text-sm">

                    @2025 All rights reserved | This website is made with <span className = "text-red-600">❤</span> by <span className = "bg-gradient-to-r font-extrabold to-[#e0e0e0] via-[#d3d3d3] from-[#a2a2a2] bg-clip-text text-transparent ">AlgoU-Student.</span>
                </p>
            </div>

            </div>
        </footer>
    );
}
export default Footer