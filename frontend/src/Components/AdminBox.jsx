import { useNavigate } from "react-router-dom";

function Adminbox({ className }) {
    const navigate = useNavigate();

    return (
        <div className={className}>
            <div className="animated-entry flex flex-col items-center h-screen">
                <h1 className="font-bodoni w-6/7 text-center tracking-wider text-amber-100 font-bold italic text-4xl">
                    Welcome to the Admin Space! <br />
                    <span className="bg-gradient-to-br mb-[30px] from-[#6603c8] via-[#fd6c05] to-[#ffffff] font-newsreader not-italic bg-clip-text text-transparent">Here you can manage users and their data.</span>
                </h1>
                <div className="flex items-center mt-[200px] justify-between w-4/5 h-24 bg-gradient-to-br from-[#4671ff] via-[#11eff7] to-[#ffffff] bordering shadow-lg shadow-cyan-400">
                    <h1 className="text-4xl font-unna">
                        Want to create a new problem set? 
                    </h1>
                    <button className="w-44 h-12 mr-16 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                        onClick={() => navigate('/dashboard/adminspace/createproblemset')} >
                        Create Problem Set
                    </button>
                </div>
                <div className="flex items-center mt-[20px] justify-between w-4/5 h-24 bg-gradient-to-br from-[#4671ff] via-[#11eff7] to-[#ffffff] bordering shadow-lg shadow-cyan-400">
                    <h1 className="text-4xl font-unna">
                        See your Own Problem Lists 
                    </h1>
                    <button className="w-44 h-12 mr-16 bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                        onClick={() => navigate('/adminProblemSet')} >
                        See Problem Lists
                    </button>
                </div>

            </div>
        </div>

    )
}

export default Adminbox;