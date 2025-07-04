import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import HomeBox from "../Components/Homebox";
import Footer from "./Footer";

function Dashboard() {

  return (
    <div className="relative w-full flex flex-col min-h-screen overflow-hidden shiny-bg bg-gradient-to-bl from-[#222426] via-[#777676] to-[#1a1a1a]  ">


      <Navbar className="relative z-10" />
      <h1 className="text-2xl relative font-bold font-gruppo bg-black tracking-widest text-center">
        <span className='bg-gradient-to-r from-[#444444] via-[#af0000] to-[#5f5f5f] bg-clip-text text-transparent animated-entry'>Welcome to the Dashboard</span>
      </h1>

      <div className="relative z-10 w-full h-screen">
        <video
          className="absolute -z-10 shadow-xl shadow-cyan-400 object-cover w-full h-full"
          src="/3129671-uhd_3840_2160_30fps.mp4"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
        />
        <HomeBox className="relative z-10" />
      </div>

      <Footer className="relative z-10 mt-auto" />
    </div>
  )
}

export default Dashboard;