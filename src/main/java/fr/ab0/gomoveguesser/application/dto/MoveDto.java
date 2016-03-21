package fr.ab0.gomoveguesser.application.dto;

import fr.ab0.gomoveguesser.domain.game.Move;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class MoveDto {
	public MoveDto(Move m) {
		i = m.getI();
		j = m.getJ();
	}
	public int i;
	public int j;
}
