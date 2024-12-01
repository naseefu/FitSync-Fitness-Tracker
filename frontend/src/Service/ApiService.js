import axios from 'axios'

export default class ApiService{

  static BASE_URL = "http://localhost:8080"

  static getHeader(){
    const token = localStorage.getItem('token');
    return{
      Authorization:`Bearer ${token}`,
      "Content-Type":"application/json"
    };
  }

  static async registerUser(user,confirm){
    const response = await axios.post(`${this.BASE_URL}/auth/register/${confirm}`,user)
    return response.data
  }

  static async loginUser(user){
    const response = await axios.post(`${this.BASE_URL}/auth/login`,user)
    return response.data
  }

  static async handleBasic(basic,id){
    const response = await axios.post(`${this.BASE_URL}/questions/basic/${id}`,basic)
    return response.data
  }

  static async basicFilled(id){
    const response = await axios.post(`${this.BASE_URL}/questions/basic-filled/${id}`)
    return response.data
  }

  static async handleDiet(basic,id){
    const response = await axios.post(`${this.BASE_URL}/questions/diet/${id}`,basic)
    return response.data
  }

  static async dietFilled(id){
    const response = await axios.post(`${this.BASE_URL}/questions/diet-filled/${id}`)
    return response.data
  }

  static async handleLife(basic,id){
    const response = await axios.post(`${this.BASE_URL}/questions/life/${id}`,basic)
    return response.data
  }

  static async lifeFilled(id){
    const response = await axios.post(`${this.BASE_URL}/questions/life-filled/${id}`)
    return response.data
  }

  static async handleExcercise(basic,id){
    const response = await axios.post(`${this.BASE_URL}/questions/excercise/${id}`,basic)
    return response.data
  }

  static async excerciseFilled(id){
    const response = await axios.post(`${this.BASE_URL}/questions/excercise-filled/${id}`)
    return response.data
  }

  static async handleGoals(basic,id){
    const response = await axios.post(`${this.BASE_URL}/questions/goals/${id}`,basic)
    return response.data
  }

  static async goalsFilled(id){
    const response = await axios.post(`${this.BASE_URL}/questions/goals-filled/${id}`)
    return response.data
  }

  static async saveActivity(activity,id){
    const response = await axios.post(`${this.BASE_URL}/activity/save/${id}`,activity)
    return response.data
  }

  static async getActivity(id){
    const response = await axios.get(`${this.BASE_URL}/activity/today/${id}`)
    return response.data
  }

  static async fillDistance(id,activity){
    const response = await axios.post(`${this.BASE_URL}/activity/fill-distance/${id}`,activity)
    return response.data
  }

  static async getAllStepsOfWeek(id){
    const response = await axios.get(`${this.BASE_URL}/activity/all-steps/${id}`)
    return response.data
  }

  static async getWorkOutSuggestions(id){

    const response = await axios.get(`${this.BASE_URL}/workout/suggest/${id}`)
    return response.data

  }

  static async getWorkOutDetails(id){

    const response = await axios.get(`${this.BASE_URL}/workout/excercise/${id}`)
    return response.data

  }

  static async getCaloriesOfWeek(id){

    const response = await axios.get(`${this.BASE_URL}/activity/all-calories/${id}`)
    return response.data

  }

  static async getAllGoals(id){

    const response = await axios.get(`${this.BASE_URL}/goal/all-goals/${id}`)
    return response.data

  }

  static async getAllWorkouts(){

    const response = await axios.get(`${this.BASE_URL}/workout/all`)
    return response.data

  }

  static async getAiSuggestion(id){

    const response = await axios.get(`${this.BASE_URL}/goal/ai-sugg/${id}`)
    return response.data

  }

  static async addGoals(goal,id){

    const response = await axios.post(`${this.BASE_URL}/goal/add-goal/${id}`,goal)
    return response.data

  }

  static async finishWorkout(id1,id2,id3){

    const response = await axios.post(`${this.BASE_URL}/workout/finish/${id1}/${id2}/${id3}`)
    return response.data

  }

}