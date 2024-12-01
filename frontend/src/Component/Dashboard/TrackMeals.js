import React from 'react'
import { FaUtensils } from 'react-icons/fa';

const MealsContent = () =>{ 
  
  const meals= [
      { id: 1, name: "Breakfast", calories: 350, time: "8:00 AM" },
      { id: 2, name: "Lunch", calories: 450, time: "12:30 PM" },
      { id: 3, name: "Dinner", calories: 400, time: "7:00 PM" }
    ]

  return(
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Track Your Meals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal.id} className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{meal.name}</h3>
              <FaUtensils className="text-[#0066ee]" />
            </div>
            <p className="text-gray-600">{meal.time}</p>
            <p className="text-xl font-bold mt-2">{meal.calories} cal</p>
          </div>
        ))}
      </div>
    </div>
  );}

export default MealsContent
