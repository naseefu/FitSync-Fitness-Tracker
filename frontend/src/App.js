import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import './App.css';
import FitnessQuestionnaireForm from './Component/Questions/Questions';
import Welcome from './Component/Welcome/Welcome';
import Feature from './Component/Features/Features';
import Dashboard from './Component/Dashboard/Dashboard';
import FoodLogPage from './Component/Dashboard/FoodPage';
import FitnessPage from './Component/Dashboard/FitnessPage';
import ProgressReport from './Component/Dashboard/ProgressReport';
import WorkoutDescription from './Component/Workout/WorkOutDesciption';
import Signin from './Component/Auth/Signin';
import Register from './Component/Auth/Register';
import QBasic from './Component/Questions/QBasic';
import QDiet from './Component/Questions/QDiet';
import QLifeStyle from './Component/Questions/QLifeStyle';
import QExcercise from './Component/Questions/QExcercise';
import QGoals from './Component/Questions/QGoals';
import { useState } from 'react';
import StepCounter from './Component/Test/StepCount';
import GoalSettingPage from './Component/Goals/GoalSettingPage';
import MealsContent from './Component/Dashboard/TrackMeals';

function App() {

  const [qindex,setQIndex] = useState(0)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/questions" element={<FitnessQuestionnaireForm currentStep={qindex} />} >
            <Route index element={<Navigate to="basic" />} />
            <Route path='basic' element={<QBasic key="basic" setQIndex={setQIndex}/>}/>
            <Route path='diet' element={<QDiet key="diet" setQIndex={setQIndex}/>}/>
            <Route path='life-style' element={<QLifeStyle key="life-style" setQIndex={setQIndex}/>}/>
            <Route path='excercise' element={<QExcercise key="excercise" setQIndex={setQIndex}/>}/>
            <Route path='goals' element={<QGoals key="goals" setQIndex={setQIndex}/>}/>
          </Route>
          <Route path="/" element={<Welcome />} />
          <Route path="/test" element={<MealsContent />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/food-page" element={<FoodLogPage />} />
          <Route path="/goals" element={<FitnessPage />} />
          <Route path="/goals/set-goals" element={<GoalSettingPage />} />
          <Route path="/progress-report" element={<ProgressReport />} />
          <Route path="/workout/:id1/:id2" element={<WorkoutDescription />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
