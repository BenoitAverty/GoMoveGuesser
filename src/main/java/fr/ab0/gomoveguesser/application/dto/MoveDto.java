package fr.ab0.gomoveguesser.application.dto;

import fr.ab0.gomoveguesser.domain.game.Move;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class MoveDto {
	public MoveDto(Move m) {
		x = m.getX();
		y = m.getY();
	}
	public int y;
	public int x;
}
