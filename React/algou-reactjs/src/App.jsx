import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Component/Home';
import StartBox from './Component/StartBox';
import LoginBox from './Component/loginbox';
import RegisterBox from './Component/registerbox';
import ConfirmBox from './Component/Confirmbox';
import ProtectedRoute from './Component/Protected';
import Navbar from './Component/navbar';
import Footer from './Component/Footer';
import RouteReload from './Component/routereload';
import ProblemSet from './Component/ProblemSet';
import AdminController from './Component/AdminController';
import ProblemForm from './Component/ProblemForm';
import AdminRouting from './Component/AdminRouting';
import ConfirmProblemBox from './Component/ConfirmProblem';
import AdminProblems from './Component/AdminProblems';

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function App() {

  return (


    <BrowserRouter>
      <ScrollToTop />
      <RouteReload>

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
              <div className="relative w-full flex flex-col min-h-screen overflow-hidden shiny-bg bg-gradient-to-bl from-[#222426] via-[#777676] to-[#1a1a1a]  ">

                <ProtectedRoute>
                  <Navbar className="relative z-10" />
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
                    <Home className="relative z-10" />
                  </div>
                  <div className="relative z-10 w-full min-h-full">
                    <AdminController className="relative z-10" />
                  </div>
                  <Footer className="relative z-10 mt-auto" />
                </ProtectedRoute>
              </div>
            } />

          <Route path="/problems"
            element={
              <div className="relative w-full flex flex-col min-h-screen overflow-hidden shiny-bg bg-gradient-to-bl from-[#222426] via-[#777676] to-[#1a1a1a]  ">
                <ProtectedRoute>
                  <Navbar className="relative z-10" />
                  <div className="relative z-10 flex items-center w-full h-screen">
                    <img src="/pexels-goumbik-574070.jpg" className="absolute -z-10 object-cover w-full h-full" />
                    <h1 className="text-7xl font-gruppo ml-[30px] animated-entry">
                      Problem Sets
                    </h1>
                  </div>
                  <ProblemSet className="relative z-10" />
                  <Footer className="relative z-10 mt-auto" />
                </ProtectedRoute>
              </div>

            }
          />
          <Route path="/createproblemset"
            element={
              <div className="relative w-full flex flex-col min-h-screen overflow-hidden shiny-bg bg-gradient-to-bl from-[#222426] via-[#777676] to-[#1a1a1a] ">
                <ProtectedRoute>
                  <AdminRouting>
                    <Navbar className="relative z-10" />
                    <ProblemForm className="relative z-10" />
                    <Footer className="relative z-10 mt-auto" />
                  </AdminRouting>
                </ProtectedRoute>
              </div>
            }
          />
          <Route path="/ProblemConfirmation"
            element={
              <div className="relative w-full flex flex-col min-h-screen overflow-hidden shiny-bg bg-gradient-to-bl from-[#222426] via-[#777676] to-[#1a1a1a]">
                <ProtectedRoute>
                  <AdminRouting>
                    <ConfirmProblemBox className="relative z-10" />
                  </AdminRouting>
                </ProtectedRoute>
              </div>
            }

          />
          <Route path="/adminProblemSet"
            element={
              <div className="relative w-full flex flex-col min-h-screen overflow-hidden shiny-bg bg-gradient-to-bl from-[#222426] via-[#777676] to-[#1a1a1a]">
                <ProtectedRoute>
                  <AdminRouting>
                    <Navbar className="relative z-10" />
                    <div className="relative z-10 flex items-center w-full h-screen">
                      <img src="/pexels-thisisengineering-3861958.jpg" className="absolute -z-10 object-cover w-full h-full" />
                      <h1 className="text-7xl font-gruppo w-full text-center text-red-800 font-extrabold animated-entry">
                        Admin Problem Sets
                      </h1>
                    </div>
                    <AdminProblems className = "relative z-10"/>
                    <Footer className="relative z-10 mt-auto" />
                  </AdminRouting>
                </ProtectedRoute>
              </div>
            }
          />
          <Route path="/edit-problem/:id"
          element={
            <div className="relative w-full flex flex-col min-h-screen overflow-hidden shiny-bg bg-gradient-to-bl from-[#222426] via-[#777676] to-[#1a1a1a]">
              <ProtectedRoute>
                <AdminRouting>
                  <Navbar className="relative z-10" />
                  <ProblemForm className="relative z-10" />
                  <Footer className="relative z-10 mt-auto" />
                </AdminRouting>
              </ProtectedRoute>
            </div>
          }
          />
        </Routes>

      </RouteReload>
    </BrowserRouter>
  )
}

export default App
