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
import com.fitsync.entity.ActivityEntity;
import com.fitsync.service.ActivityService;

@RestController
@RequestMapping("/activity")
public class ActivityController {
	
	@Autowired
	private ActivityService activityService;

	@PostMapping("/save/{id}")
	public ResponseEntity<Response> setActivityTime(@RequestBody ActivityEntity activityEntity,@PathVariable Long id){
		
		Response response = activityService.storeActivityTime(activityEntity, id);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@GetMapping("/today/{id}")
	public ResponseEntity<Response> todayActivity(@PathVariable Long id){
		
		Response r = activityService.TodayActivity(id);
		return ResponseEntity.status(r.getStatusCode()).body(r);
		
	}
	
	@PostMapping("/fill-distance/{id}")
	public ResponseEntity<Response> distanceFill(@RequestBody ActivityEntity activityEntity,@PathVariable Long id){
		
		Response response = activityService.fillDistance(activityEntity, id);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@GetMapping("/all-steps/{id}")
	public ResponseEntity<Response> allStepsOfWeek(@PathVariable Long id){
		
		Response r = activityService.getStepsOfTheWeek(id);
		return ResponseEntity.status(r.getStatusCode()).body(r);
		
	}
	
	@GetMapping("/all-calories/{id}")
	public ResponseEntity<Response> allCalories(@PathVariable Long id){
		
		Response r = activityService.caloriesIntakeOfWeek(id);
		return ResponseEntity.status(r.getStatusCode()).body(r);
		
	}
	
	
}
