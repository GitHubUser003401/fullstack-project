import { useEffect } from "react";
import Footer from "./Footer";
import SubmissionsTable from "../Components/SubmissionsTable";


function SubmissionsLayout() {
    useEffect(() => {
        document.body.classList.add("page-background-bg")

        return () => document.body.classList.remove("page-background-bg");
    }, []);
    return (
        <>
            <div className="relative w-full flex flex-col items-center min-h-screen overflow-hidden shiny-bg">

                <div className="relatve z-10 animate-fade-in w-1/2 h-fit backdrop-blur-xl mt-[40px] p-4 backdrop-brightness-90 text-center font-baskervville">
                    <h1 className="text-3xl ">Submissions</h1>
                </div>
                <SubmissionsTable className="relative z-10" />

            </div>
            <Footer className="relative z-10 mt-auto" />
        </>
    )
}
export default SubmissionsLayout;