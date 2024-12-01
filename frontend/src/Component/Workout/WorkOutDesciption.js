import React, { useEffect, useState } from "react";
import { FaDumbbell, FaStopwatch, FaFire, FaChevronDown, FaChevronUp, FaCheckCircle } from "react-icons/fa";
import { BiTargetLock } from "react-icons/bi";
import { MdSportsGymnastics } from "react-icons/md";
import Navbar from "../Dashboard/Navbar";
import { useParams } from "react-router-dom";
import ApiService from "../../Service/ApiService";
import { useUser } from "../Context/UserContext";
import {motion} from 'framer-motion'

const WorkoutDescription = () => {
  const [activeSection, setActiveSection] = useState("main");
  const [expandedExercise, setExpandedExercise] = useState(null);

  const {id1} = useParams()
  const {id2} = useParams()

  const [over,setOver] = useState([])
  const [load,setLoad] = useState(false)

  useEffect(()=>{

    if(id1){

      const fetchExcerciseDetails=async()=>{

        try{
          const response = await ApiService.getWorkOutDetails(id1);
          setOver(response.workoutEntity)
          setExcercise(response.workoutEntity.workoutSteps)
        }
        catch(err){
          console.log(err)
        }

      }

      fetchExcerciseDetails();

    }

  },[id1,load])

  const {user} = useUser()
  const [completion,setCompletion] = useState()

  useEffect(()=>{

    if(user){

      const fetchWorkoutSuggestions=async()=>{
        try{
          const response = await ApiService.getWorkOutSuggestions(user?.id)
          setCompletion(response.userWorkouts.embeddableUserWOs.find(workout => workout.id === parseInt(id1)))
        }
        catch(err){
          console.log(err)
        }
      }
      fetchWorkoutSuggestions();

    }

  },[user,load])

  const [exercises,setExcercise] = useState([]);

  const toggleSection = (section) => {
    setActiveSection(section);
  };

  const toggleExercise = (id) => {
    setExpandedExercise(expandedExercise === id ? null : id);
  };

  const handleFinishWorkout=async()=>{
    try{
      if(id1&&id2&&user){
        const response = await ApiService.finishWorkout(id1,id2,user.id)
        console.log(response)
        setLoad(!load)
      }
    }
    catch(err){
      console.log(err)
      setLoad(!load)
    }
  }

  return (
    <div>
      <Navbar/>
    {over&&<div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{over.name}</h1>
        <p className="text-xl italic text-gray-600">"{over.caption}"</p>
      </div>

      {/* Overview Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FaDumbbell className="text-blue-600 text-2xl mr-2" />
            <h2 className="text-xl font-semibold">Workout Overview</h2>
          </div>
          <div className="flex items-center">
            <FaStopwatch className="text-blue-600 mr-2" />
            <span>{over.duration}</span>
          </div>
        </div>
        <p className="text-gray-700 text-left">{over.overview}</p>
      </div>
      <div className="space-y-8">
        {/* Workout Goals */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <BiTargetLock className="text-blue-600 text-2xl mr-2" />
            <h2 className="text-xl font-semibold">Workout Goals</h2>
          </div>
          <ul className="list-disc text-left list-inside text-gray-700 space-y-2">
          {over?.goals?.split(",").map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
          </ul>
        </div>
        <div className="space-y-4">
          {exercises&&exercises.map((exercise,index) => (
            <div key={exercise.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div
                className="flex items-center justify-between p-6 cursor-pointer"
                onClick={() => toggleExercise(index)}
                role="button"
                aria-expanded={expandedExercise === index}
              >
                <div className="flex items-center">
                  <MdSportsGymnastics className="text-blue-600 text-2xl mr-4" />
                  <h3 className="text-[17px]">{exercise.stepname}</h3>
                </div>
                {expandedExercise === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {expandedExercise === index && (
                <motion.div
                  initial={{opacity:0,height:0}}
                  animate={{opacity:1,height:'100%'}}
                  transition={{duration:1.5}}
                  className="p-6 pt-0 border-t border-gray-200">
                  <div className="md:flex">
                    <img
                      src={`${exercise.image}`}
                      alt={exercise.stepname}
                      className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
                      }}
                    />
                    <div className="flex-1 text-left">
                      <div className="grid grid-cols-2 gap-4 mb-4 pt-10 items-center">
                        <div>
                          <span className="font-semibold">Sets:</span> {exercise.sets}
                        </div>
                        <div>
                          <span className="font-semibold">Reps:</span> {exercise.reps}
                        </div>
                        <div>
                          <span className="font-semibold">Rest:</span> {exercise.rest}
                        </div>
                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <span className="font-semibold">Variation:</span> {exercise.variation}
                      </div>
                      {completion && (
                      <div className="py-4">                    
                        {completion.completion === 100
                            ? <button className="bg-green-400 text-white py-1 px-6" disabled style={{cursor:'not-allowed'}}>Completed</button>
                        : (completion.completion === 66 && index < 2) || (completion.completion === 33 && index < 1) || completion.completion === 0&&index<0
                        ? <button className="bg-green-400 text-white py-1 px-6" disabled style={{cursor:'not-allowed'}}>Completed</button>
                        : <button className={`py-1 px-6 text-white transition duration-300 ease 
                          ${completion.completion === 0 && index > 0 ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} ${completion.completion === 33 && index > 1 ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} 
                          ${completion.completion === 66 && index > 2 ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`} onClick={completion.completion === 0 && index === 0?handleFinishWorkout:null ||
                          completion.completion === 33 && index === 1?handleFinishWorkout:null || completion.completion === 66 && index === 2?handleFinishWorkout:null}>Continue</button>}
                        </div>
                        )}

                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Tracking */}
        {completion&&<div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <FaCheckCircle className="text-blue-600 text-2xl mr-2" />
            <h2 className="text-2xl font-semibold">Track Your Progress</h2>
          </div>
          <div className="space-y-4 py-4 text-left">
              <div className="flex items-center">
                <span className="w-1/3">Progress</span>
                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`${completion.completion===100?'bg-green-400':'bg-blue-600'} h-2.5 rounded-full`}
                    style={{ width: `${completion.completion}%` }}
                  ></div>
                </div>
                <span className="text-gray-600">{completion.completion}%</span>
              </div>
          </div>
        </div>}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">Related Workouts</h3>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Core Strength
          </button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Lower Body
          </button>
        </div>
      </div>
    </div>}</div>
  );
};

export default WorkoutDescription;