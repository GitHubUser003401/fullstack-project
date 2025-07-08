import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function HomeBox({ className }) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    // You can replace the hardcoded name with a dynamic one if needed
    return (
        <div className={className}>
            <div className=" animated-entry flex flex-col items-center h-screen">
                <h1 className="font-bodoni w-6/7 text-center tracking-wider mt-[100px] text-amber-100 font-bold italic text-4xl">
                    The journey of a thousand miles begins with a single step! <br />
                    Welcome, <span className="text-cyan-200">  {user.username} 
                    </span>
                </h1>
                <div className="flex mt-[200px] items-center justify-between w-4/5 h-28 bg-gradient-to-br mb-[30px] from-[#4671ff] via-[#11eff7] to-[#ffffff] bordering shadow-lg shadow-cyan-400 ">
                    <p className=" w-2/3  text-center font-newsreader font-extralight text-3xl text-[#844e1c] transition delay-50 duration-1000 ease-in-out hover:scale-110 hover:text-[#ed4545]">
                        Head to Problem Section to get started right away!
                    </p>
                    <button className="w-44 h-12 mr-[50px] bg-gradient-to-r from-[#e0e0e0] via-[#bdbdbd] to-[#757575] rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
                        onClick={() => navigate('/dashboard/problems')}>
                        Go to Problems
                    </button>

                </div>
            </div>
        </div>)
}

export default HomeBox;