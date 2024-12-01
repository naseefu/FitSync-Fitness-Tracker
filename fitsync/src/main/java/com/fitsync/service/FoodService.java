package com.fitsync.service;

import java.time.LocalDate;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitsync.DTO.FoodDTO;
import com.fitsync.DTO.Response;
import com.fitsync.entity.BreakfastEntity;
import com.fitsync.entity.DinnerEntity;
import com.fitsync.entity.GoalEntity;
import com.fitsync.entity.LunchEntity;
import com.fitsync.entity.NutrientsEntity;
import com.fitsync.entity.SnacksEntity;
import com.fitsync.entity.UserEntity;
import com.fitsync.exception.OurException;
import com.fitsync.repository.BreakFastRepository;
import com.fitsync.repository.DinnerRepository;
import com.fitsync.repository.GoalRepository;
import com.fitsync.repository.LunchRepository;
import com.fitsync.repository.NutrientRepository;
import com.fitsync.repository.SnacksRepository;
import com.fitsync.repository.UserRepository;
import com.fitsync.utils.Utils;

import jakarta.transaction.Transactional;

@Service
public class FoodService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BreakFastRepository breakFastRepository;
	
	@Autowired
	private LunchRepository lunchRepository;
	
	@Autowired
	private SnacksRepository snacksRepository;
	
	@Autowired
	private DinnerRepository dinnerRepository;
	
	@Autowired
	private CohereService cohereService;
	
	@Autowired
	private NutrientRepository nutrientRepository;
	
	@Autowired
	private GoalRepository goalRepository;
	

	public Response addBreakfast(BreakfastEntity breakfastEntity, Long userId) {
		
		Response response = new Response();
		
		try {
			
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new OurException("User not found"));
			
			if(userId==null) {
				
				response.setStatusCode(400);
				return response;
			}
			
			if(breakfastEntity.getSelectedMealType().isBlank() || !breakfastEntity.getSelectedMealType().toLowerCase().equals("breakfast") || 
					breakfastEntity.getFoodName().isBlank() || 
					breakfastEntity.getQuantity().isBlank() || breakfastEntity.getUnit().isBlank()) {
				
				response.setStatusCode(400);
				response.setMessage("Check all the fields");
				return response;
				
			}
			else {
				
				breakfastEntity.setAddedDate(LocalDate.now());
				breakfastEntity.setUserEntity(userEntity);
				breakfastEntity.setSelectedMealType(breakfastEntity.getSelectedMealType().toLowerCase());
				BreakfastEntity breakfastEntity2 = breakFastRepository.save(breakfastEntity);
				
				if(goalRepository.existsByGoalTypeAndFoodNameAndUserEntityId("food",breakfastEntity.getFoodName().toLowerCase(),userId)) {
					
					GoalEntity goalEntity = goalRepository.findByGoalTypeAndFoodNameAndUserEntityId("food",breakfastEntity.getFoodName().toLowerCase(),userId);
					
					if(goalEntity!=null) {
						
						Long quan = Long.valueOf(goalEntity.getNowQuantity())+Long.valueOf(breakfastEntity.getQuantity());
						
						if(quan>=Long.valueOf(goalEntity.getFoodQuantity())){
							
							goalRepository.updateQuantityByFoodName("food",breakfastEntity.getFoodName(),goalEntity.getFoodQuantity(),"completed",userId);
							
						}
						else {
							goalRepository.updateQuantityByFoodName("food",breakfastEntity.getFoodName(),String.valueOf(quan),"on going",userId);
						}
						
						
					}
					
				}
				
				String sugg = cohereService.suggestNutrients(breakfastEntity2.getFoodName(), breakfastEntity2.getQuantity(), breakfastEntity2.getSelectedMealType(), breakfastEntity2.getUnit());
				
				ObjectMapper mapper = new ObjectMapper();
				
				List<NutrientsEntity> nutrients = mapper.readValue(sugg, mapper.getTypeFactory().constructCollectionType(List.class, NutrientsEntity.class));
				
				LocalDate today = LocalDate.now();
				
				for(NutrientsEntity e:nutrients) {
					
					e.setDate(today);
					e.setUserEntity(userEntity);
					e.setName(e.getName().toLowerCase());
					
					if(nutrientRepository.existsByDateAndName(today,e.getName().toLowerCase())) {
						
						NutrientsEntity n = nutrientRepository.findByDateAndName(today,e.getName().toLowerCase());
						
						float amount = n.getAmount()+e.getAmount();
						
						nutrientRepository.updateQuantityById(amount,n.getId());
						
					}
					else {
						
						if(e.getUnit().equals("milligrams")) {
							
							e.setUnit("grams");
							e.setAmount(e.getAmount()/1000);
							nutrientRepository.save(e);
							
						}
						
						else {
							nutrientRepository.save(e);
						}
						
					}
					
				}
				
				
				response.setFoodDTO(Utils.mapBreakFastEntityToFoodDTO(breakfastEntity2));
				response.setStatusCode(200);
				response.setMessage("Success");
				return response;
				
			}
			
		}
		
		catch(OurException e) {
			response.setStatusCode(400);
			response.setMessage("Error adding food");
			return response;
		}
		
		catch(Exception e) {
			response.setStatusCode(400);
			response.setMessage("Error adding food");
			return response;
		}
		
	}
	
	
	/////////////////////////////////////////////////////////////////////////////
	
	
	public Response addLunch(LunchEntity breakfastEntity, Long userId) {
		
		Response response = new Response();
		
		try {
			
			if(userId==null) {
				
				response.setStatusCode(400);
				return response;
			}

			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new OurException("User not found"));
			
			if(breakfastEntity.getSelectedMealType().isBlank() || !breakfastEntity.getSelectedMealType().toLowerCase().equals("lunch") || 
					breakfastEntity.getFoodName().isBlank() || 
					breakfastEntity.getQuantity().isBlank() || breakfastEntity.getUnit().isBlank()) {
				
				response.setStatusCode(400);
				response.setMessage("Check all the fields");
				return response;
				
			}
			else {
				
				breakfastEntity.setAddedDate(LocalDate.now());
				breakfastEntity.setUserEntity(userEntity);
				LunchEntity lunchEntity = lunchRepository.save(breakfastEntity);
				
				if(goalRepository.existsByGoalTypeAndFoodNameAndUserEntityId("food",breakfastEntity.getFoodName().toLowerCase(),userId)) {
					
					GoalEntity goalEntity = goalRepository.findByGoalTypeAndFoodNameAndUserEntityId("food",breakfastEntity.getFoodName().toLowerCase(),userId);
					
					if(goalEntity!=null) {
						
						Long quan = Long.valueOf(goalEntity.getNowQuantity())+Long.valueOf(breakfastEntity.getQuantity());
						
						if(quan>=Long.valueOf(goalEntity.getFoodQuantity())){
							
							goalRepository.updateQuantityByFoodName("food",breakfastEntity.getFoodName(),goalEntity.getFoodQuantity(),"completed",userId);
							
						}
						else {
							goalRepository.updateQuantityByFoodName("food",breakfastEntity.getFoodName(),String.valueOf(quan),"on going",userId);
						}
						
						
					}
					
				}
				
				String sugg = cohereService.suggestNutrients(lunchEntity.getFoodName(), lunchEntity.getQuantity(), lunchEntity.getSelectedMealType(), lunchEntity.getUnit());
				
				ObjectMapper mapper = new ObjectMapper();
				
				List<NutrientsEntity> nutrients = mapper.readValue(sugg, mapper.getTypeFactory().constructCollectionType(List.class, NutrientsEntity.class));
				
				LocalDate today = LocalDate.now();
				
				for(NutrientsEntity e:nutrients) {
					
					e.setDate(today);
					e.setUserEntity(userEntity);
					e.setName(e.getName().toLowerCase());
					
					if(nutrientRepository.existsByDateAndName(today,e.getName().toLowerCase())) {
						
						NutrientsEntity n = nutrientRepository.findByDateAndName(today,e.getName().toLowerCase());
						
						float amount = n.getAmount()+e.getAmount();
						
						nutrientRepository.updateQuantityById(amount,n.getId());
						
					}
					else {
						
						if(e.getUnit().equals("milligrams")) {
							
							e.setUnit("grams");
							e.setAmount(e.getAmount()/1000);
							nutrientRepository.save(e);
							
						}
						
						else {
							nutrientRepository.save(e);
						}
						
					}
					
				}
				
				response.setFoodDTO(Utils.mapLunchEntityToFoodDTO(lunchEntity));
				response.setStatusCode(200);
				response.setMessage("Success");
				return response;
				
			}
			
		}
		
		catch(OurException e) {
			response.setStatusCode(400);
			response.setMessage("Error adding food");
			return response;
		}
		
		catch(Exception e) {
			response.setStatusCode(400);
			response.setMessage("Error adding food");
			return response;
		}
		
	}
	
	
	//////////////////////////////////////////////////////////////////////////////
	
	
	public Response addSnacks(SnacksEntity breakfastEntity, Long userId) {
		
		Response response = new Response();
		
		try {
			
			if(userId==null) {
				
				response.setStatusCode(400);
				return response;
			}
			
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new OurException("User not found"));
			
			if(breakfastEntity.getSelectedMealType().isBlank() || !breakfastEntity.getSelectedMealType().toLowerCase().equals("snacks") || 
					breakfastEntity.getFoodName().isBlank() || 
					breakfastEntity.getQuantity().isBlank() || breakfastEntity.getUnit().isBlank()) {
				
				response.setStatusCode(400);
				response.setMessage("Check all the fields");
				return response;
				
			}
			else {
				
				breakfastEntity.setAddedDate(LocalDate.now());
				breakfastEntity.setUserEntity(userEntity);
				SnacksEntity breakfastEntity2 = snacksRepository.save(breakfastEntity);
				
				if(goalRepository.existsByGoalTypeAndFoodNameAndUserEntityId("food",breakfastEntity.getFoodName().toLowerCase(),userId)) {
					
					GoalEntity goalEntity = goalRepository.findByGoalTypeAndFoodNameAndUserEntityId("food",breakfastEntity.getFoodName().toLowerCase(),userId);
					
					if(goalEntity!=null) {
						
						Long quan = Long.valueOf(goalEntity.getNowQuantity())+Long.valueOf(breakfastEntity.getQuantity());
						
						if(quan>=Long.valueOf(goalEntity.getFoodQuantity())){
							
							goalRepository.updateQuantityByFoodName("food",breakfastEntity.getFoodName(),goalEntity.getFoodQuantity(),"completed",userId);
							
						}
						else {
							goalRepository.updateQuantityByFoodName("food",breakfastEntity.getFoodName(),String.valueOf(quan),"on going",userId);
						}
						
						
					}
					
				}
				
				String sugg = cohereService.suggestNutrients(breakfastEntity2.getFoodName(), breakfastEntity2.getQuantity(), breakfastEntity2.getSelectedMealType(), breakfastEntity2.getUnit());
				
				ObjectMapper mapper = new ObjectMapper();
				
				List<NutrientsEntity> nutrients = mapper.readValue(sugg, mapper.getTypeFactory().constructCollectionType(List.class, NutrientsEntity.class));
				
				LocalDate today = LocalDate.now();
				
				for(NutrientsEntity e:nutrients) {
					
					e.setDate(today);
					e.setUserEntity(userEntity);
					e.setName(e.getName().toLowerCase());
					
					if(nutrientRepository.existsByDateAndName(today,e.getName().toLowerCase())) {
						
						NutrientsEntity n = nutrientRepository.findByDateAndName(today,e.getName().toLowerCase());
						
						float amount = n.getAmount()+e.getAmount();
						
						nutrientRepository.updateQuantityById(amount,n.getId());
						
					}
					else {
						
						if(e.getUnit().equals("milligrams")) {
							
							e.setUnit("grams");
							e.setAmount(e.getAmount()/1000);
							nutrientRepository.save(e);
							
						}
						
						else {
							nutrientRepository.save(e);
						}
						
					}
					
				}
				
				response.setFoodDTO(Utils.mapSnacksEntityToFoodDTO(breakfastEntity2));
				response.setStatusCode(200);
				response.setMessage("Success");
				return response;
				
			}
			
		}
		
		catch(OurException e) {
			response.setStatusCode(400);
			response.setMessage("Error adding food");
			return response;
		}
		
		catch(Exception e) {
			response.setStatusCode(400);
			response.setMessage("Error adding food");
			return response;
		}
		
	}
	
	
	/////////////////////////////////////////////////////////////////////////
	
	public Response addDinner(DinnerEntity breakfastEntity, Long userId) {
		
		Response response = new Response();
		
		try {
			
			if(userId==null) {
				
				response.setStatusCode(400);
				return response;
			}
			
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new OurException("User not found"));
			
			if(breakfastEntity.getSelectedMealType().isBlank() || !breakfastEntity.getSelectedMealType().toLowerCase().equals("dinner") || 
					breakfastEntity.getFoodName().isBlank() || 
					breakfastEntity.getQuantity().isBlank() || breakfastEntity.getUnit().isBlank()) {
				
				response.setStatusCode(400);
				response.setMessage("Check all the fields");
				return response;
				
			}
			else {
				
				breakfastEntity.setAddedDate(LocalDate.now());
				breakfastEntity.setUserEntity(userEntity);
				DinnerEntity breakfastEntity2 = dinnerRepository.save(breakfastEntity);
				
				if(goalRepository.existsByGoalTypeAndFoodNameAndUserEntityId("food",breakfastEntity.getFoodName().toLowerCase(),userId)) {
					
					GoalEntity goalEntity = goalRepository.findByGoalTypeAndFoodNameAndUserEntityId("food",breakfastEntity.getFoodName().toLowerCase(),userId);
					
					if(goalEntity!=null) {
						
						Long quan = Long.valueOf(goalEntity.getNowQuantity())+Long.valueOf(breakfastEntity.getQuantity());
						
						if(quan>=Long.valueOf(goalEntity.getFoodQuantity())){
							
							goalRepository.updateQuantityByFoodName("food",breakfastEntity.getFoodName(),goalEntity.getFoodQuantity(),"completed",userId);
							
						}
						else {
							goalRepository.updateQuantityByFoodName("food",breakfastEntity.getFoodName(),String.valueOf(quan),"on going",userId);
						}
						
						
					}
					
				}
				
				String sugg = cohereService.suggestNutrients(breakfastEntity2.getFoodName(), breakfastEntity2.getQuantity(), breakfastEntity2.getSelectedMealType(), breakfastEntity2.getUnit());
				
				ObjectMapper mapper = new ObjectMapper();
				
				List<NutrientsEntity> nutrients = mapper.readValue(sugg, mapper.getTypeFactory().constructCollectionType(List.class, NutrientsEntity.class));
				
				LocalDate today = LocalDate.now();
				
				for(NutrientsEntity e:nutrients) {
					
					e.setDate(today);
					e.setUserEntity(userEntity);
					e.setName(e.getName().toLowerCase());
					
					if(nutrientRepository.existsByDateAndName(today,e.getName().toLowerCase())) {
						
						NutrientsEntity n = nutrientRepository.findByDateAndName(today,e.getName().toLowerCase());
						
						float amount = n.getAmount()+e.getAmount();
						
						nutrientRepository.updateQuantityById(amount,n.getId());
						
					}
					else {
						
						if(e.getUnit().equals("milligrams")) {
							
							e.setUnit("grams");
							e.setAmount(e.getAmount()/1000);
							nutrientRepository.save(e);
							
						}
						
						else {
							nutrientRepository.save(e);
						}
						
					}
					
				}
				
				response.setFoodDTO(Utils.mapDinnerEntityToFoodDTO(breakfastEntity2));
				response.setStatusCode(200);
				response.setMessage("Success");
				return response;
				
			}
			
		}
		
		catch(OurException e) {
			response.setStatusCode(400);
			response.setMessage("Error adding food");
			return response;
		}
		
		catch(Exception e) {
			response.setStatusCode(400);
			response.setMessage("Error adding food");
			return response;
		}
		
	}
	
	
	////////////////////////////////////////////////////////////////////////////////////
	
	
	public Response getAllFoodByToday(Long userId,LocalDate today) {
		
		Response response = new Response();
		
		try {
			
			if(userId==null) {
				
				response.setStatusCode(400);
				response.setMessage("Invalid User");
				return response;
				
			}
			
			@SuppressWarnings("unused")
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new OurException("User not found"));
			
			List<BreakfastEntity> breakfastEntities = breakFastRepository.getByDateAndUserId(today,userId);
			
			List<LunchEntity> lunchEntities = lunchRepository.getByDateAndUserId(today,userId);
			
			List<SnacksEntity> snacksEntities = snacksRepository.getByDateAndUserId(today,userId);
			
			List<DinnerEntity> dinnerEntities = dinnerRepository.getByDateAndUserId(today,userId);
			
//			List<NutrientsEntity> nutrientsEntities = nutrientRepository.findAllByDateAndUserEntityId(today,userId);
			
//			response.setNutrientsEntity(nutrientsEntities);
			
			List<FoodDTO> foodDTOs1 = new ArrayList<FoodDTO>();
			List<FoodDTO> foodDTOs2 = new ArrayList<FoodDTO>();
			List<FoodDTO> foodDTOs3 = new ArrayList<FoodDTO>();
			List<FoodDTO> foodDTOs4 = new ArrayList<FoodDTO>();
			
			for(BreakfastEntity b:breakfastEntities) {
				
				foodDTOs1.add(Utils.mapBreakFastEntityToFoodDTO(b));
				
			}
			
			for(LunchEntity l:lunchEntities) {
				foodDTOs2.add(Utils.mapLunchEntityToFoodDTO(l));
			}
			
			for(SnacksEntity s:snacksEntities) {
				foodDTOs3.add(Utils.mapSnacksEntityToFoodDTO(s));
			}
			
			for(DinnerEntity d:dinnerEntities) {
				foodDTOs4.add(Utils.mapDinnerEntityToFoodDTO(d));
			}
			
//			response.setNutrientsEntity(nutrientsEntities);
			response.setBreakfast(foodDTOs1);
			response.setLunch(foodDTOs2);
			response.setSnacks(foodDTOs3);
			response.setDinner(foodDTOs4);
			
			response.setStatusCode(200);
			response.setMessage("Success");
			return response;
			
		}
		
		catch(OurException e) {
			response.setStatusCode(400);
			response.setMessage("Error getting food");
			return response;
		}
		
		catch(Exception e) {
			response.setStatusCode(400);
			response.setMessage("Error getting food");
			return response;
		}
		
	}

	public Response getAllNutrients(Long userId,LocalDate today) {
		
		Response response = new Response();
		
		System.out.println(today);
		
		try {
			
			List<NutrientsEntity> nutrientsEntities = nutrientRepository.findAllByDateAndUserEntityId(today,userId);
			
			List<NutrientsEntity> nutrientsEntities2 = new ArrayList<NutrientsEntity>();
			
			for(NutrientsEntity nuts:nutrientsEntities) {
				
				nuts.setUserEntity(null);
				nutrientsEntities2.add(nuts);
				
			}
			
			response.setNutrientsEntity(nutrientsEntities2);
			
			response.setStatusCode(200);
			response.setMessage("Success");
			
			return response;
			
		}
		
		catch(OurException e) {
			response.setStatusCode(400);
			response.setMessage("Error getting nutrients");
			return response;
		}
		
		catch(Exception e) {
			response.setStatusCode(400);
			response.setMessage("Error getting nutrients");
			return response;
		}
		
		
	}
	
	
	/////////////////////////////////////////////////////////////////////////////
	
	@Transactional
	public Response deleteFoodItems(Long id,String mealType,Long userId) {
		
		Response response = new Response();
		
		try {
			
			if(mealType.toLowerCase().equals("breakfast")) {
				
				if(breakFastRepository.existsByIdAndUserEntityId(id,userId)) {
					
					breakFastRepository.deleteByIdAndUserEntityId(id,userId);
					
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
			
			else if(mealType.toLowerCase().equals("lunch")) {
				
				if(lunchRepository.existsByIdAndUserEntityId(id,userId)) {
					
					lunchRepository.deleteByIdAndUserEntityId(id,userId);
					
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
			
			else if(mealType.toLowerCase().equals("snacks")) {
				
				if(snacksRepository.existsByIdAndUserEntityId(id,userId)) {
					
					snacksRepository.deleteByIdAndUserEntityId(id,userId);
					
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
			
			else if(mealType.toLowerCase().equals("dinner")) {
				
				if(dinnerRepository.existsByIdAndUserEntityId(id,userId)) {
					
					dinnerRepository.deleteByIdAndUserEntityId(id,userId);
					
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
			
			else {
				
				response.setStatusCode(400);
				response.setMessage("Failed");
				return response;
				
			}
			
		}
		
		catch(OurException e) {
			response.setStatusCode(400);
			response.setMessage("Error deleting food");
			return response;
		}
		
		catch(Exception e) {
			response.setStatusCode(400);
			response.setMessage("Error deleting food");
			return response;
		}
		
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	
}
