import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './views/Register'
import Login from './views/Login'
import Logout from './views/Logout'
import { Route, BrowserRouter as Router, Routes, } from 'react-router-dom'
//import MainWrapper from './layout/Mainwrapper'
import PresidentNavBar from './views/President/PresidentNavBar'
import TuteeNavBar from './views/Tutee/TuteeNavBar'
import TuteeDashBoard from './views/Tutee/TuteeDashBoard'
import TuteeCourseApplication from './views/Tutee/TuteeCourseApplication'
import TutornavBar from './views/Tutor/TutorNavBar'
//  import Register from './views/Register'
import MainWrapper from './layout/Mainwrapper'
import { useAuthstore } from './store/auth'
import TuteePending from './views/Tutee/TuteePending'
import TutorDashBoard from './views/Tutor/TutorDashBoard'
import TutorCourseApplication from './views/Tutor/TutorCourseApplication'
import PresidentDashBoard from './views/President/PresidentDashBoard'
import PairingView from './views/President/PairingView'

export default function App() {
  const { initializeAuth, loading } = useAuthstore();

  useEffect(() => {
    // Initialize auth state when app loads
    initializeAuth();
  }, [initializeAuth]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
    {/* <MainWrapper> */}
      <Router>
     <Routes>
      
      <Route path='/' element={<Login/>} />
      <Route path='/tuteedashboard' element={<TuteeDashBoard/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/tuteecourseapplication' element={<TuteeCourseApplication/>} />
      <Route path='/tuteepending' element={<TuteePending/>}/>
      <Route path='/tutordashboard' element={<TutorDashBoard/>}/>
      <Route path='/tutorcourseapplication' element={<TutorCourseApplication/>}/>
      <Route path='/presidentdashboard' element={<PresidentDashBoard/>}/>
      <Route path ='/pairingview' element={<PairingView/>}/>
     </Routes>
     </Router>
     {/* </MainWrapper> */}

</>
  );

}

