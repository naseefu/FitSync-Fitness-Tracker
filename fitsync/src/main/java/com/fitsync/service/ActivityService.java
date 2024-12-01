package com.fitsync.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fitsync.DTO.Response;
import com.fitsync.entity.ActivityEntity;
import com.fitsync.entity.GoalEntity;
import com.fitsync.entity.NutrientsEntity;
import com.fitsync.entity.UserEntity;
import com.fitsync.repository.ActivityRepository;
import com.fitsync.repository.GoalRepository;
import com.fitsync.repository.NutrientRepository;
import com.fitsync.repository.UserRepository;

@Service
public class ActivityService {

	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ActivityRepository activityRepository;
	
	@Autowired
	private NutrientRepository nutrientRepository;
	
	@Autowired
	private GoalRepository goalRepository;
	
	public static LocalDate getStartOfWeek(LocalDate date) {
        return date.with(DayOfWeek.MONDAY);
    }

    public static LocalDate getEndOfWeek(LocalDate date) {
        return date.with(DayOfWeek.SUNDAY);
    }
	
	
	public Response storeActivityTime(ActivityEntity activityEntity,Long userId) {
		
		Response r = new Response();
		
		try {
			
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()-> new Exception("User not found"));
			
			LocalDate today = LocalDate.now();
			
			if(activityRepository.existsByDateAndUserEntityId(today,userId)) {
				
				ActivityEntity activityEntity1 = activityRepository.findByDateAndUserEntityId(today,userId);
				
				Long time = activityEntity1.getTime()+activityEntity.getTime();
				
				activityRepository.updateActivityByUserIdAndDate(time,userId,today);
				
				r.setStatusCode(200);
				r.setMessage("Success");
				
			}
			else {
				
				activityEntity.setUserEntity(userEntity);
				activityEntity.setDate(today);
				activityRepository.save(activityEntity);
				
				r.setStatusCode(200);
				r.setMessage("Success");
				
			}
			
			return r;
			
		}
		catch(Exception e) {
			
			r.setStatusCode(500);
			r.setMessage("Failed"+e.getMessage());
			return r;
		}
		
	}
	
	
	public Response TodayActivity(Long userId) {
		
		Response r = new Response();
		
		try {
			
			LocalDate today = LocalDate.now();
			
			if(activityRepository.existsByDateAndUserEntityId(today, userId)) {
				
				ActivityEntity activityEntity = activityRepository.findByDateAndUserEntityId(today, userId);
				
				Long time = activityEntity.getTime()/60;
				
				r.setTimeInMinutes(time);
				r.setStatusCode(200);
				r.setMessage("Success");
				
			}
			
			else {
				
				r.setTimeInMinutes((long) 0);
				r.setStatusCode(200);
				r.setMessage("Success");
				
			}
			
			LocalTime t = LocalTime.parse("15:00:00");
			
			LocalDateTime dateTime = LocalDateTime.of(today, t);
			
			if(activityRepository.existsByUpdatedDistanceAndUserEntityId(today,userId)) {
				
				ActivityEntity activityEntity = activityRepository.findByDateAndUserEntityId(today, userId);
				
				r.setDistance(activityEntity.getDistance());
				r.setDistanceFilled(false);
				
			}
			else {
				
				if(LocalDateTime.now().isAfter(dateTime)) {
					
					r.setDistanceFilled(true);
					
				}
				
				else {
					
					if(activityRepository.existsByUpdatedDistanceAndUserEntityId(today.minusDays(1),userId)) {
						
						ActivityEntity activityEntity = activityRepository.findByDateAndUserEntityId(today.minusDays(1), userId);
						
						r.setDistance(activityEntity.getDistance());
						
					}
					r.setDistanceFilled(false);
				}	
			}
			
			return r;
			
		}
		catch(Exception e) {
			
			r.setStatusCode(500);
			r.setMessage("Failed"+e.getMessage());
			return r;
		}	
	}
	
	public Response fillDistance(ActivityEntity activityEntity,Long userId) {
		
		Response response = new Response();
		
		try {
			
			@SuppressWarnings("unused")
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new Exception("User not found"));
			
			if(activityRepository.existsByDateAndUserEntityId(LocalDate.now(), userId)) {
				
				LocalDate today = LocalDate.now();
				
				activityRepository.updateDistanceByDateAndUserId(today,activityEntity.getDistance(),today,userId);
				
				ActivityEntity activityEntity2 = activityRepository.findByDateAndUserEntityId(today, userId);
				
				GoalEntity goal = goalRepository.findByGoalTypeAndUserEntityId("steps",userId);
				
				if(goal!=null) {
					
					System.out.println("hello");
					
					Long currSteps;
					
					if(goal.getNowSteps()!=null) {
						
						currSteps = goal.getNowSteps();
						
					}
					else {
						
						currSteps =(long) 0;
						
					}
					Long thisStep = activityEntity.getDistance()*1000*4/3;
					
					System.out.println(currSteps+thisStep);
					
					if((currSteps+thisStep)>=goal.getStepTarget()) {
						
						System.out.println("hello1");
						
						goalRepository.updateStepsOfGoals("steps",goal.getStepTarget(),"completed",userId);
						
					}
					else {
						
						System.out.println("hello2");
						
						goalRepository.updateStepsOfGoals("steps", currSteps+thisStep,"on going", userId);
						
					}
					
				}
				
				response.setDistance(activityEntity2.getDistance());
				
				response.setStatusCode(200);
				response.setMessage("Success");
				return response;
				
			}
			
			else {
				
				response.setStatusCode(400);
				response.setMessage("Failed");
				return response;
				
			}
			
			
		}
		catch(Exception e) {
			
			response.setStatusCode(500);
			response.setMessage("Failed");
			return response;
			
		}
		
	}
	
	
	public Response getStepsOfTheWeek(Long userId) {
		
		Response response = new Response();
		
		try {
			
			
			LocalDate today = LocalDate.now();
			
			LocalDate start = getStartOfWeek(today);
			LocalDate end = getEndOfWeek(today);
			
			List<ActivityEntity> activityEntities = activityRepository.findAllByUserEntityIdBetweenDates(userId,start,end);
			
			Map<String, Integer> distances = new LinkedHashMap<>();
			
			distances.put("mon", 0);
			distances.put("tue", 0);
			distances.put("wed", 0);
			distances.put("thu", 0);
			distances.put("fri", 0);
			distances.put("sat", 0);
			distances.put("sun", 0);
			
			for(ActivityEntity a:activityEntities) {
				
				String day = a.getDate().getDayOfWeek().toString().toLowerCase().substring(0, 3);
				
				if(a.getDistance()!=null) {
				
					distances.put(day,a.getDistance().intValue());
				
				}
				
			}
			
			response.setDistances(distances);
			response.setStatusCode(200);
			
			response.setMessage("Success");
			
			return response;
			
			
			
			
		}
		catch(Exception e) {
			
			response.setStatusCode(500);
			response.setMessage("Failed");
			return response;
			
		}
		
		
	}
	
	
	public Response caloriesIntakeOfWeek(Long userId) {
		
		Response response = new Response();
		
		if(userId==null) {
			
			response.setStatusCode(400);
			response.setMessage("Login first");
			return response;
			
		}
		
		try {
			
			Map<String, Integer> caloryData = new HashMap<>();

	        caloryData.put("carbohydrates", 4);
	        caloryData.put("proteins", 4);
	        caloryData.put("fats", 9);
	        caloryData.put("fiber", 4);
	        caloryData.put("sugar", 4);
	        caloryData.put("salt", 1);
	        caloryData.put("alcohol", 7);
	        caloryData.put("alcohols", 7);
	        caloryData.put("carbohydrate", 4);
	        caloryData.put("protein", 4);
	        caloryData.put("fat", 9);
	        caloryData.put("fibers", 4);
	        caloryData.put("sugars", 4);
	        caloryData.put("salts", 1);
	        
	        LocalDate today = LocalDate.now();
	        
	        LocalDate start = getStartOfWeek(today);
	        LocalDate end = getEndOfWeek(today);
	        
	        List<NutrientsEntity> nutrientsEntities = nutrientRepository.findAllBetweenDates(userId,start,end);
	        
	        Map<String, Long> calories = new LinkedHashMap<>();
			
	        calories.put("mon", (long) 0);
	        calories.put("tue",(long) 0);
	        calories.put("wed",(long) 0);
	        calories.put("thu",(long) 0);
	        calories.put("fri",(long) 0);
	        calories.put("sat",(long) 0);
	        calories.put("sun",(long) 0);
	        
	        for(NutrientsEntity n:nutrientsEntities) {
	        	
	        	if(caloryData.containsKey(n.getName())) {
	        		
	        		String day = n.getDate().getDayOfWeek().toString().toLowerCase().substring(0, 3);
	        		
	        		Long calory = (long) (caloryData.get(n.getName())*n.getAmount());
	        		
	        		Long initialCalory = calories.get(day);
	        		
	        		calories.put(day, calory+initialCalory);
	        		
	        	}
	        	
	        }
	        
	        response.setCalories(calories);
	        response.setStatusCode(200);
	        response.setMessage("Success");
	        
	        return response;
		}
		catch(Exception e) {
			
			response.setStatusCode(500);
			response.setMessage("Failed");
			return response;
			
		}
		
	}
	
}
