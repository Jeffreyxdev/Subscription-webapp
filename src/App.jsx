import { Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import { useState } from "react"
import CreateAcount from "./Pages/CreateAcount"
import Services from "./InnerPage/Services"
import SubPlans from "./InnerPage/SubPlans"
import Login from "./Pages/Login"
import { signOut } from "firebase/auth";
import { auth } from "./Firebase/firebase-conig";
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"
const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
    window.location.pathname = "/login"
    })
  }

  return (
     <>
     <ToastContainer position="top-right" theme="colored"/>
    
    <Navbar handleSignOut={signUserOut} isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home  isAuth={isAuth}/>} />
        <Route path="/features" element={<Services isAuth={isAuth}/>}/>
        <Route path="/pricing" element={<SubPlans isAuth={isAuth}/>}/>
        <Route path="/login" element={<Login  setIsAuth={setIsAuth}/>}/>      
        <Route path="/create" element={<CreateAcount setIsAuth={setIsAuth}/>}/>
      </Routes>
    </>
  )
}

export default App
