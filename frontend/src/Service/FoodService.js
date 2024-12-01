import axios from "axios";

export default class FoodService{

  static BASE_URL = "http://localhost:8080"

  static getHeader(){
    const token = localStorage.getItem('token');
    return{
      Authorization:`Bearer ${token}`,
      "Content-Type":"application/json"
    };
  }

  static async addBreakfast(food,id){

    const response = await axios.post(`${this.BASE_URL}/food/breakfast/add/${id}`,food)
    return response.data

  }

  static async addLunch(food,id){

    const response = await axios.post(`${this.BASE_URL}/food/lunch/add/${id}`,food)
    return response.data

  }

  static async addSnacks(food,id){

    const response = await axios.post(`${this.BASE_URL}/food/snacks/add/${id}`,food)
    return response.data

  }

  static async addDinner(food,id){

    const response = await axios.post(`${this.BASE_URL}/food/dinner/add/${id}`,food)
    return response.data

  }

  static async getAllFoodsOfToday(id,date){
    const response = await axios.get(`${this.BASE_URL}/food/all-today/${id}/${date}`)
    return response.data
  }

  static async getAllNutrients(id,date){
    const response = await axios.get(`${this.BASE_URL}/food/all-nut/${id}/${date}`)
    return response.data
  }

  static async deleteFood(id,type,userId){

    const response = await axios.post(`${this.BASE_URL}/food/delete/${id}/${type}/${userId}`)
    return response.data

  }

}