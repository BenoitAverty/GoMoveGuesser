package fr.ab0.gomoveguesser.application.dto;

import java.util.List;
import java.util.stream.Collectors;

import fr.ab0.gomoveguesser.domain.game.Game;

public class GameDto {
	public List<MoveDto> moves;
	public String turn;
	
	public GameDto(Game g) {
		moves = g.getMoves().stream().map(m -> new MoveDto(m)).collect(Collectors.toList());
		turn = g.getTurn().toString();
	}
}
