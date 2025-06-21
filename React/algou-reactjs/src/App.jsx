import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import StartBox from './Component/StartBox';
import LoginBox from './Component/loginbox';
import RegisterBox from './Component/registerbox';
import ConfirmBox from './Component/Confirmbox';
function App() {
  return (
   <BrowserRouter>
   <div className = "relative w-full h-screen overflow-hidden">
    <video className = "absolute -z-10 object-cover w-full h-full" src="/3130182-uhd_3840_2160_30fps.mp4" autoPlay loop muted playsInline/>
    <Routes>
    <Route path = "/" element = {<StartBox className = "relative z-10"/>}
    />
    <Route path = "/login" element = {<LoginBox className = "relative z-10"/>}
    />
    <Route path = "/register" element = {<RegisterBox className = "relative z-10"/>}
    />
    <Route path = "/Confirmation" element = {<ConfirmBox className = "relative z-10"/>}/>
    </Routes>
   
   </div>
   </BrowserRouter>
  )
}

export default App
