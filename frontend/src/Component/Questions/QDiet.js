import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Service/ApiService';
import { useUser } from '../Context/UserContext';

const QDiet = ({setQIndex}) => {

  const [formData,setFormData] = useState({
    dietType:"",
    foodAllergies: []

  })
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

  useEffect(()=>{
    setQIndex(1)
  },[])

  const navigate = useNavigate()

  const [error,setError] = useState('')

  const {user} = useUser()

  useEffect(()=>{
    
    const fetchDietFilled=async()=>{
      try{
        const response = await ApiService.dietFilled(user?.id)
        navigate("/questions/life-style")
      }
      catch(err){

      }
    }
    fetchDietFilled()

  },[user])

  const handleNext=async()=>{
    try{
      const response = await ApiService.handleDiet(formData,user?.id)
      navigate("/questions/life-style")
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
        <label className="block mb-2">Diet Type</label>
        <select
          name="dietType"
          value={formData.dietType}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Diet Type</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="keto">Keto</option>
          <option value="paleo">Paleo</option>
          <option value="omnivore">Omnivore</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 py-3">Food Allergies</label>
        <div className="grid grid-cols-2 gap-4">
          {["Nuts", "Dairy", "Eggs", "Soy", "Gluten", "Shellfish"].map(
            (allergy) => (
              <label key={allergy} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.foodAllergies.includes(allergy)}
                  onChange={() => handleMultiSelect("foodAllergies", allergy)}
                  className="form-checkbox text-blue-500"
                />
                <span>{allergy}</span>
              </label>
            )
          )}
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

export default QDiet
