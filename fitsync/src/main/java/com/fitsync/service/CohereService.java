package com.fitsync.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitsync.DTO.AiSuggestions;
import com.fitsync.DTO.CohereRequest;
import com.fitsync.DTO.CohereRequest2;
import com.fitsync.DTO.Response;
import com.fitsync.DTO.WorkIdName;
import com.fitsync.entity.AiSuggestionEntity;
import com.fitsync.entity.NutrientsEntity;
import com.fitsync.entity.UserEntity;
import com.fitsync.exception.OurException;
import com.fitsync.repository.AiSuggestionRepository;
import com.fitsync.repository.NutrientRepository;
import com.fitsync.repository.UserRepository;

@Service
public class CohereService {
	
	@Value("${cohere.api.url}")
    private String apiUrl;

    @Value("${cohere.api.key}")
    private String apiKey;

    @Autowired
    private RestTemplate restTemplate;
    
    @Autowired
    private NutrientRepository nutrientRepository;
    
    @Autowired
    private AiSuggestionRepository aiSuggestionRepository;
    
    @Autowired 
    private UserRepository userRepository;
    

    public String suggestNutrients(String name,String quantity,String type,String unit) {
		
		try {
			
			HttpHeaders headers = new HttpHeaders();
	        headers.set("Authorization", "Bearer " + apiKey);
	        headers.set("Content-Type", "application/json");
	        
	        String que = "food : "+name+", quantity : "+quantity+",type : "+type+",unit : "+unit+", what are the nutrients present here\r\n"
	        		+ "give it as a [{\"name\":name,\"amout\":amount in float,\"unit\":unit of amount}] no other comments from you, only result also don't include calories there and amount should be in grams";
	        
	        CohereRequest2 requestPayload = new CohereRequest2(que);
	        HttpEntity<CohereRequest2> requestEntity = new HttpEntity<>(requestPayload, headers);

	        ResponseEntity<Response> responses = restTemplate.exchange(
	            apiUrl,
	            HttpMethod.POST,
	            requestEntity,
	            Response.class
	        );
	        
	        String s = responses.getBody().getGenerations().get(0).getText();
	        
	        return s;
	        
	        
			
		}
		catch(Exception e) {
			return "Failed";
		}
		
	}
	
	
	public Response suggestTodayWorkout(Map<String,String> nutrients) {
		
		Response response = new Response();
		
		try {
			
			HttpHeaders headers = new HttpHeaders();
	        headers.set("Authorization", "Bearer " + apiKey);
	        headers.set("Content-Type", "application/json");
	        
	        String que = "[\r\n"
	        		+ "  { \"id\": 1, \"name\": \"Push-Up Progression\" },\r\n"
	        		+ "  { \"id\": 2, \"name\": \"Leg Day Blast\" },\r\n"
	        		+ "  { \"id\": 3, \"name\": \"Core Strength Circuit\" },\r\n"
	        		+ "  { \"id\": 4, \"name\": \"Full-Body HIIT\" },\r\n"
	        		+ "  { \"id\": 5, \"name\": \"Arm Sculptor\" },\r\n"
	        		+ "  { \"id\": 6, \"name\": \"Cardio Kickstart\" },\r\n"
	        		+ "  { \"id\": 7, \"name\": \"Yoga Flow\" },\r\n"
	        		+ "  { \"id\": 8, \"name\": \"Back Builder\" },\r\n"
	        		+ "  { \"id\": 9, \"name\": \"Glute Activation\" },\r\n"
	        		+ "  { \"id\": 10, \"name\": \"Stretch and Recovery\" },\r\n"
	        		+ "  { \"id\": 11, \"name\": \"Core Crusher\" },\r\n"
	        		+ "  { \"id\": 12, \"name\": \"Leg Power\" },\r\n"
	        		+ "  { \"id\": 13, \"name\": \"HIIT Blitz\" },\r\n"
	        		+ "  { \"id\": 14, \"name\": \"Mobility Reset\" },\r\n"
	        		+ "  { \"id\": 15, \"name\": \"Full-Body Blast\" },\r\n"
	        		+ "  { \"id\": 16, \"name\": \"Arm Sculptor\" },\r\n"
	        		+ "  { \"id\": 17, \"name\": \"Speed & Agility\" },\r\n"
	        		+ "  { \"id\": 18, \"name\": \"Pilates Core\" },\r\n"
	        		+ "  { \"id\": 19, \"name\": \"Functional Strength\" },\r\n"
	        		+ "  { \"id\": 20, \"name\": \"Flex & Stretch\" }\r\n"
	        		+ "]\r\n"
	        		+ "from this,  Suggest a combination of 6 workouts or a day that because i had foods which contains \"total_nutrients\":"+nutrients+". Please give it in a JSON format as [{\"id\":id,\"name\":name},{},..] give this, separated by commas.no other comments from you, just result";
	        
	        CohereRequest2 requestPayload = new CohereRequest2(que);
	        HttpEntity<CohereRequest2> requestEntity = new HttpEntity<>(requestPayload, headers);

	        ResponseEntity<Response> responses = restTemplate.exchange(
	            apiUrl,
	            HttpMethod.POST,
	            requestEntity,
	            Response.class
	        );
	        
	        String s = responses.getBody().getGenerations().get(0).getText();
	        
	        ObjectMapper objectMapper = new ObjectMapper();
	        
	        List<WorkIdName> workIdNames = objectMapper.readValue(s, objectMapper.getTypeFactory().constructCollectionType(List.class, WorkIdName.class));
	        
	        response.setWorkIdNames(workIdNames);
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
	
	
	public Response suggestHealthPoints(Long userId) {
		
		Response response = new Response();
		
		try {
			
			UserEntity userEntity = userRepository.findById(userId).orElseThrow(()->new Exception("user not found"));
			
			HttpHeaders headers = new HttpHeaders();
	        headers.set("Authorization", "Bearer " + apiKey);
	        headers.set("Content-Type", "application/json");
	        
	        LocalDate today = LocalDate.now();
	        
	        if(aiSuggestionRepository.existsByDateAndUserEntityId(today,userId)) {
	        	
	        	AiSuggestionEntity aiSuggestionEntities = aiSuggestionRepository.findAllByDateAndUserEntityId(today,userId);
	        	
	        	List<AiSuggestions> sugges = new ArrayList<AiSuggestions>();
	        	
	        	for(AiSuggestions a:aiSuggestionEntities.getAiSuggestions()) {
	        		
	        		sugges.add(a);
	        		
	        	}
	        	
	        	response.setAiSuggestions(sugges);
	        	
	        }
	        
	        else {
	        
	        List<NutrientsEntity> nutrientEntities = nutrientRepository.findAllByDateAndUserEntityId(today, userId);
	        
	        if(nutrientEntities.size()>0) {
	        
	        for(NutrientsEntity n:nutrientEntities) {
	        	
	        	n.setUserEntity(null);
	        	
	        }
	        
	        String que = nutrientEntities+", from this give me some suggestion based on workouts or food suggestions for users, just give result no other comments from you, give result as JSON FORMAT [{id:id in int,suggestion:suggestion},{},....] maximum 6 suggestions";
	        
	        CohereRequest requestPayload = new CohereRequest(que);
	        HttpEntity<CohereRequest> requestEntity = new HttpEntity<>(requestPayload, headers);

	        ResponseEntity<Response> responses = restTemplate.exchange(
	            apiUrl,
	            HttpMethod.POST,
	            requestEntity,
	            Response.class
	        );
	        
	        String s = responses.getBody().getGenerations().get(0).getText();
	        
	        System.out.println(s);
	        
	        ObjectMapper objectMapper = new ObjectMapper();
	        
	        List<AiSuggestions> sugg = objectMapper.readValue(s, objectMapper.getTypeFactory().constructCollectionType(List.class, AiSuggestions.class));
	        
	        AiSuggestionEntity aiSuggestionEntity = new AiSuggestionEntity();
	        
	        aiSuggestionEntity.setAiSuggestions(sugg);
	        aiSuggestionEntity.setDate(today);
	        aiSuggestionEntity.setUserEntity(userEntity);
	        
	        aiSuggestionRepository.save(aiSuggestionEntity);
	        
	        response.setAiSuggestions(sugg);
	        
	        }
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
