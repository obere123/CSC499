import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './views/Register'
import Login from './views/Login'
import Logout from './views/Logout'
import { Route, BrowserRouter, Routes, } from 'react-router-dom'
import MainWrapper from './layout/Mainwrapper'
import PresidentNavBar from './views/President/PresidentNavBar'
import TuteeNavBar from './views/Tutee/TuteeNavBar'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    
      <BrowserRouter>
     <Routes>
      <Route path='/' element={<TuteeNavBar/>} />
      
      
     </Routes>
     </BrowserRouter>


  );

}

