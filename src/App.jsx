import { Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import CreateAcount from "./Pages/CreateAcount"
import Services from "./InnerPage/Services"
import SubPlans from "./InnerPage/SubPlans"
import Login from "./Pages/Login"
const App = () => {
  return (
     <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/features" element={<Services/>}/>
        <Route path="/pricing" element={<SubPlans/>}/>
        <Route path="/login" element={<Login/>}/>      
        <Route path="/create" element={<CreateAcount/>}/>
      </Routes>
    </>
  )
}

export default App
