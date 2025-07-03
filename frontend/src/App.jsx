import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterBox from './Components/RegisterBox';
import StartBox from './Components/StartBox';
import LoginBox from './Components/LoginBox';
import Homelayout from './Layout/StartLayout';
import ConfirmBox from './Components/ConfirmationBox';
import RouteReload from './RoutesHandling/Reload';
import PublicRoute from './RoutesHandling/PublicRoute';
import ProtectedRoute from './RoutesHandling/ProtectedRoute';
import Dashboard from './Layout/Dashboard';


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
          <Route path="login" element={
            <PublicRoute>
            <LoginBox className = "relative z-10"/>
            </PublicRoute>
            }/>
          <Route path="register" element={
            <PublicRoute>
            <RegisterBox className = "animated-entry relative z-10 "/>
            </PublicRoute>
            }/>
          <Route path="confirmation" element={
            <PublicRoute>
            <ConfirmBox className = "animated-entry relative z-10" />
            </PublicRoute>
            }/>
        </Route>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          </Route>
        
        {/* Add other protected routes here */}
      </Routes>

      </RouteReload>
    </BrowserRouter>
  )
  
}

export default App
