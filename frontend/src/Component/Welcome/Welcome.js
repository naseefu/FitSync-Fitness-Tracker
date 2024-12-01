import React from 'react'
import './welcome.css'
import Header from '../Commons/Header'
import { FiArrowRight } from 'react-icons/fi'
import img1 from '../images/hand.png'
import Feature from '../Features/Features'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {

  const navigate = useNavigate()

  return (
    <div className='bg-[#0066EE] text-white'>
      <div className='hero'>
        <Header/>
        <div className='flex flex-col lg:flex-row items-center gap-10'>
          <div className=' p-10 text-left'>
            <h1 className='text-[3.8vw] font-bold w-[100%]'>Your Fitness Journey Starts Here</h1>
            <p className='mt-5 text-gray-300 lg:text-[20px] w-[80%]'>Track your meals, plan your workouts, and achieve your health goals with the power of AI</p>
            <div className='flex items-center pr-4 py-4 mt-10' style={{zIndex:'3',top:'80%',backgroundColor:'#0066EE ',borderRadius:'0 50px 50px 0'}}>
              <button className='px-4 min-w-[200px] py-3 rounded-xl text-white bg-[#151824]  w-[40%]' style={{zIndex:'3',top:'80%'}}>Get Started</button>
              <p onClick={()=>navigate('/questions')} className='text-[#151824] hover:bg-[#151824] hover:text-white transition duration-300 ease cursor-pointer -ml-4 rounded-[25px] bg-white w-[fit-content] px-4 py-4' style={{zIndex:'4'}}><FiArrowRight/></p>
            </div>
          </div>
          <div className='text-left p-10 pr-0 relative items-center min-h-[80vh] max-h-[80vh] flex justify-end items-end min-w-[50vw]'>
            <img className='h-[80vh] min-w-[40vw] rounded-xl object-cover' style={{zIndex:'1'}} 
            // src='https://images.pexels.com/photos/4378962/pexels-photo-4378962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
            src={img1}

            alt='hero'/>
          </div>
        </div>
      </div>
      <div>
        <Feature/>
      </div>
    </div>
  )
}

export default Welcome
