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
import ProblempageLayout from './Layout/ProblempageLayout';
import Adminpagelayout from './Layout/adminpagelayout';
import CreateSpaceLayout from './Layout/CreateProblemlayout';
import ProtectedRoute from './RoutesHandling/ProtectedRoute';
import AdminRoute from './RoutesHandling/AdminRoute';
import ConfirmBoxLayout from './Layout/ConfirmProblemLayout';
import AdminProblemLayout from './Layout/adminProblemslayout';
import ProblemSpaceLayout from './Layout/ProblemSpace';






function App() {
  function ScrollToTop() {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
      console.log('ScrollToTop triggered')
    }, [location.key]);
    return null;
  }


  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteReload>

        <Routes>
          <Route path="/" element={<Homelayout className="relative" />}>
            <Route index element={<StartBox className="animated-entry relative z-10" />} />
            <Route path="login" element={<LoginBox className="relative z-10" />} />
            <Route path="register" element={<RegisterBox className="animated-entry relative z-10 " />} />
            <Route path="confirmation" element={<ConfirmBox className="animated-entry relative z-10" />} />
          </Route>
          <Route path='/dashboard' >
            <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="problems" >
              <Route index element={<ProtectedRoute><ProblempageLayout /></ProtectedRoute>} />

              <Route path="Problemdescription/:id" element={<ProtectedRoute><ProblemSpaceLayout /></ProtectedRoute>} />

            </Route>


            <Route path="adminspace" >
              <Route index element={<ProtectedRoute><AdminRoute><Adminpagelayout /></AdminRoute></ProtectedRoute>} />
              <Route path="createproblemset">
                <Route index element={<ProtectedRoute><AdminRoute><CreateSpaceLayout /></AdminRoute></ProtectedRoute>} />
                <Route path="problemconfirmation" element={<ProtectedRoute><AdminRoute><ConfirmBoxLayout /></AdminRoute></ProtectedRoute>} />
              </Route>
              <Route path="Adminproblems" >
                <Route index element={<ProtectedRoute><AdminRoute><AdminProblemLayout /></AdminRoute></ProtectedRoute>} />
                <Route path="editproblem/:id" element={<ProtectedRoute><AdminRoute><CreateSpaceLayout /></AdminRoute></ProtectedRoute>} />
                <Route path="problemconfirmation" element={<ProtectedRoute><AdminRoute><ConfirmBoxLayout /></AdminRoute></ProtectedRoute>} />
              </Route>
            </Route>

          </Route>
        </Routes>
      </RouteReload>
    </BrowserRouter>
  )

}

export default App
