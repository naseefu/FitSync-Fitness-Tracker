package com.fitsync.service;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fitsync.DTO.Response;
import com.fitsync.DTO.UserDTO;
import com.fitsync.entity.UserEntity;
import com.fitsync.exception.OurException;
import com.fitsync.repository.UserRepository;
import com.fitsync.utils.JWTUtils;
import com.fitsync.utils.Utils;

@Service
public class AuthService {
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JWTUtils jwtUtils;
	
//	@Autowired
//	private QuestionRepository questionRepository;
	
	
	private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom secureRandom = new SecureRandom();

    public static String generatedRandomAlphanumeric(int length) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            char randomChar = ALPHANUMERIC_STRING.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }
        return stringBuilder.toString();
    }

	
	
	
	public Response registerNormal(UserEntity user,String confirmpass) {
		Response response = new Response();
		try {
			
			if(user.getRole()==null || user.getRole().isBlank()) {
				user.setRole("USER");
			}
			
			if(user.getFirstname()==null || user.getEmail()==null || user.getDob()==null || user.getPassword()==null || user.getLastname()==null ) {
				throw new OurException("Please Fill all the fields");
			}
			
			if(user.getAvatar().equals("")) {
				throw new OurException("Please choose an avatar");
			}
			
			if(!user.isAccept()) {
				throw new OurException("Please accept Terms of Services");
			}
			
			
			if(user.getPhonenumber()==null) {
				throw new OurException("Please Fill Phone number");
			}
			
			if(userRepository.existsByEmail(user.getEmail())) {
				throw new OurException("User Already exist");
			}
			
			if(!user.getPassword().equals(confirmpass)) {
				throw new OurException("Password doesn't match");
			}
			
			
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			user.setVerified(false);
			String otp = generatedRandomAlphanumeric(6);
			user.setOtp(otp);
			
			userRepository.save(user);
			response.setUserDTO(Utils.mapUserEntityToUserDTO(user));
			response.setStatusCode(200);
			response.setMessage("success");
			
		}catch(OurException e) {
			response.setStatusCode(400);
			response.setMessage(e.getMessage());
		}
		catch(Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error occured during User Registration " + e.getMessage());
		}
		return response;
		
	}
	
	public Response loginUser(UserEntity login) {
		
		Response response = new Response();
		
		if(login.getEmail()==null || login.getPassword()==null || login.getEmail().isBlank() || login.getPassword().isBlank()) {
			
			response.setStatusCode(400);
			response.setMessage("fill all the fields");
			return response;
			
		}
		
		try {
			
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword()));
			
			UserEntity user = userRepository.findByEmail(login.getUsername()).orElseThrow(()->new OurException("Email Not Found"));
			
			UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
			
			var token = jwtUtils.generatedToken(user);
			
			response.setMessage("Success");
			response.setToken(token);
			response.setStatusCode(200);
			response.setUserDTO(userDTO);
			
			return response;
			
			
		}
		catch(AuthenticationException e) {
			
			response.setStatusCode(400);
			response.setMessage("Email/Password Not Found");
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
