import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import StartBox from './Component/StartBox';
import LoginBox from './Component/loginbox';
import RegisterBox from './Component/registerbox';
import ConfirmBox from './Component/Confirmbox';
import ProtectedRoute from './Component/Protected';
import Navbar from './Component/navbar';
function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={
          <div className="relative w-full h-screen overflow-hidden">
            <video className="absolute -z-10 object-cover w-full h-full" src="/3130182-uhd_3840_2160_30fps.mp4" autoPlay loop muted playsInline />
            <StartBox className="relative z-10" />
          </div>
        }
        />
        <Route path="/login" element={
          <div className="relative w-full h-screen overflow-hidden">
            <video className="absolute -z-10 object-cover w-full h-full" src="/3130182-uhd_3840_2160_30fps.mp4" autoPlay loop muted playsInline disablePictureInPicture disableRemotePlayback />
            <LoginBox className="relative z-10" />
          </div>}
        />
        <Route path="/register" element={
          <div className="relative w-full h-screen overflow-hidden">
            <video className="absolute -z-10 object-cover w-full h-full" src="/3130182-uhd_3840_2160_30fps.mp4" autoPlay loop muted playsInline disablePictureInPicture disableRemotePlayback />
            <RegisterBox className="relative z-10" />
          </div>}
        />
        <Route path="/Confirmation" element={
          <div className="relative w-full h-screen overflow-hidden">
            <video className="absolute -z-10 object-cover w-full h-full" src="/3130182-uhd_3840_2160_30fps.mp4" autoPlay loop muted playsInline disablePictureInPicture disableRemotePlayback />
            <ConfirmBox className="relative z-10" />
          </div>} />
      </Routes>

      <Routes>
        <Route path="/Home"
          element={
            <div className="relative w-full min-h-screen overflow-hidden shiny-bg bg-gradient-to-bl from-[#e0e0e0] via-[#bdbdbd] to-[#757575] ">
              
                <ProtectedRoute>
                  <Navbar className = "relative z-10"/>
                  <div className="relative z-10 w-full min-h-screen">
                    <video
                      className="absolute -z-10 object-cover w-full h-full"
                      src="/3129671-uhd_3840_2160_30fps.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      disablePictureInPicture
                      disableRemotePlayback
                    />
                    <Home classname="relative z-10" />
                  </div>
                </ProtectedRoute>
              </div>
          } />
      </Routes>


    </BrowserRouter>
  )
}

export default App
