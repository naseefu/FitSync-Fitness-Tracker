import React, { useState, useEffect } from "react";
import { FiSearch, FiChevronDown, FiUser, FiBarChart2, FiHome, FiActivity, FiBook } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Navbar from "./Navbar";
import { useUser } from "../Context/UserContext";
import ApiService from "../../Service/ApiService";
import { useNavigate } from "react-router-dom";

const FitnessPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("strength");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(null);


  const progressData = [
    { week: "Week 1", weight: 150 },
    { week: "Week 2", weight: 148 },
    { week: "Week 3", weight: 145 },
    { week: "Week 4", weight: 143 }
  ];

  const {user} = useUser()

  const [suggExc,setSuggExc] = useState([])

  const [excId,setExcId] = useState()

  const [goal,setGoals] = useState([])

  const [allWorkouts,setAllWorkout]= useState([])

  useEffect(()=>{

    if(user){

      const fetchWorkoutSuggestions=async()=>{
        try{
          const response = await ApiService.getWorkOutSuggestions(user?.id)
          setExcId(response.userWorkouts.id)
          setSuggExc(response.workoutEntityts)
        }
        catch(err){
          console.log(err)
        }
      }

      const fetchAllGoals=async()=>{
        try{

          const response = await ApiService.getAllGoals(user?.id)
          setGoals(response.goalEntities)

        }
        catch(err){
          console.log(err)
        }
      }

      const fetchAllWorkouts=async()=>{
        try{
          const response = await ApiService.getAllWorkouts()
          setAllWorkout(response.workoutEntityts)
        }
        catch(err){
          console.log(err)
        }
      }
      fetchAllWorkouts()
      fetchAllGoals()
      fetchWorkoutSuggestions();

    }

  },[user])

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="sticky top-0" style={{zIndex:'9999'}}><Navbar/></div>

      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Goal Setting Section */}
        <section className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-10">Your Fitness Goals</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter your fitness goal"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0066ee] focus:border-transparent"
              />
              {goal&&goal.map((g,index)=>(<div className="relative pt-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#0066ee] mb-1">
                      {g.goalType==="food"&&g.foodName}{g.goalType==="steps"&&"Steps Goal"}{g.goalType==="weight"&&"Weight Goal"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-[#0066ee]">
                      {g.goalType==="food"&&g.nowQuantity+" "+g.foodUnit+"/"+g.foodQuantity+" "+g.foodUnit || g.goalType==="steps"&&g.nowSteps+"/"+g.stepTarget+" Steps" || g.goalType==="weight"&&"Weight Goal"}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                  <div
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#0066ee]"
                    style={{ width: g.goalType==="food"&&`${g.nowQuantity/g.foodQuantity*100}%` || g.goalType==="steps"&&`${g.nowSteps/g.stepTarget*100}%` }}
                  ></div>
                </div>
              </div>))}
              <div className="text-left">
                <button className="items-start mt-4 bg-green-400 hover:bg-green-500 transition duration-300 ease text-white px-4 py-1 rounded-lg" onClick={()=>navigate('/goals/set-goals')}>Set Fitness Goals</button>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="#0066ee" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Workout Plans Section */}
        <section className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Workout Plans</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggExc && suggExc.map((exercise, index) => (
              <div
                key={index}
                onClick={() => navigate(`/workout/${exercise.id}/${excId}`)}
                className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <img
                  src={`${exercise.image}`}
                  alt={exercise.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{exercise.name}</h3>
                <div className="text-sm text-gray-600">
                  {exercise.duration && (
                    <p>Duration: {exercise.duration}</p>
                  )}
                  <p className="mt-2 py-4">{exercise.overview.slice(0,90)}{exercise.overview.length>90&&"..."}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Exercise Library Section */}
        <section className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Exercise Library</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search exercises"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0066ee] focus:border-transparent"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allWorkouts && allWorkouts.map((exercise, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <img
                  src={`${exercise.image}`}
                  alt={exercise.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{exercise.name}</h3>
                <div className="text-sm text-gray-600">
                  {exercise.duration && (
                    <p>Duration: {exercise.duration}</p>
                  )}
                  {/* <p className="mt-2 py-4">{exercise.overview.slice(0,90)}{exercise.overview.length>90&&"..."}</p> */}
                </div>
              </div>
            ))}</div>
        </section>
      </div>
    </div>
  );
};
export default FitnessPage;