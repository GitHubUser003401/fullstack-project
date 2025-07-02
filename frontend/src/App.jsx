import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterBox from './Components/RegisterBox';
import StartBox from './Components/StartBox';
import LoginBox from './Components/LoginBox';
import Homelayout from './Layout/StartLayout';
import ConfirmBox from './Components/ConfirmationBox';
import RouteReload from './Layout/Reload';


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
        <Route path="/" element={<Homelayout className = "relative" />}>
          <Route index element={<StartBox className = "animated-entry relative z-10"/>}/> 
          <Route path="login" element={<LoginBox className = "relative z-10"/>}/>
          <Route path="register" element={<RegisterBox className = "animated-entry relative z-10 "/>}/>
          <Route path="confirmation" element={<ConfirmBox className = "animated-entry relative z-10" />}/>
        </Route>
      </Routes>
      </RouteReload>
    </BrowserRouter>
  )
  
}

export default App
