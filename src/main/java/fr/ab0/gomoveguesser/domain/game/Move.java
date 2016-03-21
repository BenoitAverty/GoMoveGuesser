package fr.ab0.gomoveguesser.domain.game;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class Move {
	
	/** column where the move was played **/
	@Getter
	private final int i;
	/** row where the move was played **/
	@Getter
	private final int j;
	
	/** Player who played the move **/
	@Getter
	private final Player player;
}
