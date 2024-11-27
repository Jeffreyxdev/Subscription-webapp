 
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { itemVariants, sideVariants } from "../Utils/Motion";
import Logo from '../assets/logo (3).png'
import { Link } from "react-router-dom";

const Navbar = ({GoogleSignout, isAuth}) => {
  const controls=useAnimation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleHover =() => {
      controls.start({x:[0,-5,5,-5,0], transiton: {duration:0.7}});
    };
    const handleMobileMenuToggle = () => {
      setIsMobileMenuOpen((prevState) => !prevState);
    };

  return (
    <>
    {/*Desktop view*/}
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 ">
      <div className="nav-container flex justify-between w-[75%] mx-auto">
        <div className="flex items-center">
          <img src={Logo} alt="logo for page" className=" h-[13vh] mt-[-18px] " />
        </div>
     
         <ul className="hidden md:flex items-center space-x-8">
          
       <Link to={'/'}  className="text-gray-700 hover:text-gray-900 "> <li>Home</li></Link>
        <Link to={'/features'}  className="text-gray-700 hover:text-gray-900"><li>Features</li></Link>
       <Link to={'/pricing'}  className="text-gray-700 hover:text-gray-900"> <li>Pricing</li></Link>
        <li>Blog</li>
      </ul>
      {

      !isAuth?(
      <Link to={'/login'}>
      <motion.button
        onHoverStart={handleHover}
        onHoverEnd={()=> controls.start({x:0})}
        animate={controls}
        className="w-[211px] h-[50px] bg-gradient-to-r from-blue-600 to-blue-900  text-white rounded-xl text-[17px]">Login
      </motion.button></Link>):(
        <>
        <button className="w-[211px] h-[50px] bg-[#ff5242] hover:bg-[#ff6b5b] rounded-xl text-[17px] mt-4" onClick={GoogleSignout}>Sign out</button>
        </>
      )
      }
      </div>
    </nav>



       {/* Mobile Navbar */}
      
    
       <nav className="md:hidden flex justify-center fixed z-10 w-[90vw] h-[15vh] ">
        <div className="nav-container pt-5 flex justify-between w-[90%]">
            <div className="">
              <img src={Logo} alt="Logo for page" className="h-[10vh] mt-[-18px]" />
            </div>

            {/* Mobile menu button (hamburger) */}
            <div
              onClick={handleMobileMenuToggle}
            
            >
              {isMobileMenuOpen ? (
                <MdOutlineClose  className="w-[50px] h-[45px] p-2 cursor-pointer"/>
              ) : (
                <div className=" flex justify-center items-center h-[100%] pb-9">
                 <IoMdMenu className="w-[60px] h-[60px] p-2 cursor-pointer "/>
                </div>
              )}
            </div>
          </div>
        </nav>


             {/* Mobile Menu */}
      <AnimatePresence>
      {isMobileMenuOpen && (
          <motion.aside
          initial={{ width: 0 }}
          animate={{
            width: 500
          }}
          exit={{
            width: 0,
            transition: { delay: 0.3, duration: 0.1 }
          }}
         >
        <motion.div 
        initial="closed"
        animate="open"
        exit="closed"
        variants={sideVariants}
        className="container md:hidden flex flex-col fixed bg-[#272727d0] text-white w-[55vw] ml-[35vw] mt-[10vh] h-[350px] items-end pr-[18vw] z-10 rounded-2xl pt-4">
          <ul className="text-[20px] mr-[-25px] p-5">
            <motion.li variants={itemVariants} className="mb-6">Home</motion.li>
            <motion.li variants={itemVariants} className="mb-6">Features</motion.li>
            <motion.li variants={itemVariants} className="mb-6">Pricing</motion.li>
            <motion.li variants={itemVariants} className="mb-6">Blog</motion.li>
          </ul>
          <Link to={'/login'}>
          <motion.button
            variants={itemVariants}
            className="w-[150px] h-[48px] bg-[#ffce2c] text-white rounded-xl text-[14px] mt-4 mr-[-2.8em]"
          >
            Get Started
          </motion.button>
          </Link>
        </motion.div>
        </motion.aside>
      )}
      

</AnimatePresence>


    </>
  )
}

export default Navbar
