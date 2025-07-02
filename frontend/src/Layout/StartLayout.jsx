import { Outlet } from "react-router-dom";

function Homelayout ({className}) {
    return (
    <div className={className + "w-full h-screen overflow-hidden"}>
              <video className="absolute -z-10 object-cover w-full h-full" src="/3130182-uhd_3840_2160_30fps.mp4" autoPlay loop muted playsInline />
    <Outlet /> 
    </div>
    );
}

export default Homelayout;

