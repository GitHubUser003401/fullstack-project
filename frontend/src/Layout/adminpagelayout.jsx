import { useState } from "react";
import Adminbox from "../Components/AdminBox";
import AdminReferralBox from "../Components/AdminReferral";
import DialogBox from "../Components/DialogBox";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Adminpagelayout() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [onDialogConfirm, setOnDialogConfirm] = useState(() => () => {});

    return (
        <div className="relative w-full flex flex-col min-h-screen overflow-hidden shiny-bg bg-gradient-to-bl from-[#222426] via-[#777676] to-[#1a1a1a]  ">


            <Navbar className="relative z-10" />


            <div className="relative z-10 w-full h-screen overflow-hidden shadow-xl shadow-cyan-400">
                <video
                    className="absolute -z-10  object-cover w-full h-full"
                    src="/3129671-uhd_3840_2160_30fps.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    disableRemotePlayback
                />
                <Adminbox className="relative z-10 animated-entry" />
            </div>

            <div className="relative z-10 w-full h-fit flex items-center justify-center">
                <AdminReferralBox className="animated-entry " setDialogOpen={setDialogOpen} setDialogMessage={setDialogMessage} setOnDialogConfirm={setOnDialogConfirm} />
            </div>

            <Footer className="relative z-10 mt-auto" />
            <DialogBox
                open={dialogOpen}
                message={dialogMessage}
                onConfirm={() => {
                    setDialogOpen(false);
                    onDialogConfirm();
                    // Handle confirm action
                }
                }
                onExit={() => {
                    setDialogOpen(false)
                }} />
        </div>
    )

}

export default Adminpagelayout;