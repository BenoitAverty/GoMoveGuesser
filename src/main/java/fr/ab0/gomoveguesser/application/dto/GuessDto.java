package fr.ab0.gomoveguesser.application.dto;

import fr.ab0.gomoveguesser.domain.user.Guess;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class GuessDto {
	
	public GuessDto(Guess guess) {
		if(guess != null) {
			this.x = guess.getX();
			this.y = guess.getY();	
		}
	}
	
	public int x;
	public int y;
	public String username;
	public String password;
}
