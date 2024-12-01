import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Service/ApiService';
import { useUser } from '../Context/UserContext';

const QExcercise = ({setQIndex}) => {

  const [formData,setFormData] = useState({
    frequency:"",
    workoutTypes:[]
  })

  useEffect(()=>{
  setQIndex(3)
},[])
    const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value]
    }));
  };

  const navigate = useNavigate()

  const [error,setError] = useState('')

  const {user} = useUser()

  useEffect(()=>{
    
    const fetchDietFilled=async()=>{
      try{
        const response = await ApiService.excerciseFilled(user?.id)
        navigate("/questions/goals")
      }
      catch(err){

      }
    }
    fetchDietFilled()

  },[user])

  const handleNext=async()=>{
    try{
      const response = await ApiService.handleExcercise(formData,user?.id)
      navigate("/questions/goals")
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

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-2">Workout Types</label>
        <div className="grid grid-cols-2 gap-4">
          {[
            "Cardio",
            "Strength Training",
            "HIIT",
            "Yoga",
            "Pilates",
            "Sports"
          ].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.workoutTypes.includes(type)}
                onChange={() => handleMultiSelect("workoutTypes", type)}
                className="form-checkbox text-blue-500"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-2">Workout Frequency</label>
        <select
          name="frequency"
          value={formData.frequency}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Frequency</option>
          <option value="1-2">1-2 times per week</option>
          <option value="3-4">3-4 times per week</option>
          <option value="5+">5+ times per week</option>
        </select>
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

export default QExcercise
