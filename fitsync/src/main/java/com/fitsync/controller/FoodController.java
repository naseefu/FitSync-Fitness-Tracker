package com.fitsync.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsync.DTO.Response;
import com.fitsync.entity.BreakfastEntity;
import com.fitsync.entity.DinnerEntity;
import com.fitsync.entity.LunchEntity;
import com.fitsync.entity.SnacksEntity;
import com.fitsync.service.FoodService;

@RestController
@RequestMapping("/food")
public class FoodController {
	
	@Autowired
	private FoodService foodService;

	
	@PostMapping("/breakfast/add/{userId}")
	public ResponseEntity<Response> addBreakFast(@RequestBody BreakfastEntity breakfastEntity,@PathVariable Long userId){
		
		Response response = foodService.addBreakfast(breakfastEntity,userId);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@PostMapping("/lunch/add/{userId}")
	public ResponseEntity<Response> addLunch(@RequestBody LunchEntity breakfastEntity,@PathVariable Long userId){
		
		Response response = foodService.addLunch(breakfastEntity,userId);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@PostMapping("/snacks/add/{userId}")
	public ResponseEntity<Response> addSnacks(@RequestBody SnacksEntity breakfastEntity,@PathVariable Long userId){
		
		Response response = foodService.addSnacks(breakfastEntity,userId);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@PostMapping("/dinner/add/{userId}")
	public ResponseEntity<Response> addDinner(@RequestBody DinnerEntity breakfastEntity,@PathVariable Long userId){
		
		Response response = foodService.addDinner(breakfastEntity,userId);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@GetMapping("/all-today/{id}/{date}")
	public ResponseEntity<Response> getAllFoodsbyToday(@PathVariable Long id,@PathVariable LocalDate date){
		
		Response response = foodService.getAllFoodByToday(id,date);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@GetMapping("/all-nut/{id}/{date}")
	public ResponseEntity<Response> getNutrients(@PathVariable Long id,@PathVariable LocalDate date){
		
		Response response = foodService.getAllNutrients(id,date);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@PostMapping("/delete/{id}/{type}/{userId}")
	public ResponseEntity<Response> deleteFood(@PathVariable Long id,@PathVariable String type,@PathVariable Long userId){
		
		Response response = foodService.deleteFoodItems(id, type, userId);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
}
