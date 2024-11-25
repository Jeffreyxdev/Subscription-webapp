import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import picture from "../assets/bc98c9dcc76893a46fc71f3920846a05.gif";
import { auth, provider } from "../Firebase/firebase-conig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleBtn from "./GoogleBtn";
import { useState } from "react";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = ({ setIsAuth }) => {
  const [formData, setFormData] = useState(initialState);

  const { username, email, password, confirmPassword } = formData;

  let navigate = useNavigate();

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please, fill in all input fields.");
      return false; 
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false; 
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false; 
    }
    return true; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; 

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: username });
      toast.success("Signup successful");
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      setFormData(initialState); 
      navigate("/");
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("This email is already registered. Please use a different email.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email format. Please enter a valid email address.");
          break;
        case "auth/weak-password":
          toast.error("Weak password. Password must be at least 6 characters long.");
          break;
        default:
          toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  return (
    <>
      <div className="signupPage">
        <div className="w-full min-h-screen flex flex-col md:flex-row items-start">
      
          <div className="relative w-full md:w-1/2 h-64 md:h-full flex flex-col">
            <img src={picture} className="w-full h-full object-cover pic" alt="Signup" />
          </div>

       
          <motion.div
            className="w-full md:w-1/2 h-auto flex flex-col p-8 md:p-28 justify-between"
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 75 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="w-full flex flex-col">
              <div className="w-full flex flex-col mb-2">
                <h3 className="text-xl md:text-4xl font-semibold mb-2">Signup</h3>
                <p className="text-sm md:text-base mb-2">
                  Welcome to our online family! Enter your credentials
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="w-full flex flex-col">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full text-white py-2 md:py-4 my-2 bg-transparent border-b border-white outline-none focus:outline-none"
                    value={username}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full text-white py-2 md:py-4 my-2 bg-transparent border-b border-white outline-none focus:outline-none"
                    value={email}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full text-white py-2 md:py-4 my-2 bg-transparent border-b border-white outline-none focus:outline-none"
                    value={password}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full text-white py-2 md:py-4 my-2 bg-transparent border-b border-white outline-none focus:outline-none"
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full flex flex-col my-4">
                  <button
                    type="submit"
                    className="w-full text-white bg-gradient-to-r from-blue-600 to-blue-900 rounded-md py-3 md:py-4 text-center flex items-center justify-center"
                  >
                    Signup
                  </button>
                </div>
              </form>
            </div>

            <GoogleBtn setIsAuth={setIsAuth} />

            <div className="w-full flex items-center justify-center">
              <p className="text-xs md:text-sm font-normal text-white">
                Have an account?
                <Link
                  to="/login"
                  className="font-semibold underline underline-offset-2 cursor-pointer"
                >
                  {" "}
                  Click here
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Signup;