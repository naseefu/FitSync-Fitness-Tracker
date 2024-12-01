package com.fitsync.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsync.DTO.Response;
import com.fitsync.entity.QuestionsEntity;
import com.fitsync.service.QuestionService;

@RestController
@RequestMapping("/questions")
public class QuestionsController {
	
	@Autowired
	private QuestionService questionService;

	@PostMapping("/basic/{id}")
	public ResponseEntity<Response> saveBasic(@RequestBody QuestionsEntity questionsEntity,@PathVariable Long id){
		
		Response response = questionService.handleBasic(questionsEntity,id);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@PostMapping("/basic-filled/{id}")
	public ResponseEntity<Response> fillBasic(@PathVariable Long id){
		
		Response response = questionService.basicFilled(id);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@PostMapping("/diet/{id}")
	public ResponseEntity<Response> saveDiet(@RequestBody QuestionsEntity questionsEntity,@PathVariable Long id){
		
		Response response = questionService.handleDiet(questionsEntity,id);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@PostMapping("/diet-filled/{id}")
	public ResponseEntity<Response> fillDiet(@PathVariable Long id){
		
		Response response = questionService.dietFilled(id);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@PostMapping("/life/{id}")
	public ResponseEntity<Response> saveLifeStyle(@RequestBody QuestionsEntity questionsEntity,@PathVariable Long id){
		
		Response response = questionService.handleLifeStyle(questionsEntity,id);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@PostMapping("/life-filled/{id}")
	public ResponseEntity<Response> fillLifeStyle(@PathVariable Long id){
		
		Response response = questionService.lifeStyleFilled(id);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@PostMapping("/excercise/{id}")
	public ResponseEntity<Response> saveExcercise(@RequestBody QuestionsEntity questionsEntity,@PathVariable Long id){
		
		Response response = questionService.handleExcercise(questionsEntity,id);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@PostMapping("/excercise-filled/{id}")
	public ResponseEntity<Response> fillExcercise(@PathVariable Long id){
		
		Response response = questionService.excerciseFilled(id);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@PostMapping("/goals/{id}")
	public ResponseEntity<Response> saveGoals(@RequestBody QuestionsEntity questionsEntity,@PathVariable Long id){
		
		Response response = questionService.handleGoals(questionsEntity,id);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@PostMapping("/goals-filled/{id}")
	public ResponseEntity<Response> fillGoals(@PathVariable Long id){
		
		Response response = questionService.goalsFilled(id);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
}
