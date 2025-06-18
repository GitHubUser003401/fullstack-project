import Navbar from './Component/navbar';
import StartBox from './Component/StartBox';
import LoginBox from './Component/loginbox';
import RegisterBox from './Component/registerbox';
function App() {
  return (
   <>
   <div className = "relative w-full h-screen overflow-hidden">
    <video className = "absolute -z-10 object-cover w-full h-full" src="/3130182-uhd_3840_2160_30fps.mp4" autoPlay loop muted playsInline/>
   <StartBox className = "relative -z-10"/>
   {/* <LoginBox className = "relative -z-10"/> */}
    {/* <RegisterBox className = "relative -z-10"/> */}
   </div>
   </>
  )
}

export default App
