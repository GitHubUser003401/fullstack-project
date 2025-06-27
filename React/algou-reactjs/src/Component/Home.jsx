import react, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnything } from '../service/api';

function Home({className}) {
    const navigate = useNavigate();
    const [data , setData] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAnything();
                setData(response);
            } catch (error) {
                if (error === 'TokenExpiredError') {
                    navigate('/login', { state: { message: 'Session expired, please log in again.' }});
                } else if (error === 'Invalid token') {
                    navigate('/login', { state: { message: 'Invalid token, please log in again.' }});
                } else {
                    navigate('/login', { state: { message: error }});
                }
            }
    };
    fetchData();
}, [navigate]);

    return (
        <div className={className}>
        <div className= " animated-entry flex justify-between h-screen">
            <h1 className = "mt-[150px] font-bodoni w-2/5 text-amber-100 font-bold italic text-5xl">
                Let's learn Something New Today! <br /> <br />
                Welcome, <br /> <span className = "text-cyan-200">
                {data?.user?.username}
                </span>
            </h1>
            <div className = "grid w-96 h-2/3 place-items-center bg-gradient-to-br from-[#4671ff] via-[#11eff7] to-[#ffffff] bordering shadow-lg shadow-cyan-400 mt-[100px] mr-[40px] ">
            <p className = " w-72 h-40 mt-[40px] text-center font-newsreader font-extralight text-3xl text-[#844e1c] transition delay-50 duration-1000 ease-in-out hover:scale-110 hover:text-[#ed4545]">
                Head to Problem Section to get started with the problems.
            </p>
            <button className = "w-44 h-12 bg-gradient-to-r mb-[20px] from-[#e0e0e0] via-[#bdbdbd] to-[#757575] rounded-lg truncate animated-pulse hover:font-bold hover:text-indigo-900 transition delay-50 duration-700 ease-in-out hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-100"
            onClick={() => navigate('/problems')}>
                Go to Problems
            </button>

            </div>
        </div>
        </div>
    );
}
export default Home;