package fr.ab0.gomoveguesser.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.ab0.gomoveguesser.application.dto.GuessDto;
import fr.ab0.gomoveguesser.domain.user.User;
import fr.ab0.gomoveguesser.domain.user.UserRepository;

@Service
public class GuessApplication {
	
	@Autowired
	private UserRepository userRepository;
	
	public void submitGuess(GuessDto guess) {
		User user = userRepository.findByUsername(guess.pseudonym);
		
		if(user == null) {
			user = new User(guess.pseudonym, guess.password);
		}
		
		if(!user.getPassword().equals(guess.password)) {
			throw new WrongPasswordException();
		}
		
		user.addGuess(guess.x, guess.y);
		userRepository.save(user);
	}
}
