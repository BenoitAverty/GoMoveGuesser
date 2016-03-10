package fr.ab0.gomoveguesser.domain.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class Guess {
	@Getter
	private int x;
	
	@Getter
	private int y;
}
