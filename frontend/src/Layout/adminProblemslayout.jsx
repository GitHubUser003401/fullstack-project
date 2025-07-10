import AdminProblems from "../Components/AdminProblems";
import Footer from "./Footer";
import Navbar from "./Navbar";

function AdminProblemLayout () {
    return (
        <div className="relative w-full flex flex-col min-h-screen overflow-hidden shiny-bg bg-gradient-to-bl from-[#222426] via-[#777676] to-[#1a1a1a]  ">


        <Navbar className="relative z-10" />
        <div className="relative z-10 flex items-center w-full h-screen">
                      <img src="/pexels-thisisengineering-3861958.jpg" className="absolute -z-10 object-cover w-full h-full" />
                      <h1 className="text-7xl font-gruppo w-full text-center text-red-800 font-extrabold animated-entry">
                        Admin Problem Sets
                      </h1>
                    </div>
                    <AdminProblems className="relative z-10 animated-entry" />
        <Footer className="relative z-10 mt-auto" />
        </div>
    )
}
export default AdminProblemLayout;