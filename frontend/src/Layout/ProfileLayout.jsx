import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProfileBox from "../Components/ProfileBox";
import { useState } from "react";
import DialogBox from "../Components/DialogBox";

function ProfileLayout() {
    useEffect(() => {
        document.body.classList.add("profile-background");

        return () => document.body.classList.remove("profile-background");
    }, []);
        const [dialogOpen, setDialogOpen] = useState(false);
        const [dialogMessage, setDialogMessage] = useState("");
        const [onDialogConfirm, setOnDialogConfirm] = useState(() => () => {});

    return (
        <>
            <Navbar className="relative z-20 " />
            <ProfileBox className="relative z-10 animated-entry " setDialogOpen={setDialogOpen} setDialogMessage={setDialogMessage} setOnDialogConfirm={setOnDialogConfirm} />
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


        </>
    )

}

export default ProfileLayout;