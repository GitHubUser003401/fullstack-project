import ProblemSet from "../Components/ProblemSet";
import Footer from "./Footer";
import Navbar from "./Navbar";

function ProblempageLayout () {
    return (
        <div className="relative w-full flex flex-col min-h-screen overflow-hidden shiny-bg bg-gradient-to-bl from-[#222426] via-[#777676] to-[#1a1a1a]  ">
                  <Navbar className="relative z-10" />
                  <div className="relative z-10 flex items-center w-full h-screen">
                    <img src="/pexels-goumbik-574070.jpg" className="absolute -z-10 object-cover w-full h-full" />
                    <h1 className="text-7xl font-gruppo ml-[30px] animated-entry">
                      Problem Sets
                    </h1>
                  </div>
                  <ProblemSet className="relative z-10" />
                  <Footer className="relative z-10 mt-auto" />
        </div>
    )
}
export default ProblempageLayout;