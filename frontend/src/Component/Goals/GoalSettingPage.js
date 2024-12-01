import React, { useEffect, useState } from "react";
import { FaWeight, FaAppleAlt, FaWalking, FaFire } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useUser } from "../Context/UserContext";
import ApiService from "../../Service/ApiService";
import Navbar from "../Dashboard/Navbar";
import { BiTrash } from "react-icons/bi";

const GoalSettingPage = () => {

  const {user} = useUser()

  const [steps,setSets] = useState()

  const [goal,setGoals] = useState([])

  const [foodName,setFoodName] = useState('')
  const [foodQuantity,setFoodQuantity] = useState('')
  const [foodUnit,setFoodUnit] = useState('')

  const [load,setLoad] = useState(false)

  const [stepTarget,setStepTarget] = useState()

  useEffect(()=>{

    const getTodayActivity=async()=>{

      if(user){

        try{

          const response = await ApiService.getActivity(user?.id)

          setSets(Math.floor((response.distance*1000)/0.75))

        }

        catch(err){

          console.log(err)
          
        }

      }

    }

    if(user){

      const fetchAllGoals=async()=>{
        try{

          const response = await ApiService.getAllGoals(user?.id)
          setGoals(response.goalEntities)
        }
        catch(err){
          console.log(err)
        }
      }
      fetchAllGoals();
    }
    
    getTodayActivity();

  },[user,load])

  const [weightGoal, setWeightGoal] = useState({
    target: "",
    timeframe: "weeks",
    current: 70,
    progress: 60
  });

  const [foodGoal, setFoodGoal] = useState({
    items: [
      { name: "", type: "" }
    ]
  });

  const measures = ["Teaspoon (tsp)", "Tablespoon (tbsp)", "Cup", "Milliliter (ml)", "Liter (L)", "Gram (g)", "Kilogram (kg)", "Ounce (oz)", "Pound (lb)", "Pinch", "Dash", "Slice", "Piece", "Bunch","Plate"]

  const [stepGoal, setStepGoal] = useState({
    target: 10000,
    current: 6500
  });

  const [calorieGoal, setCalorieGoal] = useState({
    target: 2000,
    consumed: 1500
  });

  const handleFoodGoal=async()=>{
    try{

      const response = await ApiService.addGoals({goalType:"food",foodName,foodUnit,foodQuantity},user?.id)
      setLoad(!load)

    }
    catch(err){
      console.log(err?.response?.data?.message||"An error occured")
      setLoad(!load)
    }
  }

  const handleStepGoal=async()=>{
    try{

      const response = await ApiService.addGoals({goalType:"steps",stepTarget},user?.id)
      console.log(response)
      setLoad(!load)

    }
    catch(err){
      console.log(err?.response?.data?.message||"An error occured")
      setLoad(!load)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0" style={{zIndex:'9999'}}><Navbar/></div>
      <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Fitness Goal Setting</h1>

        {/* Weight Goal Section */}
        <div className="bg-white p-6 rounded-lg shadow-md pb-12 text-left">
          <div className="flex items-center gap-2 mb-4">
            <FaWeight className="text-blue-500 text-xl" />
            <h2 className="text-xl font-semibold text-gray-700">Weight Goal</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6" >
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Target Weight (kg)</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                value={weightGoal.target}
                onChange={(e) => setWeightGoal({ ...weightGoal, target: e.target.value })}
                placeholder="Enter target weight"
                aria-label="Target Weight"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Timeframe</label>
              <select
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                value={weightGoal.timeframe}
                onChange={(e) => setWeightGoal({ ...weightGoal, timeframe: e.target.value })}
                aria-label="Goal Timeframe"
              >
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
          <div>
            <button className="flex items-left bg-green-400 w-[fit-content] text-white px-4 py-1 my-5 rounded-lg rounded-md hover:bg-green-500 transition-colors duration-300 ease">Set Weight Goal</button>
          </div>
          {/* <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${weightGoal.progress}%` }}
                role="progressbar"
                aria-valuenow={weightGoal.progress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div> */}
        </div>

        {/* Food Goal Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <FaAppleAlt className="text-green-500 text-xl" />
            <h2 className="text-xl font-semibold text-gray-700">Food Goal</h2>
          </div>
          <div className="space-y-4 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  className="p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="Food item"
                  aria-label="Food item name"
                />
                <input
                  type="number"
                  className="p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                  value={foodQuantity}
                  onChange={(e) => setFoodQuantity(e.target.value.toString())}
                  placeholder="Quantity"
                  aria-label="Food quantity"
                />
                <select
                  type="text"
                  className="p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                  value={foodUnit}
                  onChange={(e) => setFoodUnit(e.target.value)}
                  placeholder="Food unit"
                  aria-label="Food unit"
                >
                  <option value="" disabled>Select unit</option>
                  {measures.map((m,index)=>(
                    <option key={index} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            <div className="flex items-center gap-5">
            {/* <button
              onClick={addFoodItem}
              className="flex items-center gap-2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 ease"
              aria-label="Add food item"
              style={{margin:"20px 0"}}
            >
              <IoMdAdd />
              Add Food Item
            </button> */}
            <button onClick={handleFoodGoal} className="flex items-left bg-green-400 w-[fit-content] text-white px-4 py-1 my-5 rounded-lg rounded-md hover:bg-green-500 transition-colors duration-300 ease">
              Set Food Goal
            </button>
            </div>
          </div>
          <div className="text-left flex flex-col gap-4 my-4">
            {goal.filter(g=>g.goalType==="food").map((m,index)=>(
              <div className="flex items-center justify-between">
                <p className="text-gray-400">{m.foodName} {m.foodQuantity+"x"+m.foodUnit.charAt(0)}</p>
                <div>
                  <p className="text-red-500"><BiTrash></BiTrash></p>  
                </div>  
              </div>
            ))}
          </div>
        </div>

        {/* Step Goal Section */}
        <div className="bg-white p-6 rounded-lg shadow-md text-left">
          <div className="flex items-center gap-2 mb-4">
            <FaWalking className="text-purple-500 text-xl" />
            <h2 className="text-xl font-semibold text-gray-700">Step Goal</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Daily Step Goal</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500"
                value={stepTarget}
                onChange={(e) =>setStepTarget(e.target.value)}
                placeholder="Enter step goal"
                aria-label="Daily step goal"
              />
              <p onClick={handleStepGoal} className="text-left cursor-pointer bg-green-400 w-[fit-content] text-white px-4 py-1 my-5 rounded-lg rounded-md hover:bg-green-500 transition-colors duration-300 ease">Set Step Goal</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#9F7AEA"
                    strokeWidth="3"
                    strokeDasharray={`${(steps&&steps / stepTarget) * 100}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-semibold">{steps&&steps}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-left flex flex-col gap-4 my-4">
            {goal.filter(g=>g.goalType==="steps").map((m,index)=>(
              <div className="flex items-center justify-between">
                <p className="text-gray-400">{m.stepTarget} steps</p>
                <div>
                  <p className="text-red-500"><BiTrash></BiTrash></p>  
                </div>  
              </div>
            ))}
          </div>
        </div>

        {/* Calorie Goal Section */}
        <div className="bg-white p-6 rounded-lg shadow-md text-left">
          <div className="flex items-center gap-2 mb-4">
            <FaFire className="text-red-500 text-xl" />
            <h2 className="text-xl font-semibold text-gray-700">Calorie Goal</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 mt-5">Daily Calorie Target</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500"
                value={calorieGoal.target}
                onChange={(e) => setCalorieGoal({ ...calorieGoal, target: e.target.value })}
                placeholder="Enter calorie goal"
                aria-label="Daily calorie target"
              />
              <button className="flex items-left bg-green-400 w-[fit-content] text-white px-4 py-1 my-5 rounded-lg rounded-md hover:bg-green-500 transition-colors duration-300 ease">Set Calorie Goal</button>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Consumed</span>
                <span className="font-semibold text-gray-800">{calorieGoal.consumed} kcal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Remaining</span>
                <span className="font-semibold text-gray-800">
                  {calorieGoal.target - calorieGoal.consumed} kcal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Save Progress
          </button>
        </div>
      </div>
    </div></div>
  );
};

export default GoalSettingPage;