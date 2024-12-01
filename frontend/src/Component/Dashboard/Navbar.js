import React, { useState } from 'react'
import { FiActivity, FiHome, FiMenu, FiTarget, FiUser } from 'react-icons/fi'
import { IoFastFoodOutline } from 'react-icons/io5';
import { useUser } from '../Context/UserContext';
import { BiLogOut } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {user} = useUser()
  const {logout} = useUser()

  const navigate = useNavigate()

  const handleLogout=()=>{
    logout()
    navigate('/sign-in')
  }

  return (
    <div>
    <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <FiActivity className="h-8 w-8 text-[#0066ee]" />
              <span className="ml-2 text-xl font-semibold">FitSync</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <NavItem icon={<FiHome />} text="Dashboard" to="/dashboard" />
              <NavItem icon={<IoFastFoodOutline />} text="Food" to="/food-page" />
              <NavItem icon={<FiActivity />} text="Report" to="/progress-report" />
              <NavItem icon={<FiTarget />} text="Goals" to="/goals" />
              {user?<NavItem className="cursor-pointer" to="/profile" icon={<FiUser />} text={user.firstname} />:<NavItem icon={<FiUser />} text="Profile" to="/dashboard" />}
              {user&&<p onClick={handleLogout} className="flex items-center cursor-pointer text-gray-700 hover:text-[#0066ee] transition-colors" ><span className='mr-2'><BiLogOut/></span>Logout</p>}
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg flex flex-col items-center">
          <div className="px-2 pt-2 space-y-1 flex flex-col gap-5 pt-5 pb-10 items-center text-[17px]">
            <MobileNavItem icon={<FiHome />} text="Dashboard" to="/dashboard" />
            <MobileNavItem icon={<IoFastFoodOutline />} text="Food" to="/food-page"/>
            <MobileNavItem icon={<FiActivity />} text="Report" to="/progress-report"/>
            <MobileNavItem icon={<FiTarget />} text="Goals" to="/goals"/>
            {user?<MobileNavItem icon={<FiUser />} text={user.firstname} />:<MobileNavItem icon={<FiUser />} text="Profile" />}
          </div>
        </div>
      )}
      </div>
  )
}
const NavItem = ({ icon, text,to }) => (
  <NavLink
    activeclassname="active"
    to={to}
    className="flex items-center cursor-pointer text-gray-700 hover:text-[#0066ee] transition-colors"
  >
    {icon}
    <span className="ml-2">{text}</span>
  </NavLink>
);

const MobileNavItem = ({ icon, text,to }) => (
  <NavLink
    activeclassname="active"
    to={to}
    className="flex items-center cursor-pointer text-gray-700 hover:text-[#0066ee] transition-colors"
  >
    {icon}
    <span className="ml-2">{text}</span>
  </NavLink>
);

export default Navbar
