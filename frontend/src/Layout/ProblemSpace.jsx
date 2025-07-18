import ProblemBox from "../Components/ProblemBox";
import Navbar from "./Navbar";
import Footer from "./Footer";

function ProblemSpaceLayout() {
    return (
        <div className="relative w-full flex flex-col min-h-screen overflow-hidden shiny-bg bg-gradient-to-bl from-[#222426] via-[#777676] to-[#1a1a1a] ">
            <Navbar className="relative z-20 " />
            <ProblemBox className="relative z-10"/>
            <Footer className="relative z-10" />
        </div>
    )
}
export default ProblemSpaceLayout;