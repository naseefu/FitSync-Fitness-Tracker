package com.fitsync.DTO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fitsync.entity.ActivityEntity;
import com.fitsync.entity.GoalEntity;
import com.fitsync.entity.NutrientsEntity;
import com.fitsync.entity.UserWorkouts;
import com.fitsync.entity.WorkoutEntity;

public class Response {

	private int statusCode;
	
	private String message;
	
	private String token;
	
	private UserDTO userDTO;
	
	private List<FoodDTO> breakfast;
	
	private List<FoodDTO> lunch;
	
	private List<FoodDTO> snacks;
	
	private List<FoodDTO> dinner;
		
	private List<Generation> generations;
	
	private Long timeInMinutes;
	
	private String generatedContent;
	
	private FoodDTO foodDTO;
	
	private String s;
	
	private List<NutrientsEntity> nutrientsEntity;
	
	private String calorie;
	
	private boolean distanceFilled;
	
	private Long distance;
	
	private List<ActivityEntity> activityEntities;
	
	Map<String, Integer> distances = new HashMap<String, Integer>();
	
	List<WorkIdName> workIdNames = new ArrayList<WorkIdName>();
	
	List<WorkoutEntity> workoutEntityts = new ArrayList<>();
	
	Map<String, Long> calories = new LinkedHashMap<>();
	
	private WorkoutEntity workoutEntity;
	
	private UserWorkouts userWorkouts ;
	
	private List<GoalEntity> goalEntities;
	
	private List<AiSuggestions> aiSuggestions;

	public List<AiSuggestions> getAiSuggestions() {
		return aiSuggestions;
	}

	public void setAiSuggestions(List<AiSuggestions> aiSuggestions) {
		this.aiSuggestions = aiSuggestions;
	}

	public List<GoalEntity> getGoalEntities() {
		return goalEntities;
	}

	public void setGoalEntities(List<GoalEntity> goalEntities) {
		this.goalEntities = goalEntities;
	}

	public Map<String, Long> getCalories() {
		return calories;
	}

	public void setCalories(Map<String, Long> calories) {
		this.calories = calories;
	}

	public WorkoutEntity getWorkoutEntity() {
		return workoutEntity;
	}

	public void setWorkoutEntity(WorkoutEntity workoutEntity) {
		this.workoutEntity = workoutEntity;
	}

	public List<WorkoutEntity> getWorkoutEntityts() {
		return workoutEntityts;
	}

	public void setWorkoutEntityts(List<WorkoutEntity> workoutEntityts) {
		this.workoutEntityts = workoutEntityts;
	}

	public UserWorkouts getUserWorkouts() {
		return userWorkouts;
	}

	public void setUserWorkouts(UserWorkouts userWorkouts) {
		this.userWorkouts = userWorkouts;
	}

	public List<WorkIdName> getWorkIdNames() {
		return workIdNames;
	}

	public void setWorkIdNames(List<WorkIdName> workIdNames) {
		this.workIdNames = workIdNames;
	}

	public Map<String, Integer> getDistances() {
		return distances;
	}

	public void setDistances(Map<String, Integer> distances) {
		this.distances = distances;
	}

	public List<ActivityEntity> getActivityEntities() {
		return activityEntities;
	}

	public void setActivityEntities(List<ActivityEntity> activityEntities) {
		this.activityEntities = activityEntities;
	}

	public Long getDistance() {
		return distance;
	}

	public void setDistance(Long distance) {
		this.distance = distance;
	}

	public boolean isDistanceFilled() {
		return distanceFilled;
	}

	public void setDistanceFilled(boolean distanceFilled) {
		this.distanceFilled = distanceFilled;
	}

	public Long getTimeInMinutes() {
		return timeInMinutes;
	}

	public void setTimeInMinutes(Long timeInMinutes) {
		this.timeInMinutes = timeInMinutes;
	}

	public List<NutrientsEntity> getNutrientsEntity() {
		return nutrientsEntity;
	}

	public void setNutrientsEntity(List<NutrientsEntity> nutrientsEntity) {
		this.nutrientsEntity = nutrientsEntity;
	}

	public String getCalorie() {
		return calorie;
	}

	public void setCalorie(String calorie) {
		this.calorie = calorie;
	}

	public String getS() {
		return s;
	}

	public void setS(String s) {
		this.s = s;
	}

	public FoodDTO getFoodDTO() {
		return foodDTO;
	}

	public void setFoodDTO(FoodDTO foodDTO) {
		this.foodDTO = foodDTO;
	}

	public List<FoodDTO> getBreakfast() {
		return breakfast;
	}

	public void setBreakfast(List<FoodDTO> breakfast) {
		this.breakfast = breakfast;
	}

	public List<FoodDTO> getLunch() {
		return lunch;
	}

	public void setLunch(List<FoodDTO> lunch) {
		this.lunch = lunch;
	}

	public List<FoodDTO> getSnacks() {
		return snacks;
	}

	public void setSnacks(List<FoodDTO> snacks) {
		this.snacks = snacks;
	}

	public List<FoodDTO> getDinner() {
		return dinner;
	}

	public void setDinner(List<FoodDTO> dinner) {
		this.dinner = dinner;
	}

	public String getGeneratedContent() {
		return generatedContent;
	}

	public void setGeneratedContent(String generatedContent) {
		this.generatedContent = generatedContent;
	}

	public void setGenerations(List<Generation> generations) {
		this.generations = generations;
	}

	public List<Generation> getGenerations() {
        return generations;
    }

    public static class Generation {
        private String text;

        public String getText() {
            return text;
        }
    }

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public UserDTO getUserDTO() {
		return userDTO;
	}

	public void setUserDTO(UserDTO userDTO) {
		this.userDTO = userDTO;
	}
	
	
	
}
