package fr.ab0.gomoveguesser.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.ab0.gomoveguesser.application.UsersApplication;
import fr.ab0.gomoveguesser.application.dto.UserDto;

@RestController
@RequestMapping("/api/users")
public class UsersController {
	
	@Autowired
	UsersApplication usersApplication;
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<UserDto>> getUsers() {
		
		
		
		return ResponseEntity.ok().body(usersApplication.getUsers());
	}
}
