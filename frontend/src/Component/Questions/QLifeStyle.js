import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Service/ApiService';
import { useUser } from '../Context/UserContext';

const QLifeStyle = ({setQIndex}) => {

  const [formData,setFormData] = useState({
    activityLevel:"",
    sleepDuration:""
  })
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
};

const navigate = useNavigate()

const [error,setError] = useState('')

const {user} = useUser()

useEffect(()=>{
    
    const fetchDietFilled=async()=>{
      try{
        const response = await ApiService.lifeFilled(user?.id)
        navigate("/questions/excercise")
      }
      catch(err){

      }
    }
    fetchDietFilled()

  },[user])

  const handleNext=async()=>{
    try{
      const response = await ApiService.handleLife(formData,user?.id)
      navigate("/questions/excercise")
    }
    catch(err){
      setError(err.response?.data?.message || "An error occured")
    }
  }

  useEffect(()=>{
    if(error){
      const timer = setTimeout(()=>{
        setError('')
      },5000)

      return ()=>clearTimeout(timer)

    }
  })

  useEffect(()=>{
  setQIndex(2)
},[error])

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-2">Daily Activity Level</label>
        <select
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Activity Level</option>
          <option value="sedentary">Sedentary</option>
          <option value="light">Lightly Active</option>
          <option value="moderate">Moderately Active</option>
          <option value="very">Very Active</option>
          <option value="extra">Extra Active</option>
        </select>
      </div>

      <div>
        <label className="block mb-2">Sleep Duration (hours)</label>
        <input
          type="number"
          name="sleepDuration"
          value={formData.sleepDuration}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Hours of sleep per night"
        />
      </div>
      <div className="flex items-center justify-between mt-10">
        <p className='text-red-500 text-[14px]'>{error}</p>
        <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 text-white mt-3 rounded-lg font-medium bg-blue-500 hover:bg-blue-600 transition-all duration-300"
        >
          Next
        </button>
          </div>
    </div>
  )
}

export default QLifeStyle
