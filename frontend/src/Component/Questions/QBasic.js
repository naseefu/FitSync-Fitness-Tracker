import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Service/ApiService';
import { useUser } from '../Context/UserContext';

const QBasic = ({setQIndex}) => {

  const {user} = useUser()

  const [formData,setFormData] = useState({
    gender:"",
    age:0,
    height:0,
    weight:0
})

useEffect(()=>{
  setQIndex(0)
},[])

useEffect(()=>{

  const fetchBasicFilled=async()=>{
    try{
      const response = await ApiService.basicFilled(user?.id)
      navigate("/questions/diet")
    }
    catch(err){
      console.log(err)
    }
  }
  fetchBasicFilled()

},[user])


const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
};

const navigate = useNavigate()

const [error,setError] = useState('')

  const handleNext=async()=>{
    try{
      const response = await ApiService.handleBasic(formData,user?.id)
      navigate("/questions/diet")
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
        <label className="block mb-2">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block mb-2">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your age"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Height in cm"
          />
        </div>
        <div>
          <label className="block mb-2">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Weight in kg"
          />
        </div>
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

export default QBasic
