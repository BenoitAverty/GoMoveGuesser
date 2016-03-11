package fr.ab0.gomoveguesser.domain.user;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@AllArgsConstructor
@EqualsAndHashCode
public class Guess {
	@Getter
	private final int x;
	
	@Getter
	private final int y;
}
