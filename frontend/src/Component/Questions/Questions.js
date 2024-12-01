import React, { useState } from "react";
import { FiUser, FiHeart, FiActivity, FiAward, FiCheckCircle } from "react-icons/fi";
import QBasic from "./QBasic";
import QDiet from "./QDiet";
import QLifeStyle from "./QLifeStyle";
import QExcercise from "./QExcercise";
import QGoals from "./QGoals";
import { Outlet } from "react-router-dom";

const FitnessQuestionnaireForm = ({currentStep}) => {


  const formSections = [
    {
      title: "Basic Information",
      icon: <FiUser className="w-6 h-6" />
    },
    {
      title: "Diet & Food",
      icon: <FiHeart className="w-6 h-6" />
    },
    {
      title: "Lifestyle",
      icon: <FiActivity className="w-6 h-6" />
    },
    {
      title: "Exercise",
      icon: <FiAward className="w-6 h-6" />
    },
    {
      title: "Goals",
      icon: <FiCheckCircle className="w-6 h-6" />
    }
  ];

  const handleSubmit = (e) => {
    
  };


  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            {formSections.map((section, index) => (
              <div
                key={section.title}
                className={`flex flex-col items-center ${index <= currentStep ? "text-blue-500" : "text-gray-500"}`}
              >
                <div className={`rounded-full p-3 ${index <= currentStep ? "bg-blue-500/20" : "bg-gray-800"}`}>
                  {section.icon}
                </div>
                <span className="text-sm mt-2 hidden md:block">
                  {section.title}
                </span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-800 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / formSections.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 md:p-8 shadow-xl text-left">
          <h2 className="text-2xl font-bold mb-6">
            {formSections[currentStep].title}
          </h2>

          <Outlet/>

          
        </div>
      </div>
    </div>
  );
};

export default FitnessQuestionnaireForm;