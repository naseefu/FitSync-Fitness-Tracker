package com.fitsync.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fitsync.DTO.Response;
import com.fitsync.DTO.WorkIdName;
import com.fitsync.entity.EmbeddableUserWO;
import com.fitsync.entity.NutrientsEntity;
import com.fitsync.entity.UserEntity;
import com.fitsync.entity.UserWorkouts;
import com.fitsync.entity.WorkoutEntity;
import com.fitsync.exception.OurException;
import com.fitsync.repository.NutrientRepository;
import com.fitsync.repository.UserRepository;
import com.fitsync.repository.UserWorkoutsRepository;
import com.fitsync.repository.WorkoutRepository;

@Service
public class WorkoutService {

	@Autowired
	private WorkoutRepository workoutRepository;
	
	@Value("${cohere.api.url}")
    private String apiUrl;

    @Value("${cohere.api.key}")
    private String apiKey;

//    @Autowired
//    private RestTemplate restTemplate;
    
    @Autowired
    private NutrientRepository nutrientRepository;
    
    @Autowired
    private CohereService cohereService;
    
    @Autowired
    private UserWorkoutsRepository userWorkoutsRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    
    public Response getAllWorkouts() {
    	
    	Response response = new Response();
    	
    	try {
    		
    		List<WorkoutEntity> workoutEntities = workoutRepository.findAll();
    		response.setWorkoutEntityts(workoutEntities);
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
    
	
	public Response addWorkOut(WorkoutEntity workoutEntity) {
		
		Response response = new Response();
		
		try {
			
			workoutRepository.save(workoutEntity);
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
	
	public Response suggestWorkouts(Long userId) {
		
		Response response = new Response();
		
		try {
			
			
			if(userId==null) {
				
				response.setStatusCode(400);
				response.setMessage("Login First");
				return response;
				
			}
			
			Map<String, String> mapper = new HashMap<String, String>();
			
			UserEntity user = userRepository.findById(userId).orElseThrow(()->new Exception("user not found"));
			
			LocalDate today = LocalDate.now();
			
			if(userWorkoutsRepository.existsByDateAndUserEntityId(today,userId)) {
				
				UserWorkouts userWorkouts = userWorkoutsRepository.findByDateAndUserEntityId(today,userId);
				
				userWorkouts.setUserEntity(null);
				
				List<WorkoutEntity> workoutEntities = new ArrayList<>();
				
				for(EmbeddableUserWO wo:userWorkouts.getEmbeddableUserWOs()) {
					
					WorkoutEntity workoutEntity = workoutRepository.findById(wo.getId()).orElseThrow(()->new Exception("No workout"));
					workoutEntities.add(workoutEntity);
					
				}
				
				response.setUserWorkouts(userWorkouts);
				response.setWorkoutEntityts(workoutEntities);
				
			}
			
			else {
				
				LocalTime time = LocalTime.parse("15:00:00");
				LocalDateTime now = LocalDateTime.now();
				
				LocalDateTime checker = LocalDateTime.of(today, time);
				
				if(now.isAfter(checker)) {
					
					List<NutrientsEntity> nutrientsEntities = nutrientRepository.findAllByDateAndUserEntityId(LocalDate.now(), userId);
					
					for(NutrientsEntity n:nutrientsEntities) {
						
						mapper.put(n.getName(), ""+n.getAmount());
						
					}
					
					Response r = cohereService.suggestTodayWorkout(mapper);
					
					r.getWorkIdNames();
					
					List<EmbeddableUserWO> embeddableUserWOs = new ArrayList<EmbeddableUserWO>();
					
					for(WorkIdName w:r.getWorkIdNames()) {
						
						EmbeddableUserWO e = new EmbeddableUserWO();
						
						e.setCompletion((float)0);
						e.setId(w.getId());
						e.setName(w.getName());
						
						embeddableUserWOs.add(e);
						
					}
					
					UserWorkouts work = new UserWorkouts();
					work.setDate(today);
					work.setEmbeddableUserWOs(embeddableUserWOs);
					work.setUserEntity(user);
					
					UserWorkouts u = userWorkoutsRepository.save(work);
					
					u.setUserEntity(null);
					
					List<WorkoutEntity> workoutEntities = new ArrayList<>();
					
					for(EmbeddableUserWO wo:u.getEmbeddableUserWOs()) {
						
						WorkoutEntity workoutEntity = workoutRepository.findById(wo.getId()).orElseThrow(()->new Exception("No workout"));
						workoutEntities.add(workoutEntity);
						
					}
					
					response.setUserWorkouts(u);
					response.setWorkoutEntityts(workoutEntities);
					
				}
				else {
					
					
					if(userWorkoutsRepository.existsByDateAndUserEntityId(today.minusDays(1),userId)) {
						
						UserWorkouts userWorkouts = userWorkoutsRepository.findByDateAndUserEntityId(today.minusDays(1),userId);
						
						userWorkouts.setUserEntity(null);
						
						List<WorkoutEntity> workoutEntities = new ArrayList<>();
						
						for(EmbeddableUserWO wo:userWorkouts.getEmbeddableUserWOs()) {
							
							WorkoutEntity workoutEntity = workoutRepository.findById(wo.getId()).orElseThrow(()->new Exception("No workout"));
							workoutEntities.add(workoutEntity);
							
						}
						
						response.setUserWorkouts(userWorkouts);
						response.setWorkoutEntityts(workoutEntities);
						
					}
					
					else {
						
					List<NutrientsEntity> nutrientsEntities = nutrientRepository.findAllByDateAndUserEntityId(LocalDate.now().minusDays(1), userId);
					
					for(NutrientsEntity n:nutrientsEntities) {
						
						mapper.put(n.getName(), ""+n.getAmount());
						
					}
					
					Response r = cohereService.suggestTodayWorkout(mapper);
					
					r.getWorkIdNames();
					
					List<EmbeddableUserWO> embeddableUserWOs = new ArrayList<EmbeddableUserWO>();
					
					for(WorkIdName w:r.getWorkIdNames()) {
						
						EmbeddableUserWO e = new EmbeddableUserWO();
						
						e.setCompletion((float)0);
						e.setId(w.getId());
						e.setName(w.getName());
						
						embeddableUserWOs.add(e);
						
					}
					
					UserWorkouts work = new UserWorkouts();
					work.setDate(today);
					work.setEmbeddableUserWOs(embeddableUserWOs);
					work.setUserEntity(user);
					
					UserWorkouts u = userWorkoutsRepository.save(work);
					
					u.setUserEntity(null);
					
					List<WorkoutEntity> workoutEntities = new ArrayList<>();
					
					for(EmbeddableUserWO wo:u.getEmbeddableUserWOs()) {
						
						WorkoutEntity workoutEntity = workoutRepository.findById(wo.getId()).orElseThrow(()->new Exception("No workout"));
						workoutEntities.add(workoutEntity);
						
					}
					response.setUserWorkouts(u);
					response.setWorkoutEntityts(workoutEntities);
					
				}
				}
				
			}
			
			response.setStatusCode(200);
			response.setMessage("success");
			return response;
			
		}
		
		catch(Exception e) {
			
			response.setStatusCode(500);
			response.setMessage(e.getMessage());
			return response;
			
		}
		
	}
	
	public Response getEachExcerciseOfToday(Long id) {
		
		Response response = new Response();
		
		try {
			
			WorkoutEntity workoutEntity = workoutRepository.findById(id).orElseThrow(()->new Exception("Not found"));
			
			response.setWorkoutEntity(workoutEntity);
			
			response.setStatusCode(200);
			response.setMessage("Success");
			return response;
			
		}
		
		catch(Exception e) {
			
			response.setStatusCode(500);
			response.setMessage(e.getMessage());
			return response;
			
		}
	}
	
	
	public Response finishWOrkout(Long workId,Long outId,Long userId) {
		
		Response response = new Response();
		
		try {
			
			if(userId==null) {
				
				response.setStatusCode(500);
				return response;
				
			}
			
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new Exception("Not found"));
			
			if(userEntity!=null) {
				
				UserWorkouts userWorkouts = userWorkoutsRepository.findByIdAndUserEntityId(outId,userId);
				
				EmbeddableUserWO e = userWorkouts.getEmbeddableUserWOs().stream()
						.filter(work->work.getId().equals(workId))
						.findFirst()
						.orElseThrow(() -> new IllegalArgumentException("Workout detail not found with id: " + workId));
				
				if(e.getCompletion()==(float)100) {
				
					
					
				}
				
				else if(e.getCompletion()==(float)66) {
					
					e.setCompletion((float)100);
					
				}
				else {
					
					e.setCompletion(e.getCompletion()+(float)33);
					
				}
				
				userWorkoutsRepository.save(userWorkouts);
				
			}
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
