package com.fitsync.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fitsync.DTO.Response;
import com.fitsync.entity.ActivityEntity;
import com.fitsync.entity.BreakfastEntity;
import com.fitsync.entity.DinnerEntity;
import com.fitsync.entity.GoalEntity;
import com.fitsync.entity.LunchEntity;
import com.fitsync.entity.QuestionsEntity;
import com.fitsync.entity.SnacksEntity;
import com.fitsync.entity.UserEntity;
import com.fitsync.exception.OurException;
import com.fitsync.repository.ActivityRepository;
import com.fitsync.repository.BreakFastRepository;
import com.fitsync.repository.DinnerRepository;
import com.fitsync.repository.GoalRepository;
import com.fitsync.repository.LunchRepository;
import com.fitsync.repository.QuestionRepository;
import com.fitsync.repository.SnacksRepository;
import com.fitsync.repository.UserRepository;

@Service
public class GoalService {

	@Autowired
	private  UserRepository userRepository;
	
	@Autowired
	private GoalRepository goalRepository;
	
	@Autowired
	private QuestionRepository questionRepository;
	
	@Autowired
	private BreakFastRepository breakFastRepository;
	
	@Autowired
	private LunchRepository lunchRepository;
	
	@Autowired
	private SnacksRepository snacksRepository;
	
	@Autowired
	private DinnerRepository dinnerRepository;
	
	@Autowired
	private ActivityRepository activityRepository;
	
	
	private float parseQuantity(String quantity) {
	    try {
	        return Float.parseFloat(quantity);
	    } catch (NumberFormatException e) {
	        return 0; // Return 0 if parsing fails
	    }
	}
	
	public Response setGoalForUser(GoalEntity g,Long userId) {
		
		Response response = new Response();
		
		try {
			
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new OurException("User not found"));
			
			LocalDate today = LocalDate.now();
			
			if(g.getGoalType().toLowerCase().equals("weight")) {
				
				QuestionsEntity questionsEntity = questionRepository.findByUserEntityId(userId);
				
				g.setDate(today);
				g.setNowWeight(questionsEntity.getWeight());
				g.setUserEntity(userEntity);
				
				goalRepository.save(g);
				
			}
			
			else if(g.getGoalType().toLowerCase().equals("food")) {
			    float quantity = 0;

			    BreakfastEntity b = breakFastRepository.findByFoodNameAndAddedDateAndUserEntityId(g.getFoodName().toLowerCase(), today, userId);
			    LunchEntity l = lunchRepository.findByFoodNameAndAddedDateAndUserEntityId(g.getFoodName().toLowerCase(), today, userId);
			    SnacksEntity s = snacksRepository.findByFoodNameAndAddedDateAndUserEntityId(g.getFoodName().toLowerCase(), today, userId);
			    DinnerEntity d = dinnerRepository.findByFoodNameAndAddedDateAndUserEntityId(g.getFoodName().toLowerCase(), today, userId);

			    if (b != null && b.getQuantity() != null) {
			        quantity += parseQuantity(b.getQuantity());
			    }
			    if (l != null && l.getQuantity() != null) {
			        quantity += parseQuantity(l.getQuantity());
			    }
			    if (s != null && s.getQuantity() != null) {
			        quantity += parseQuantity(s.getQuantity());
			    }
			    if (d != null && d.getQuantity() != null) {
			        quantity += parseQuantity(d.getQuantity());
			    }

			    g.setNowQuantity(String.valueOf((int)quantity));
			    g.setDate(today);
			    g.setUserEntity(userEntity);
			    goalRepository.save(g);
			}

			
			
			else if(g.getGoalType().toLowerCase().equals("steps")) {
				
				ActivityEntity activityEntity = activityRepository.findByDateAndUserEntityId(today, userId);
				
				if(goalRepository.existsByGoalTypeAndUserEntityId("steps",userId)){
					
					goalRepository.deleteByGoalTypeAndUserEntityId("steps",userId);
					
				}
				
				if(activityEntity.getDistance()!=null) {
					Long steps = (long) ((activityEntity.getDistance()*1000)/0.75);
				
					g.setNowSteps(steps);
				}
				
				else {
					
					ActivityEntity activityEntity1 = activityRepository.findByDateAndUserEntityId(today.minusDays(1), userId);
					
					if(activityEntity1.getDistance()!=null) {
						
						Long steps = (long) ((activityEntity1.getDistance()*1000)/0.75);
						
						g.setNowSteps(steps);
						
					}
					else {
						
						g.setNowSteps((long)0);
						
					}
					
				}
				
				g.setDate(today);
				g.setUserEntity(userEntity);
				
				goalRepository.save(g);
				
			}
			
			else if(g.getGoalType().toLowerCase().equals("calorie")) {
				
				g.setUserEntity(userEntity);
				g.setDate(today);
				
				goalRepository.save(g);
				
			}
			else {
				
				response.setStatusCode(400);
				response.setMessage("Invalid goal");
				return response;
				
			}
			
			response.setStatusCode(200);
			response.setMessage("Success");
			return response;
			
		}
		
		catch(OurException e) {
			
			response.setStatusCode(400);
			response.setMessage("Failed to set goal");
			return response;
			
		}
		
		catch(Exception e) {
			
			response.setStatusCode(500);
			response.setMessage("Failed to add goal");
			return response;
			
		}
		
	}
	
	public Response getAllGoals(Long userId) {
		
		
		Response response = new Response();
		
		try {
			
			if(userId==null) {
				
				response.setStatusCode(400);
				response.setMessage("Longin First");
				return response;
			}
			
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new OurException("User not found"));
			
			List<GoalEntity> goalEntities = goalRepository.findAllByUserEntityId(userId);
			
			if(goalEntities!=null) {
				
				for(GoalEntity g:goalEntities) {
					
					g.setUserEntity(null);
					
				}
				
			}
			
			response.setGoalEntities(goalEntities);
			response.setStatusCode(200);
			response.setMessage("Success");
			
			return response;
			
			
		}
		catch(OurException e) {
			
			response.setStatusCode(400);
			response.setMessage("Failed to get goal");
			return response;
			
		}
		
		catch(Exception e) {
			
			response.setStatusCode(500);
			response.setMessage("Failed to get goal");
			return response;
			
		}
		
		
	}
	
	
}
