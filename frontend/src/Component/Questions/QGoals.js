import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../Context/UserContext'
import ApiService from '../../Service/ApiService'

const QGoals = ({setQIndex}) => {

  const [formData,setFormData] = useState({
    resultTimeline:"",
    motivations: []

  })

  useEffect(()=>{
  setQIndex(4)
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
        const response = await ApiService.goalsFilled(user?.id)
        navigate("/dashboard")
      }
      catch(err){

      }
    }
    fetchDietFilled()

  },[user])

  const handleNext=async()=>{
    try{
      const response = await ApiService.handleGoals(formData,user?.id)
      navigate("/dashboard")
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
        <label className="block mb-2 py-3">Motivations</label>
        <div className="grid grid-cols-2 gap-4">
          {[
            "Weight Loss",
            "Muscle Gain",
            "Better Health",
            "Increased Energy",
            "Stress Relief",
            "Athletic Performance"
          ].map((motivation) => (
            <label key={motivation} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.motivations.includes(motivation)}
                onChange={() => handleMultiSelect("motivations", motivation)}
                className="form-checkbox text-blue-500"
              />
              <span>{motivation}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-2 py-3">Result Timeline</label>
        <select
          name="resultTimeline"
          value={formData.resultTimeline}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Timeline</option>
          <option value="1-3">1-3 months</option>
          <option value="3-6">3-6 months</option>
          <option value="6-12">6-12 months</option>
          <option value="12+">12+ months</option>
        </select>
      </div>
      <div className="flex items-center justify-between mt-10">
        <p className='text-red-500 text-[14px]'>{error}</p>
        <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 text-white mt-3 rounded-lg font-medium bg-green-500 hover:bg-green-600 transition-all duration-300"
        >
          Submit
        </button>
          </div>
    </div>
  )
}

export default QGoals
