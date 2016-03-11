package fr.ab0.gomoveguesser.application.dto;

import fr.ab0.gomoveguesser.domain.user.User;

public class UserDto {
	public String username;
	public Integer score;
	public GuessDto lastGuess;
	
	public UserDto(User user) {
		username = user.getUsername();
		score = user.getScore();
		
		if(user.getGuessedCurrentMove()) {
			lastGuess = new GuessDto(user.getLastMoveGuess());
		}
		
	}
}
