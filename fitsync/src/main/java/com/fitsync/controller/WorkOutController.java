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
import com.fitsync.entity.WorkoutEntity;
import com.fitsync.service.WorkoutService;

@RestController
@RequestMapping("/workout")
public class WorkOutController {
	
	@Autowired
	private WorkoutService workoutService;
	
//	@Autowired
//	private CohereService cohereService;
	
	@GetMapping("/all")
	public ResponseEntity<Response> getAllWorkouts(){
		
		Response response = workoutService.getAllWorkouts();
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}

	@PostMapping("/add")
	public ResponseEntity<Response> addWorkouts(@RequestBody WorkoutEntity workoutEntity){
		
		Response response = workoutService.addWorkOut(workoutEntity);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@GetMapping("/suggest/{id}")
	public ResponseEntity<Response> suggestWorkouts(@PathVariable Long id){
		
		Response response = workoutService.suggestWorkouts(id);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@GetMapping("/excercise/{id}")
	public ResponseEntity<Response> getDetailsOfEachExcercise(@PathVariable Long id){
		
		Response response = workoutService.getEachExcerciseOfToday(id);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@PostMapping("/finish/{id1}/{id2}/{id3}")
	public ResponseEntity<Response> finishEachWorkout(@PathVariable Long id1,@PathVariable Long id2,@PathVariable Long id3){
		
		Response response = workoutService.finishWOrkout(id1, id2, id3);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
}
