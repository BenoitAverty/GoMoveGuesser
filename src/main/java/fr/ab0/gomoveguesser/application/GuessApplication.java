package fr.ab0.gomoveguesser.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import fr.ab0.gomoveguesser.application.dto.GuessDto;
import fr.ab0.gomoveguesser.domain.user.User;
import fr.ab0.gomoveguesser.domain.user.UserRepository;

@Service
public class GuessApplication {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	
	public void submitGuess(GuessDto guess) {
		
		User user = userRepository.findByUsernameIgnoreCase(guess.username);
		
		if(user == null) {
			user = new User(guess.username, guess.password);
		}
		
		if(!user.getPassword().equals(guess.password)) {
			throw new WrongPasswordException();
		}
		
		user.addGuess(guess.i, guess.j);
		userRepository.save(user);
		
		simpMessagingTemplate.convertAndSend("/topic/guesses", "");
	}
}
