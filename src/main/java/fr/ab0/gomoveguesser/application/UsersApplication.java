package fr.ab0.gomoveguesser.application;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import fr.ab0.gomoveguesser.application.dto.UserDto;
import fr.ab0.gomoveguesser.domain.user.User;
import fr.ab0.gomoveguesser.domain.user.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UsersApplication {
	
	@Autowired
	private UserRepository userRepository;
	
	public List<UserDto> getUsers() {
		
		List<User> users = userRepository.findAll();
		
		return users.stream().map(UserDto::new).collect(Collectors.toList());
	}
	
}
