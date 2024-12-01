import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate()

  return (
    <div className='bg-[#0066EE] text-white flex items-center justify-between p-10 py-5 '>
      <div>
        <h1 className='text-left md:text-[20px]'>FitSync</h1>
      </div>
      <div className='flex items-center gap-3 pr-10'>
        <p onClick={()=>navigate('/register')} className='cursor-pointer hover:bg-blue-800 px-4 py-1 transition duration-300 rounded-lg'>Create Account</p>
        <p onClick={()=>navigate('/sign-in')} className='cursor-pointer hover:bg-blue-800 px-4 py-1 transition duration-300 rounded-lg'>Sign in</p>
      </div>
    </div>
  )
}

export default Header
