import SubmissionConfirmationBox from "../Components/SubmissionConfirmationBox";

function Problemsubmission() {
    return (
        <div className="relative w-full flex flex-col min-h-screen overflow-hidden shiny-bg bg-gradient-to-bl from-[#222426] via-[#777676] to-[#1a1a1a] ">
            <div className="relative z-10 flex items-center justify-center w-full h-screen">
                <img src="/pexels-yankrukov-7698801.jpg" className="brightness-30 contrast-110 absolute -z-10 object-cover w-full h-full" />

                    <SubmissionConfirmationBox className="w-[800px] min-h-[350px] backdrop-blur-xs bg-white/20 bordering backdrop-brightness-150" />


            </div>
        </div>
    )
}

export default Problemsubmission;