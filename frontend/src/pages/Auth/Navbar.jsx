import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Navbar() {

    const [isNavActive, setIsNavActive] = useState(false)
    const toggleNav = () => setIsNavActive(a => !a)

    const navigate = useNavigate();
    
    return (
        <>
        {/* Navbar Section */}
        <header className="fixed top-0 w-full bg-[rgba(255,249,246,0.63)] shadow-md flex justify-between items-center px-6 sm:px-28 py-2 z-50">
            <img src="src/assets/ellehacks-logo.png" alt="ElleHacks Logo" className="relative h-16 sm:h-24"/>

            {/* Hamburger Navbar for Mobile Only  */}
            <div className="block lg:hidden w-8 h-5 flex flex-col justify-between cursor-pointer" onClick={toggleNav}>
                <span className="h-1 w-full bg-[#412200] rounded"></span>
                <span className="h-1 w-full bg-[#412200] rounded"></span>
                <span className="h-1 w-full bg-[#412200] rounded"></span>
            </div>

            <div className={`flex-col lg:flex-row lg:flex gap-12 items-center absolute lg:static top-full left-0 right-0 w-full lg:w-auto bg-[rgba(255,249,246,0.85)] lg:bg-transparent p-8 lg:p-0 showdow-md lg:shadow-none ${isNavActive ? 'flex' : 'hidden lg:flex'}`}>
                <NavLink to="/dashboard/home" className="text-[#412200] font-medium hover:text-[#D1A996] text-base lg:text-[22px] text-center ml-3">Home</NavLink>
                <NavLink to="/dashboard/aboutus" className="text-[#412200] font-medium hover:text-[#D1A996] text-base lg:text-[22px] text-center">About Us</NavLink>
                <NavLink to="/dashboard/sponsors" className="text-[#412200] font-medium hover:text-[#D1A996] text-base lg:text-[22px] text-center">Sponsors</NavLink>
                <NavLink to="/dashboard/faq" className="text-[#412200] font-medium hover:text-[#D1A996] text-base lg:text-[22px] text-center">FAQ</NavLink>
                <NavLink to="/dashboard/contact" className="text-[#412200] font-medium hover:text-[#D1A996] text-base lg:text-[22px] text-center">Contact Us</NavLink>
                <NavLink to="/login"> <button className="bg-[#BD7777] text-white border-2 border-[#BD7777] rounded-xl py-2 px-5 text-sm lg:text-[22px] mt-2 lg:mt-0">Login</button></NavLink>
            </div>
        </header>
        </>
  )

}

export default Navbar