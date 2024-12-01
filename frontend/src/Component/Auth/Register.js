import React, { useEffect, useState } from 'react'
import './register.css'
import { MdKitchen } from 'react-icons/md'
import { PiCookingPot } from 'react-icons/pi'
import Bitmojees from '../bitmoji/Bitmojees'
import { BiArrowFromLeft, BiError } from 'react-icons/bi'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiActivity, FiArrowUpRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import ApiServices from '../../Service/ApiService'

const Register = () => {

  const [firstname,setFirstname] = useState()
  const [lastname,setLastname] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [confirmpassword,setConfirmPassword] = useState()
  const [avatar,setAvatar] = useState()
  const [dob,setDob] = useState()
  const [phonenumber,setPhonenumer] = useState()
  const [accept,setAccept] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState({})

  const [buttonState, setButtonState] = useState("initial"); // initial, loading, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async() => {

    setButtonState("loading")

    try{
  
      const response = await ApiServices.registerUser({accept,avatar,dob,email,firstname,lastname,password,phonenumber},confirmpassword)
      console.log(response)
      setButtonState("initial")
      navigate("/sign-in")

    }
    catch(err){
      setError(err.response?.data?.message || "An error occured")
      setButtonState("initial")
    }
  };

  useEffect(()=>{
    if(error){
      const timeout = setTimeout(()=>{
        setError('')
      },5000)

      return ()=>clearInterval(timeout)
    }
    
  },[error])



  const getButtonContent = () => {
    switch (buttonState) {
      case "loading":
        return (
          <span className="flex items-center justify-center">
            <AiOutlineLoading3Quarters className="animate-spin mr-2" />
            Processing...
          </span>
        );
      case "error":
        return (
          <span className="flex items-center justify-center">
            <BiError className="mr-2" />
            Error
          </span>
        );
      default:
        return "Let's Go";
    }};

  const buttonClasses = `
    relative
    inline-flex
    items-center
    justify-center
    px-6
    py-1
    text-base
    font-medium
    text-white
    transition-all
    duration-300
    ease-in-out
    rounded-lg
    shadow-md
    hover:shadow-lg
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    focus:ring-green-500
    disabled:opacity-50
    disabled:cursor-not-allowed
    ${buttonState === "initial" ? "bg-green-500 hover:bg-green-600" : ""}
    ${buttonState === "loading" ? "bg-green-500 cursor-wait" : ""}
    ${buttonState === "error" ? "bg-red-500 hover:bg-red-600" : ""}
    sm:text-sm
    md:text-base
    lg:text-lg
    min-w-[250px]
    sm:w-auto
  `;

  const [indes,setIndes] = useState()

  const printUrl=(url,i)=>{

    setAvatar(url)
    setIndes(i)

  }



  const navigate = useNavigate()

  return (
    <div className='registermain grid grid-cols-2 max-h-screen overflow-hidden'>
      
      <div className='video-register relative'>
        <video className='h-screen' style={{width:"100%",objectFit:'cover'}} src='https://videos.pexels.com/video-files/7671782/7671782-uhd_1440_2732_25fps.mp4' autoPlay loop muted playsInline/>
        <p  className='absolute text-white transition-bg flex items-center gap-2 m-5 bg-black p-2 pl-4 pr-4 cursor-pointer border rounded-xl border-black hover:bg-gray-950' style={{zIndex:'1',top:"0",right:"0"}} onClick={()=>navigate('/sign-in')}>Sign in<span><FiArrowUpRight/></span></p>
      </div>

      <div className='registerfields mt-10 p-10 pt-0 overflow-auto max-h-[calc(90vh)] overflow-auto'>
        <div>

          <h1 className='text-left flex items-center gap-3 text-1xl font-bold'>
            <span><FiActivity color='#0066ee'/></span> FitSync
          </h1>

        </div>

        <div style={{width:"fit-content"}}>
          <h1 className='text-left mt-10 text-3xl font-bold lg:text-4xl xl:text-5xl'>Welcome to FitSync</h1>
          <p className='text-left text-1xl text-gray-500 mt-3 lg:text-1xl xl:text-[calc(18px)]'>Create Your FitSync Account</p>
        </div>

        <div className='flex flex-col items-start mt-10 gap-10 align-start'>

          <div className='flex flex-col items-start gap-1'>
            <label>First Name</label>
            <input className='border border-gray-200 rounded-lg' value={firstname} onChange={(e)=>setFirstname(e.target.value)}></input>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <label>Last Name</label>
            <input className='border border-gray-200 rounded-lg' value={lastname} onChange={(e)=>setLastname(e.target.value)}></input>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <label>Email</label>
            <input className='border border-gray-200 rounded-lg' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <label>Date of Birth</label>
            <input className='border border-gray-200 rounded-lg ' type='date' value={dob} onChange={(e)=>setDob(e.target.value)}></input>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <label>Phone Number</label>
            <input className='border border-gray-200 rounded-lg' type='number' value={phonenumber} onChange={(e)=>setPhonenumer(e.target.value)}></input>
          </div>

          <div className='flex flex-col items-start align-start gap-2'>
            <label>Avatar</label>
            <Bitmojees indes={indes} printUrl={printUrl}/>
          </div>

          <div className='flex flex-col items-start gap-2'>
            <label>Password</label>
            <input type='password' className='border border-gray-200' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
          </div>

          <div className='flex flex-col items-start gap-2'>
            <label>Confirm Password</label>
            <input type='password' className='border border-gray-200' value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)}></input>
          </div>

          <div className='flex flex-row items-center gap-2'>
            <input type='checkbox' style={{width:"15px",height:"15px",border:'1px solid transparent',outline:"none"}} checked={accept} onChange={(e)=>setAccept(e.target.checked)}></input>
            <label>Accept Terms of Services</label>
          </div>

        </div>
        <div className='flex items-start mt-10'>
          <button
        onClick={handleClick}
        disabled={buttonState === "loading"}
        className={buttonClasses}
        aria-busy={buttonState === "loading"}
        aria-label={buttonState === "loading" ? "Processing" : "Click Me Button"}
        role="button"
      >
        {getButtonContent()}
      </button>
        </div>
        {error&&<div>
          <p className='text-left m-5 ml-0 mr-0 text-red-500'>{error}</p>
        </div>}

        <div>
          <p className='text-left mt-6'>Already have an Account? <span className='text-gray-500 cursor-pointer' onClick={()=>navigate('/sign-in')}>Sign in</span></p>
        </div>

      </div>

    </div>
  )
}

export default Register
