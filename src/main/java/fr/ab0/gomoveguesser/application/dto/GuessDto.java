package fr.ab0.gomoveguesser.application.dto;

import fr.ab0.gomoveguesser.domain.user.Guess;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class GuessDto {
	
	public GuessDto(Guess guess) {
		if(guess != null) {
			this.i = guess.getX();
			this.j = guess.getY();	
		}
	}
	
	public int i;
	public int j;
	public String username;
	public String password;
}
