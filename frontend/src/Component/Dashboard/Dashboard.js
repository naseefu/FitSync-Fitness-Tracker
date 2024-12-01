import React, { useContext, useEffect, useState } from "react";
import { FiActivity, FiHome, FiTarget, FiUser, FiMenu } from "react-icons/fi";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import Navbar from "./Navbar";
import { useUser } from "../Context/UserContext";
import FoodService from "../../Service/FoodService";
import { ActiveTimeContext } from "../Context/ActiveTimeContext";
import ApiService from "../../Service/ApiService";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {

  const { activeTime } = useContext(ActiveTimeContext);

  const [timeInMin,setTimeinMin] = useState()

  const [distancePop,setDistancePop] = useState(false)
  
  const {user} = useUser()

  const [goal,setGoals] = useState([])

  const [id2,setId2] = useState()

  const [load,setLoad] = useState(true)

  useEffect(()=>{

    if(user){

      const fetchAllStepsOFWeeks=async()=>{

        try{
          const response = await ApiService.getAllStepsOfWeek(user?.id)

          setActivityData((prevData) => ({
          ...prevData,
          datasets: prevData.datasets.map((dataset) => ({
          ...dataset,
          data: Object.values(response.distances).map((d)=>Math.round(d*1000/0.75))
          }))
          }));

        }
        catch(err){
          console.log(err.response?.data?.message||"Error")
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
      fetchAllGoals()
      fetchAllStepsOFWeeks();

    }


  },[user,load])

  useEffect(()=>{

    const getTodayActivity=async()=>{

      if(user){

        try{

          const response = await ApiService.getActivity(user?.id)
          setDistancePop(response.distanceFilled)
          setTimeinMin(response.timeInMinutes)
          setDistance(response.distance)

          setSets(Math.floor((response.distance*1000)/0.75))

        }

        catch(err){

          console.log(err)
          
        }

      }

    }
    getTodayActivity();


  },[user,activeTime,load])

  const [mockWorkouts,setWorkOuts] = useState([]);
  const [originalWorkout,setOriginalWorkout] = useState([])

  const mockGoals = [
    { id: 1, title: "Reach 10k Steps", progress: 84, target: 100 },
    { id: 2, title: "Workout 5x/week", progress: 60, target: 100 },
    { id: 3, title: "Drink 2L Water", progress: 75, target: 100 }
  ];

  const [activityData,setActivityData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Steps",
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: "#0066ee",
        tension: 0.4
      }
    ]
  });
  

  const nutritionData = {
    labels: ["protein","calcium"],
    datasets: [
      {
        data: [30, 50],
        backgroundColor: [
        "#3498db",
        "#f1c40f",
        "#e67e22",
        "#0066ee",
        "#2980b9",
        "#f39c12",
        "#d35400",
        "#004bb5",
        "#16a085"
        ]

      }
    ]
  };

  const [date,setDate] = useState('')

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const [nut,setNut] = useState({
    labels:[],
    datasets:[{
      data:[],
      backgroundColor: ["#3498db", "#f1c40f", "#e67e22","#2ecc71","#9b59b6","#1abc9c","#e74c3c","#34495e","#ecf0f1"]
    }]
  })

  const [totalCalories,setTotalCalorie] = useState(0)

  const [steps,setSets] = useState(0)

  const [active,setActive] = useState(0)

  const [distance,setDistance] = useState(0)

  const [totDistance,setTotDistance] = useState(0)

  const calorydata = {
    carbohydrates:4,
    proteins:4,
    fats:9,
    fiber:4,
    sugar:4,
    salt:1,
    alchohol:7,
    alchohols:7,
    carbohydrate:4,
    protein:4,
    fat:9,
    fibers:4,
    sugars:4,
    salts:1
  }


  useEffect(()=>{

    const fetchAllNutrients=async()=>{

      try{

        const response = await FoodService.getAllNutrients(user?.id,date&&date)

        setNut({
          labels:response.nutrientsEntity.filter(nutrient=>nutrient.unit==="g"||nutrient.unit==="gram"||nutrient.unit==="grams"&&nutrient.name!="sodium"&&nutrient.name!="water").map(nutrient=>nutrient.name),
          datasets:[{
            data:response.nutrientsEntity.filter(nutrient=>nutrient.unit==="g"||nutrient.unit==="gram"||nutrient.unit==="grams"&&nutrient.name!="sodium"&&nutrient.name!="water").map(nutrient=>nutrient.amount)
          }]
        })
        let totcal = 0
        response.nutrientsEntity.forEach((m) => {
        if (m.name in calorydata) {
          totcal += m.amount * calorydata[m.name];
        }
        });
        setTotalCalorie(totcal);

      }
      catch(err){

        console.log(err)

      }

    }
    fetchAllNutrients()

  },[user,date,load])

  const handleFillDistance = async()=>{

    try{

      const response = await ApiService.fillDistance(user?.id,{distance:totDistance})
      setDistancePop(false)
      setLoad(!load)

    }
    catch(err){
      console.log(err)
      setDistancePop(false)
      setLoad(!load)
    }

  }

  useEffect(()=>{

    if(user){

      const fetchWorkoutSuggestions=async()=>{
        try{
          const response = await ApiService.getWorkOutSuggestions(user?.id)
          setOriginalWorkout(response.userWorkouts.embeddableUserWOs)
          setId2(response.userWorkouts.id)
          setWorkOuts(response.workoutEntityts)
        }
        catch(err){
          console.log(err.response?.data?.message||"an error")
        }
      }
      fetchWorkoutSuggestions();

    }

  },[user,load])

  const navigate = useNavigate()

  

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="sticky top-0" style={{zIndex:'9999'}}><Navbar/></div>

      {distancePop&&
        <div className="absolute min-h-full bg-[rgba(0,0,0,0.3)] min-w-full" style={{zIndex:'9999'}}>
          
          <div className="fixed flex flex-col rounded-lg items-start gap-4 bg-white min-w-[90%] md:min-w-[400px] lg:min-w-[500px] lg:max-w-[500px] p-10 text-left top-[50%] left-[50%]" style={{transform:'translate(-50%,-50%)'}}>
            <h1 className="text-[20px] text-center w-full font-bold">How Much Did You Walk Today?</h1>
            <p className="text-gray-400 text-[14px] my-3">Hey there! We're curious, how many steps or miles did you walk today? Share with us your progress!</p>
            <div className="relative h-full">
              <input className="border px-2 py-1 w-full min-h-full" type="number" value={totDistance} onChange={(e)=>setTotDistance(e.target.value)}/>
              <p className="absolute top-[25%] text-gray-400 right-[0] mx-2 text-[12px]">km</p>
            </div>
            <div className="flex items-center gap-3 py-3" >
              <button className="text-white bg-green-500 px-8 py-1 hover:bg-green-600 transition duration-300 ease text-[14px] rounded-lg" onClick={handleFillDistance}>Submit</button>
              <button className="text-white bg-red-500 px-8 py-1 hover:bg-red-600 transition duration-300 ease text-[14px] rounded-lg" onClick={()=>{setDistancePop(false)}}>Cancel</button>
            </div>
          </div>

        </div>}

      {/* Mobile Menu */}
      

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Steps" value={steps>0?steps:'--'} unit="steps" />
          <StatCard title="Calories" value={totalCalories>0?parseInt(totalCalories):'--'} unit="kcal" />
          <StatCard
            title="Active Minutes"
            value={timeInMin>0?timeInMin:'--'}
            unit="mins"
          />
          <StatCard title="Distance" value={distance>0?distance:'--'} unit="km" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Activity Tracking</h2>
            <div className="h-64">
              <Line data={activityData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Nutrition Breakdown</h2>
            {nutritionData.labels.length>0?<div className="h-64">
              <Doughnut
                data={nut.datasets.length>0&&nut}
                options={{ maintainAspectRatio: false }}
              />
            </div>:<div className="h-[calc(100%-100px)] flex items-center justify-center">

                <p className="text-gray-400">No nutritional data available to display the chart</p>

              </div>}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm max-h-[fit-content] pb-10 mb-10 mt-10">
            <h1 className="font-semibold text-xl">Goals</h1>
          {goal&&goal.map((g,index)=>(<div className="relative pt-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#0066ee] mb-1" style={{color:g.status==="completed"&&'rgb(245,210,0)'}}>
                      {g.goalType==="food"&&g.foodName}{g.goalType==="steps"&&"Steps Goal"}{g.goalType==="weight"&&"Weight Goal"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-[#0066ee]" style={{color:g.status==="completed"&&'rgb(245,210,0)'}}>
                      {g.goalType==="food"&&(g.status==="completed"?"Completed":g.nowQuantity+" "+g.foodUnit+"/"+g.foodQuantity+" "+g.foodUnit) || g.goalType==="steps"&&(g.status==="completed"?"Completed": g.nowSteps+"/"+g.stepTarget+" Steps" || g.goalType==="weight"&&"Weight Goal")}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                  <div
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#0066ee]"
                    style={{ width: g.goalType==="food"&&`${g.nowQuantity/g.foodQuantity*100}%` || g.goalType==="steps"&&`${g.nowSteps/g.stepTarget*100}%`,backgroundColor:g.status==="completed"&&'rgb(245,220,0)' }}
                  ></div>
                </div>
              </div>))}
            </div>

        {/* Workouts and Goals Section */}
        <div className="flex flex-col-reverse gap-6">
          {/* Workouts */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Today's Workouts</h2>
            <div className="space-y-4 grid md:grid-cols-2 items-end gap-6">
              {mockWorkouts.map((workout,index) => (
                <WorkoutItem id2={id2} navigate={navigate} index={index} key={workout.id} workout={workout} originalWorkout={originalWorkout}/>
              ))}
            </div>
          </div>

          {/* Goals */}
          
        </div>
      </main>
    </div>
  );
};


const StatCard = ({ title, value, unit }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <h3 className="text-gray-500 text-sm uppercase">{title}</h3>
    <div className="mt-2 flex items-baseline justify-center">
      <span className="text-3xl font-semibold text-gray-900">{value}</span>
      <span className="ml-2 text-gray-500">{unit}</span>
    </div>
  </div>
);
const WorkoutItem = ({ index,workout,originalWorkout,navigate,id2 }) => (
  
  <div className="flex items-center justify-between h-[350px] p-4 bg-gray-50 rounded-lg relative overflow-hidden" style={{backgroundImage:`url(${workout.image})`,zIndex:'10',
  backgroundSize:'cover',backgroundPosition:'center',backgroundColor:'rgba(0,0,0,0.1)',backgroundBlendMode:"overlay"}}>
    <div className="flex flex-col md:flex-row gap-4 justify-end md:justify-between w-full text-start md:items-end h-full py-6 px-4">
    <div className="relative z-10 flex flex-col gap-1">
      <h3 className="font-medium text-white">{workout.name}</h3>
      <p className="text-sm text-gray-300 bg-black w-[fit-content] px-3 py-1 rounded-xl">{workout.duration}</p>
    </div>
    <button
      onClick={originalWorkout[index].completion!==100?()=>navigate(`/workout/${workout.id}/${id2}`):null}
      className={`px-4 py-2 rounded-md relative z-10 ${originalWorkout[index].completion===100 ? "bg-green-100 text-green-800" : "bg-[#0066ee] text-white"}`}
    >
      {originalWorkout[index].completion===100 ? "Completed" : "Start"}
    </button></div>
  </div>
);

export default Dashboard;