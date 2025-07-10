
import ConfirmProblemBox from "../Components/ProblemConfirmationBox";
import Footer from "./Footer";
import Navbar from "./Navbar";

function ConfirmBoxLayout() {
    return (
        <div className="relative w-full flex flex-col min-h-screen overflow-hidden shiny-bg bg-gradient-to-bl from-[#222426] via-[#777676] to-[#1a1a1a]  ">


        <Navbar className="relative z-10"/>
        <ConfirmProblemBox className="relative z-10 animated-entry " />

        <Footer className="relative z-10 mt-auto" />
        </div>
    )
}

export default ConfirmBoxLayout;