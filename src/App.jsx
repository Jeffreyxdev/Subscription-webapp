import { Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import { useState } from "react"
import CreateAcount from "./Pages/CreateAcount"
import Services from "./InnerPage/Services"
import SubPlans from "./InnerPage/SubPlans"
import Login from "./Pages/Login"
import { signOut } from "firebase/auth";
import { Analytics } from "@vercel/analytics/react"
import { auth } from "./Firebase/firebase-conig";
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"
import Product from "./Pages/Product"
const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const GoogleSignout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
    window.location.pathname = "/login"
    })
  }

  return (
     <>
     <ToastContainer position="top-right" theme="colored"/>
     
    <Navbar GoogleSignout={GoogleSignout} isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home  isAuth={isAuth}/>} />
        <Route path="/features" element={<Services isAuth={isAuth}/>}/>
        <Route path="/pricing" element={<SubPlans isAuth={isAuth}/>}/>
        <Route path="/login" element={<Login  setIsAuth={setIsAuth}/>}/>      
        <Route path="/create" element={<CreateAcount setIsAuth={setIsAuth}/>}/>
        <Route path="/product" element={<Product isAuth={isAuth}/>}/>
      </Routes>
      Analytics()
    </>
  )
}

export default App
