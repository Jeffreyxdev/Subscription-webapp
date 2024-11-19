import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const controls=useAnimation();

  
  const handleHover =() => {
      controls.start({x:[0,-5,5,-5,0], transiton: {duration:0.7}});
    }


  return (
    <>
    {/*Desktop view*/}
    <nav className="nav-full sticky top-0 flex md:flex justify-between pt-5 z-10 h-5">
      <div className="nav-container flex justify-between w-[75%] mx-auto">
        <div>
         {/* <img src="#" alt="logo for page" */}
        </div>
         <ul className="flex justify-around w-[9cm] pt-2 text-[15px]">
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      
      <motion.button
        onHoverStart={handleHover}
        onHoverEnd={()=> controls.start({x:0})}
        animate={controls}
        className="w-[211px] h-[50px] bg-[#FF7143] text-white rounded-xl text-[17px]">Login
      </motion.button>
      </div>
     </nav>
    </>
  )
}

export default Navbar
