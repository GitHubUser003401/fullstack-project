import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterBox from './Components/RegisterBox';
import StartBox from './Components/StartBox';
import LoginBox from './Components/LoginBox';
import Homelayout from './Layout/StartLayout';
import ConfirmBox from './Components/ConfirmationBox';
import RouteReload from './RoutesHandling/Reload';
import Dashboard from './Layout/Dashboard';
import { useSelector } from 'react-redux';
import ProblempageLayout from './Layout/ProblempageLayout';
import Adminpagelayout from './Layout/adminpagelayout';
import CreateSpaceLayout from './Layout/CreateProblemlayout';
import ProtectedRoute from './RoutesHandling/ProtectedRoute';
import AdminRoute from './RoutesHandling/AdminRoute';


function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function App() {

  const isAuthenticated = useSelector((state => state.auth.isAuthenticated));
  const role = useSelector((state => state.auth.user?.Role));
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteReload>

        <Routes>
          <Route path="/" element={<Homelayout className="relative" />}>
            <Route index element={<StartBox className="animated-entry relative z-10" />} />
            <Route path="login" element={ <LoginBox className="relative z-10" /> } />
            <Route path="register" element={<RegisterBox className="animated-entry relative z-10 " />} />
            <Route path="confirmation" element={<ConfirmBox className="animated-entry relative z-10" />} />
          </Route>
          <Route path='/dashboard' >
            <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="problems" element={<ProtectedRoute>< ProblempageLayout /></ProtectedRoute>} />
            <Route path="adminspace" >
              <Route index element={ <ProtectedRoute><AdminRoute><Adminpagelayout /></AdminRoute></ProtectedRoute>} />
              <Route path="createproblemset" element={<ProtectedRoute><AdminRoute><CreateSpaceLayout /></AdminRoute></ProtectedRoute> } />
            </Route>

          </Route>
        </Routes>
      </RouteReload>
    </BrowserRouter>
  )

}

export default App
