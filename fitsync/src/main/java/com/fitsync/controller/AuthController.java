package com.fitsync.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsync.DTO.Response;
import com.fitsync.entity.UserEntity;
import com.fitsync.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private AuthService authService;
	
	
	@PostMapping("/register/{confirm}")
	public ResponseEntity<Response> registerUser(@RequestBody UserEntity userEntity,@PathVariable String confirm){
		
		Response response = authService.registerNormal(userEntity, confirm);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<Response> loginUser(@RequestBody UserEntity userEntity){
		
		Response response = authService.loginUser(userEntity);
		return ResponseEntity.status(response.getStatusCode()).body(response);
		
	}
	
	
}
