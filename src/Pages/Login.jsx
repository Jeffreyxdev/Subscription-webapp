import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase-conig";
import { signInWithEmailAndPassword } from "firebase/auth";
import {AiFillEyeInvisible,AiOutlineMail,AiFillEye} from 'react-icons/ai';
import GoogleBtn from "./GoogleBtn";
import { toast } from "react-toastify";
const initialstate ={
  email: "",
  password: "",
};

const Login= ({setIsAuth}) => {
  const [formData, setFormData] = useState(initialstate);
  const { email, password } = formData;
  const navigate = useNavigate();

    const handleSubmit = async(e) => {
      e.preventDefault();
      // Handle login logic here
    
      if (!email || !password) {
        toast.error("Please, fill in all input fields");
        setEmailValid(email ? true : false);
        setPasswordValid(password ? true : false);
        return;
      }
  
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("isAuth", true);
        toast.success("Log in successfully!");
        setIsAuth(true);
        navigate("/");
      } catch (error) {
        toast.error("Invalid credentials");
        console.error(error);
      }
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  
      if (name === "email") setEmailValid(value.trim() !== "");
      if (name === "password") setPasswordValid(value.trim() !== "");
    };
  
  
    //toggling for password eye
    const [passwordEye, setPasswordEye] = useState(false);
    const handlePasswordEye = () => {
      setPasswordEye(!passwordEye)
    }
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 dark:bg-[#e8edea]  rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
          
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <div  className='my-2 w-full relative'>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-2  border-gray-400 bg-transparent focus:ring-blue-400"
                placeholder="Enter your email"
                value={email}
                onChange={handleChange}
                
              />
               <AiOutlineMail className='absolute right-4 top-4 text-gray-400' />
               </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <div className='my-2 w-full relative '>
              <input
                type={(passwordEye === false) ? 'password' : 'text'}
                id="password"
                className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-2  border-gray-400 bg-transparent focus:ring-blue-400"
                placeholder="Enter your password"
                value={password}
                onChange={handleChange}
               
              />
         
         <div className='absolute right-4 top-4'>
                  {(passwordEye === false) ? <AiFillEyeInvisible onClick={handlePasswordEye} className='text-gray-400'/> : <AiFillEye onClick={handlePasswordEye} className='text-gray-400'/>}
                </div>
                </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-[#ffce2c] rounded-lg hover:bg-[#ffd564] focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
            <GoogleBtn setIsAuth={setIsAuth} />
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/create">
            <a href="#" className="text-blue-500 hover:underline">
              Sign up
            </a></Link>
          </p>
        </div>
      </div>
  )
}

export default Login
