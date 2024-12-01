package com.fitsync.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fitsync.DTO.Response;
import com.fitsync.entity.QuestionsEntity;
import com.fitsync.entity.UserEntity;
import com.fitsync.exception.OurException;
import com.fitsync.repository.QuestionRepository;
import com.fitsync.repository.UserRepository;

@Service
public class QuestionService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private QuestionRepository questionRepository;

	///////////////////////////////////////////////////////////////////
	
	public Response basicFilled(Long userId) {
		
		Response response = new Response();
		
		try {
			
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new OurException("User not found"));
			
			QuestionsEntity questionsEntity = questionRepository.findByUserEntityId(userId);
			
			if(!questionsEntity.getGender().isBlank()) {
				
				response.setStatusCode(200);
				response.setMessage("Already Filled");
				return response;
			}
			else {
				
				response.setStatusCode(400);
				response.setMessage("not Filled");
				return response;
				
			}
			
		}
		catch(OurException e) {
			
			response.setStatusCode(400);
			response.setMessage("not Filled");
			return response;
			
		}
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage("not filled");
			return response;
		}
		
	}

	public Response handleBasic(QuestionsEntity questionsEntity,Long userId) {
		
		Response response = new Response();
		
		try {
			
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new OurException("User Not Found"));
			
			if(questionsEntity.getGender().isBlank()||questionsEntity.getAge()<=0||questionsEntity.getHeight()<=0||questionsEntity.getWeight()<=0) {
				
				response.setStatusCode(400);
				response.setMessage("Check All The Fields");
				return response;
				
			}
			questionsEntity.setUserEntity(userEntity);
			
			questionRepository.save(questionsEntity);
			
			response.setStatusCode(200);
			response.setMessage("Success");
			return response;
			
		}
		
		catch(OurException e) {
			
			response.setStatusCode(400);
			response.setMessage("Check All The Fields");
			return response;
			
		}
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage(e.getMessage());
			return response;
		}
	}
	
	//////////////////////////////////////////////////////////////////////
	
	public Response dietFilled(Long userId) {
		
		Response response = new Response();
		
		try {
			
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new OurException("User not found"));
			
			QuestionsEntity questionsEntity = questionRepository.findByUserEntityId(userId);
			
			if(!questionsEntity.getDietType().isBlank()) {
				
				response.setStatusCode(200);
				response.setMessage("Already Filled");
				return response;
			}
			else {
				
				response.setStatusCode(400);
				response.setMessage("not Filled");
				return response;
				
			}
			
		}
		catch(OurException e) {
			
			response.setStatusCode(400);
			response.setMessage("not Filled");
			return response;
			
		}
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage("not filled");
			return response;
		}
		
	}

	public Response handleDiet(QuestionsEntity questionsEntity,Long userId) {
		
		Response response = new Response();
		
		try {
			
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new OurException("User Not Found"));
			
			if(questionsEntity.getDietType().isBlank()) {
				
				response.setStatusCode(400);
				response.setMessage("Check All The Fields");
				return response;
				
			}
			
			questionRepository.insertDietByUserId(questionsEntity.getDietType(),userId);
			
			QuestionsEntity questionsEntity2= questionRepository.findByUserEntityId(userId);
			
			for(String s:questionsEntity.getFoodAllergies()) {
				
				questionRepository.updateFoodAllergiesById(s,questionsEntity2.getId());
				
			}
			
			
			response.setStatusCode(200);
			response.setMessage("Success");
			return response;
			
		}
		
		catch(OurException e) {
			
			response.setStatusCode(400);
			response.setMessage("Check All The Fields");
			return response;
			
		}
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage(e.getMessage());
			return response;
		}
	}
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	public Response lifeStyleFilled(Long userId) {
		
		Response response = new Response();
		
		try {
			
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new OurException("User not found"));
			
			QuestionsEntity questionsEntity = questionRepository.findByUserEntityId(userId);
			
			if(!questionsEntity.getActivityLevel().isBlank()) {
				
				response.setStatusCode(200);
				response.setMessage("Already Filled");
				return response;
			}
			else {
				
				response.setStatusCode(400);
				response.setMessage("not Filled");
				return response;
				
			}
			
		}
		catch(OurException e) {
			
			response.setStatusCode(400);
			response.setMessage("not Filled");
			return response;
			
		}
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage("not filled");
			return response;
		}
		
	}

	public Response handleLifeStyle(QuestionsEntity questionsEntity,Long userId) {
		
		Response response = new Response();
		
		try {
			
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new OurException("User Not Found"));
			
			if(questionsEntity.getActivityLevel().isBlank() || questionsEntity.getSleepDuration().isBlank()) {
				
				response.setStatusCode(400);
				response.setMessage("Check All The Fields");
				return response;
				
			}
			
			questionRepository.updateLifeStyleByUserId(questionsEntity.getActivityLevel(),questionsEntity.getSleepDuration(),userId);
			
			
			response.setStatusCode(200);
			response.setMessage("Success");
			return response;
			
		}
		
		catch(OurException e) {
			
			response.setStatusCode(400);
			response.setMessage("Check All The Fields");
			return response;
			
		}
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage(e.getMessage());
			return response;
		}
	}
	
	////////////////////////////////////////////////////////////////////////////////////////
	
	public Response excerciseFilled(Long userId) {
		
		Response response = new Response();
		
		try {
			
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new OurException("User not found"));
			
			QuestionsEntity questionsEntity = questionRepository.findByUserEntityId(userId);
			
			if(!questionsEntity.getFrequency().isBlank()) {
				
				response.setStatusCode(200);
				response.setMessage("Already Filled");
				return response;
			}
			else {
				
				response.setStatusCode(400);
				response.setMessage("not Filled");
				return response;
				
			}
			
		}
		catch(OurException e) {
			
			response.setStatusCode(400);
			response.setMessage("not Filled");
			return response;
			
		}
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage("not filled");
			return response;
		}
		
	}

	public Response handleExcercise(QuestionsEntity questionsEntity,Long userId) {
		
		Response response = new Response();
		
		try {
			
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new OurException("User Not Found"));
			
			if(questionsEntity.getFrequency().isBlank() || questionsEntity.getWorkoutTypes().size()<1) {
				
				response.setStatusCode(400);
				response.setMessage("Check All The Fields");
				return response;
				
			}
			
			questionRepository.updateFrequencyById(questionsEntity.getFrequency(),userId);
			
			QuestionsEntity q = questionRepository.findByUserEntityId(userId);
			
			for(String s:questionsEntity.getWorkoutTypes()) {
				
				questionRepository.updateWorkOutById(s, q.getId());
				
			}
			
			
			response.setStatusCode(200);
			response.setMessage("Success");
			return response;
			
		}
		
		catch(OurException e) {
			
			response.setStatusCode(400);
			response.setMessage("Check All The Fields");
			return response;
			
		}
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage(e.getMessage());
			return response;
		}
	}
	
	//////////////////////////////////////////////////////////////////////////////////
	
	public Response goalsFilled(Long userId) {
		
		Response response = new Response();
		
		try {
			
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new OurException("User not found"));
			
			QuestionsEntity questionsEntity = questionRepository.findByUserEntityId(userId);
			
			if(!questionsEntity.getResultTimeline().isBlank()) {
				
				response.setStatusCode(200);
				response.setMessage("Already Filled");
				return response;
			}
			else {
				
				response.setStatusCode(400);
				response.setMessage("not Filled");
				return response;
				
			}
			
		}
		catch(OurException e) {
			
			response.setStatusCode(400);
			response.setMessage("not Filled");
			return response;
			
		}
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage("not filled");
			return response;
		}
		
	}

	public Response handleGoals(QuestionsEntity questionsEntity,Long userId) {
		
		Response response = new Response();
		
		try {
			
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new OurException("User Not Found"));
			
			if(questionsEntity.getResultTimeline().isBlank()) {
				
				response.setStatusCode(400);
				response.setMessage("Check All The Fields");
				return response;
				
			}
			
			questionRepository.updateTimeLineById(questionsEntity.getResultTimeline(),userId);
			
			QuestionsEntity q = questionRepository.findByUserEntityId(userId);
			
			for(String s:questionsEntity.getMotivations()) {
				
				questionRepository.updateMotivationsById(s, q.getId());
				
			}
			
			
			response.setStatusCode(200);
			response.setMessage("Success");
			return response;
			
		}
		
		catch(OurException e) {
			
			response.setStatusCode(400);
			response.setMessage("Check All The Fields");
			return response;
			
		}
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage(e.getMessage());
			return response;
		}
	}

}
