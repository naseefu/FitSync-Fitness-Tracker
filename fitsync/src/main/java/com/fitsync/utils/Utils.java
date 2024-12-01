package com.fitsync.utils;

import com.fitsync.DTO.FoodDTO;
import com.fitsync.DTO.UserDTO;
import com.fitsync.entity.BreakfastEntity;
import com.fitsync.entity.DinnerEntity;
import com.fitsync.entity.LunchEntity;
import com.fitsync.entity.SnacksEntity;
import com.fitsync.entity.UserEntity;

public class Utils {

	public static UserDTO mapUserEntityToUserDTO(UserEntity user) {
		
		UserDTO u = new UserDTO();
		
		if(user==null) {
			return null;
		}
		else {
			
			u.setId(user.getId());
			u.setFirstname(user.getFirstname());
			u.setLastname(user.getLastname());
			u.setEmail(user.getEmail());
			u.setPhonenumber(user.getPhonenumber());
			u.setDob(user.getDob());
			u.setAvatar(user.getAvatar());
			u.setCompleted(user.isCompleted());
			
			return u;
			
		}
	}
	
	public static FoodDTO mapBreakFastEntityToFoodDTO(BreakfastEntity breakfastEntity) {
	
		FoodDTO f = new FoodDTO();
		
		if(breakfastEntity==null) {
			return null;
		}
		else {
			
			f.setId(breakfastEntity.getId());
			f.setAddedDate(breakfastEntity.getAddedDate());
			f.setFoodName(breakfastEntity.getFoodName());
			f.setQuantity(breakfastEntity.getQuantity());
			f.setSelectedMealType(breakfastEntity.getSelectedMealType());
			f.setUnit(breakfastEntity.getUnit());
			
			return f;
			
		}
	
	}
	
	public static FoodDTO mapLunchEntityToFoodDTO(LunchEntity breakfastEntity) {
		
		FoodDTO f = new FoodDTO();
		
		if(breakfastEntity==null) {
			return null;
		}
		else {
			
			f.setId(breakfastEntity.getId());
			f.setAddedDate(breakfastEntity.getAddedDate());
			f.setFoodName(breakfastEntity.getFoodName());
			f.setQuantity(breakfastEntity.getQuantity());
			f.setSelectedMealType(breakfastEntity.getSelectedMealType());
			f.setUnit(breakfastEntity.getUnit());
			
			return f;
			
		}
	
	}
	
	public static FoodDTO mapSnacksEntityToFoodDTO(SnacksEntity breakfastEntity) {
		
		FoodDTO f = new FoodDTO();
		
		if(breakfastEntity==null) {
			return null;
		}
		else {
			
			f.setId(breakfastEntity.getId());
			f.setAddedDate(breakfastEntity.getAddedDate());
			f.setFoodName(breakfastEntity.getFoodName());
			f.setQuantity(breakfastEntity.getQuantity());
			f.setSelectedMealType(breakfastEntity.getSelectedMealType());
			f.setUnit(breakfastEntity.getUnit());
			
			return f;
			
		}
	
	}
	
	public static FoodDTO mapDinnerEntityToFoodDTO(DinnerEntity breakfastEntity) {
		
		FoodDTO f = new FoodDTO();
		
		if(breakfastEntity==null) {
			return null;
		}
		else {
			
			f.setId(breakfastEntity.getId());
			f.setAddedDate(breakfastEntity.getAddedDate());
			f.setFoodName(breakfastEntity.getFoodName());
			f.setQuantity(breakfastEntity.getQuantity());
			f.setSelectedMealType(breakfastEntity.getSelectedMealType());
			f.setUnit(breakfastEntity.getUnit());
			
			return f;
			
		}
	
	}

}
