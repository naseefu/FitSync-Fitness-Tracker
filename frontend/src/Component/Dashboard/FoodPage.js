import React, { useEffect, useState } from "react";
import { FiActivity, FiHome, FiTarget, FiUser, FiMenu, FiPlusCircle, FiTrash2, FiEdit2, FiCalendar } from "react-icons/fi";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import DatePicker from "react-datepicker";
import Navbar from "./Navbar";
import axios from "axios";
import FoodService from "../../Service/FoodService";
import { useUser } from "../Context/UserContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const mockFoodDatabase = [
  { id: 1, name: "Oatmeal", calories: 150, protein: 6, carbs: 27, fats: 3 },
  { id: 2, name: "Banana", calories: 105, protein: 1.3, carbs: 27, fats: 0.3 },
  { id: 3, name: "Grilled Chicken", calories: 165, protein: 31, carbs: 0, fats: 3.6 },
];

const FoodLogPage = () => {
  const [date, setDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: []
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingFood, setIsAddingFood] = useState(false);

  const [nut,setNut] = useState({
    labels:[],
    datasets:[{
      data:[],
      backgroundColor: ["#3498db", "#f1c40f", "#e67e22","#2ecc71","#9b59b6","#1abc9c","#e74c3c","#34495e","#ecf0f1"],
      borderWidth: 0
    }]
  })

  const removeFood = async(mealType, foodId) => {

    try{

      const response = await FoodService.deleteFood(foodId,mealType,user?.id)
      setMeals(prev => ({
      ...prev,
      [mealType]: prev[mealType].filter(food => food.id !== foodId)
    }));

    }
    catch(err){

      console.log(err)

    }
  };

  const todayDate = new Date().toISOString().split("T")[0]

  const MealSection = ({ title, mealType, foods }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {todayDate===date&&<button
          onClick={() => {
            setSelectedMealType(mealType);
            setIsAddingFood(true);
          }}
          className="flex items-center text-[#0066ee] hover:text-blue-700"
        >
          <FiPlusCircle className="mr-2" /> Add Food
        </button>}
      </div>
      <div className="space-y-4">
        {foods&&foods.map(food => (
          <div key={food.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg text-left">
            <div>
              <h3 className="font-medium">{food.foodName}</h3>
              <p className="text-sm text-gray-500">{food.quantity} x {food.unit}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => removeFood(mealType, food.id)}
                className="p-2 text-red-500 hover:bg-red-100 rounded-full"
              >
                <FiTrash2 />
              </button>
              <button className="p-2 text-[#0066ee] hover:bg-blue-100 rounded-full">
                <FiEdit2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const measures = ["Teaspoon (tsp)", "Tablespoon (tbsp)", "Cup","Serving", "Milliliter (ml)", "Liter (L)", "Gram (g)", "Kilogram (kg)", "Ounce (oz)", "Pound (lb)", "Pinch", "Dash", "Slice", "Piece", "Bunch","Plate"]

  const [foodName,setFoodName] = useState('')
  const [quantity,setQuantity] = useState('')
  const [unit,setUnit] = useState('')
  const [selectedMealType, setSelectedMealType] = useState(null);

  const [error,setError] = useState('')

  useEffect(()=>{

    if(error){
      const timer = setTimeout(()=>{
        setError('')
      },4000)
      return ()=>clearTimeout(timer)
    }

  },[error])

  const {user} = useUser()

  const [nutrients,setNutrients] = useState([])

  const [totalCalories,setTotalCalorie] = useState(0);

  const [flag,setFlag] = useState(false)

  useEffect(()=>{

    const fetchAllFoodsToday=async()=>{

      try{

        const response = await FoodService.getAllFoodsOfToday(user?.id,date&&date)
        setMeals((prev)=>({
          ...prev,
          breakfast:response.breakfast,
          lunch:response.lunch,
          snacks:response.snacks,
          dinner:response.dinner
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
          labels:response.nutrientsEntity.filter(nutrient=>nutrient.unit==="g"||nutrient.unit==="gram" ||nutrient.unit==="grams" &&nutrient.name!="sodium" ).map(nutrient=>nutrient.name),
          datasets:[{
            data:response.nutrientsEntity.filter(nutrient=>nutrient.unit==="g"||nutrient.unit==="gram"||nutrient.unit==="grams"&&nutrient.name!="sodium").map(nutrient=>nutrient.amount)
          }]
        })
        let totcal = 0
        response.nutrientsEntity.forEach((m) => {
        console.log(m.name)
        if (m.name in calorydata) {
          totcal += m.amount * calorydata[m.name];
        }
        });
        setTotalCalorie(totcal);

      }
      catch(err){

        console.log(err?.response?.data?.message||"error occured")

      }

    }
    fetchAllNutrients()
    fetchAllFoodsToday()

  },[user,date,flag])


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

  const [loading,setLoading] = useState(false)

  const handleAddFood=async()=>{

    setLoading(true)

    if(selectedMealType==="breakfast"){
      try{
        const response = await FoodService.addBreakfast({foodName,quantity,unit,selectedMealType},user?.id)
        setMeals((prev)=>({
          ...prev,
          breakfast: [...prev.breakfast,response.foodDTO]
        }))
        setIsAddingFood(false)
        setFlag(!flag)
        setLoading(false)
      }
      catch(err){
        setError(err.response?.data?.message || "An error occured")
        setLoading(false)
      }
    }
    else if(selectedMealType==="lunch"){
      try{
        const response = await FoodService.addLunch({foodName,quantity,unit,selectedMealType},user?.id)
        setMeals((prev)=>({
          ...prev,
          lunch: [...prev.lunch,response.foodDTO]
        }))
        setIsAddingFood(false)
        setFlag(!flag)
        setLoading(false)
      }
      catch(err){
        setError(err.response?.data?.message || "An error occured")
        setLoading(false)
      }
    }
    else if(selectedMealType==="snacks"){
      try{
        const response = await FoodService.addSnacks({foodName,quantity,unit,selectedMealType},user?.id)
        setMeals((prev)=>({
          ...prev,
          snacks: [...prev.snacks,response.foodDTO]
        }))
        setIsAddingFood(false)
        setFlag(!flag)
        setLoading(false)
      }
      catch(err){
        setError(err.response?.data?.message || "An error occured")
        setLoading(false)
      }
    }
    else if(selectedMealType==="dinner"){
      try{
        const response = await FoodService.addDinner({foodName,quantity,unit,selectedMealType},user?.id)
        setMeals((prev)=>({
          ...prev,
          dinner: [...prev.dinner,response.foodDTO]
        }))
        setIsAddingFood(false)
        setFlag(!flag)
        setLoading(false)
      }
      catch(err){
        setError(err.response?.data?.message || "An error occured")
        setLoading(false)
      }
    }
    else{
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0" style={{zIndex:'999'}}><Navbar/></div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-5 mt-5 md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Food Log - Track Your Daily Meals</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white rounded-lg shadow-sm p-2">
              <FiCalendar className="text-gray-400 mr-2" />
              <input
                type="date"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
                className="outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <MealSection
              title="Breakfast"
              mealType="breakfast"
              foods={meals.breakfast}
            />
            <MealSection
              title="Lunch"
              mealType="lunch"
              foods={meals.lunch}
            />
            <MealSection
              title="Snacks"
              mealType="snacks"
              foods={meals.snacks}
            />
            <MealSection
              title="Dinner"
              mealType="dinner"
              foods={meals.dinner}
            />
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-[9%]">
              <h2 className="text-xl font-semibold mb-4">Daily Summary</h2>
              <div className="mb-6">
                <div className="h-64">
                  <Doughnut data={nut.datasets.length>0&&nut} options={{ maintainAspectRatio: false }} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Calories</span>
                  <span className="font-semibold">{totalCalories>0?parseInt(totalCalories):'--'}</span>
                </div>
                {nutrients.filter(n=>n.unit==="g" || n.unit==="gram"||n.unit==="grams"&&n.name!="sodium").map((n,index)=>(<div className="flex justify-between" key={index}>
                  <span className="text-gray-600">{n.name}</span>
                  <span className="font-semibold">{n.amount}{n.unit.charAt(0)}</span>
                </div>))}
                
              </div>
            </div>
          </div>
        </div>
      </main>

      {isAddingFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Food to {selectedMealType}</h2>
            <div>
            <input
              type="text"
              placeholder="food name"
              className="w-full p-2 border rounded-lg mb-4"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
            <div className="flex gap-4 items-center">
              <input value={quantity} onChange={(e)=>setQuantity(e.target.value)} type="number" placeholder="quantity" className="w-full p-2 border rounded-lg mb-4" ></input>
              <select value={unit} onChange={(e)=>setUnit(e.target.value)} className="w-full p-2 border rounded-lg mb-4">
                <option value="">Select a unit</option>
                {measures.map((m,index)=>(
                  <option value={m} key={index}>{m}</option>
                ))}
              </select>
            </div>
            </div>
            {error&&<div>
                <p className="py-2 text-[14px] text-red-500">{error}</p>
              </div>}
            {loading?<button className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg">
              Adding food ....
            </button>:<button
              onClick={handleAddFood}
              className="mt-4 w-full bg-green-400 text-white py-2 rounded-lg hover:bg-green-500"
            >
              Add Food
            </button>}
            <button
              onClick={() => setIsAddingFood(false)}
              className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodLogPage;