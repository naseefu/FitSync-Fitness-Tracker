import React, { useEffect, useState } from "react";
import { FaWeight, FaDumbbell, FaUserPlus, FaFile, FaRobot, FaTrophy, FaShareAlt } from "react-icons/fa";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from "chart.js";
import Navbar from "./Navbar";
import { useUser } from "../Context/UserContext";
import ApiService from "../../Service/ApiService";
import FoodService from "../../Service/FoodService";
import jsPDF from "jspdf";
import html2pdf from 'html2pdf.js';
import './print.css'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title);

const ProgressReport = () => {
  const weightData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "Weight Progress",
      data: [85, 83, 82, 80, 78, 77],
      borderColor: "#0066ee",
      tension: 0.4,
      fill: false
    }]
  };

  const exportPDF = () => {
    
  const element = document.getElementById('progress-report'); 
  const options = {
    margin:       1,
    filename:     'ProgressReport.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
  };
  html2pdf().from(element).set(options).save();
};

  const [caloriesData,setCaloriesDate] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "Calories Consumed",
      data: [2100, 2300, 1950, 2200, 2400, 1800, 2000],
      backgroundColor: "#0066ee99"
    }]
  });

  const aiSuggestions = [
    "Increase protein intake by 20g to support muscle growth",
    "Add 2 more cardio sessions this week",
    "Consider adding resistance training"
  ];

  const {user} = useUser()

  const [nutrients,setNutrients] = useState([])
  const [nut,setNut] = useState({
    labels:[],
    datasets:[{
      data:[],
      backgroundColor: ["#3498db", "#f1c40f", "#e67e22","#2ecc71","#9b59b6","#1abc9c","#e74c3c","#34495e","#ecf0f1"]
    }]
  })

  const [date,setDate] = useState('')

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const [goal,setGoals] = useState([])

  const [aiSuggestion,setAiSuggestion] = useState([])

  useEffect(()=>{

    if(user&&date){

      const fetchCaloriesOfWeek=async()=>{

        try{
          const response = await ApiService.getCaloriesOfWeek(user?.id)
          setCaloriesDate((prev)=>({
            ...prev,
            datasets:prev.datasets.map((datas)=>({
              ...datas,
              data: Object.values(response.calories)
            }))
          }))
        }
        catch(err){
          console.log(err)
        }

      }
      const fetchAllNutrients=async()=>{

      try{

        const response = await FoodService.getAllNutrients(user?.id,date&&date)

        setNutrients(response.nutrientsEntity)

        setNut({
          labels:response.nutrientsEntity.filter(nutrient=>nutrient.unit==="g"||nutrient.unit==="gram"||nutrient.unit==="grams"&&nutrient.name!="sodium").map(nutrient=>nutrient.name),
          datasets:[{
            data:response.nutrientsEntity.filter(nutrient=>nutrient.unit==="g"||nutrient.unit==="gram"||nutrient.unit==="grams"&&nutrient.name!="sodium").map(nutrient=>nutrient.amount)
          }]
        })

      }
      catch(err){

        console.log(err)

      }}

      const fetchAllGoals=async()=>{
        try{

          const response = await ApiService.getAllGoals(user?.id)
          setGoals(response.goalEntities)

        }
        catch(err){
          console.log(err)
        }
      }

      const fetchAiSuggestions=async()=>{

        try{
          const response = await ApiService.getAiSuggestion(user?.id)
          setAiSuggestion(response.aiSuggestions)
        }
        catch(err){
          console.log(err)
        }

      }

    fetchAiSuggestions()
    fetchAllGoals()
    fetchAllNutrients()

    fetchCaloriesOfWeek();

    }
    

  },[user,date])

  return (
    <div className="min-h-screen bg-gray-50 " id="progress-report">
      {/* Header */}
      <div className="sticky top-0" style={{zIndex:'9999'}}><Navbar/></div>
      <header className="bg-white shadow-sm py-8">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-[black]">Your Progress Report</h1>
          <p className="text-gray-600 mt-2">Track your journey, review achievements, and stay motivated!</p>
          <nav className="mt-4">
            <a href="#" className="mr-4 text-[#0066ee] hover:underline">Track Meals</a>
            <a href="#" className="text-[#0066ee] hover:underline">Workout Plans</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {goal&&goal.map((g,index)=>(<div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{g.goalType==="food"&&g.foodName}{g.goalType==="steps"&&"Steps Goal"}{g.goalType==="weight"&&"Weight Goal"}</h3>
            </div>
            <p className="text-3xl font-bold text-[#0066ee]" style={{color:g.status==="completed"&&'rgb(245,210,0)'}}>{g.goalType==="food"&&g.nowQuantity+"/"+g.foodQuantity || g.goalType==="steps"&&g.nowSteps+"/"+g.stepTarget || g.goalType==="weight"&&"Weight Goal"}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <div className="bg-[#0066ee] h-2.5 rounded-full" style={{ width: g.goalType==="food"&&`${g.nowQuantity/g.foodQuantity*100}%` || g.goalType==="steps"&&`${g.nowSteps/g.stepTarget*100}%`,backgroundColor:g.status==="completed"&&'rgb(245,220,0)' }}
                  ></div>
            </div>
          </div>))}
        </div>

        {/* Detailed Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-6">Weight Progress</h3>
            <Line data={weightData&&weightData} options={{ responsive: true }} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-6">Calorie Intake</h3>
            <Bar data={caloriesData&&caloriesData} options={{ responsive: true }} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-6">Macro Distribution</h3>
            <Doughnut data={nut&&nut.datasets.length>0&&nut} options={{ maintainAspectRatio: true }} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-6">Achievements</h3>
            <div className="space-y-4">
              {goal&&goal.filter(g=>g.status==="completed").length>0?goal.filter(g=>g.status==="completed").map((g) => (
                <div key={g.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaTrophy className="text-yellow-500" />
                  <span>{g.goalType==="food"&&g.foodName+" Goal Completed"}{g.goalType==="steps"?g.stepTarget>1000?g.stepTarget/1000+"K Steps Goal Completed":g.stepTarget+" Steps Goal Completed":""}{g.goalType==="weight"&&"Weight Goal"}</span>
                </div>
              )):<div className="min-h-full flex items-center justify-center text-gray-400">

                  <p className="mt-10">No Achievements</p>

                </div>}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-xl font-semibold">AI Suggestions</h3>
              <FaRobot className="text-[#0066ee]" />
            </div>
            <div className="space-y-4">
              {aiSuggestion&&aiSuggestion.map((suggestion, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg text-sm">
                  {suggestion.suggestion}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <button onClick={exportPDF} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#0066ee] text-[#0066ee] rounded-lg hover:bg-blue-50">
            <FaFile /> Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0066ee] text-white rounded-lg hover:bg-[#0052cc]">
            <FaShareAlt /> Share Progress
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-[#0066ee]">Update Goals</a>
            <a href="#" className="text-gray-600 hover:text-[#0066ee]">Dashboard</a>
          </div>
          <p className="text-gray-500 text-sm">Stay consistent, stay motivated!</p>
        </div>
      </footer>
    </div>
  );
};

export default ProgressReport;