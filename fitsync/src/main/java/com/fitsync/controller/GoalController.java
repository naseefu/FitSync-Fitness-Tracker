package com.fitsync.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsync.DTO.Response;
import com.fitsync.entity.GoalEntity;
import com.fitsync.service.CohereService;
import com.fitsync.service.GoalService;

@RestController
@RequestMapping("/goal")
public class GoalController {
	
	@Autowired
	private GoalService goalService;
	
	@Autowired
	private CohereService cohereService;

	@PostMapping("/add-goal/{id}")
	public ResponseEntity<Response> addGoal(@RequestBody GoalEntity goalEntity,@PathVariable Long id){
		
		Response response = goalService.setGoalForUser(goalEntity, id);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@GetMapping("/all-goals/{id}")
	public ResponseEntity<Response> getAllGoals(@PathVariable Long id){
		
		Response response = goalService.getAllGoals(id);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@GetMapping("/ai-sugg/{id}")
	public ResponseEntity<Response> aiSuggestions(@PathVariable Long id){
		
		Response response = cohereService.suggestHealthPoints(id);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
}
