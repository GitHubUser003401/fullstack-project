import ProblemBox from "../Components/ProblemBox";

function ProblemSpaceLayout() {
    return (
        <div className="relative w-full flex flex-col min-h-screen overflow-hidden shiny-bg bg-gradient-to-bl from-[#222426] via-[#777676] to-[#1a1a1a] ">
            <ProblemBox className="relative z-10"/>
        </div>
    )
}
export default ProblemSpaceLayout;