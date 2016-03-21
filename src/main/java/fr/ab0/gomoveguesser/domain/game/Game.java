package fr.ab0.gomoveguesser.domain.game;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.mongodb.core.mapping.Document;

import fr.ab0.gomoveguesser.domain.Entity;

@Document(collection = "games")
public class Game extends Entity {
	
	private List<Move> moves;
	
	public void addMove(int i, int j) {
		Move m = new Move(i, j, getTurn());
		moves.add(m);
	}
	
	public List<Move> getMoves() {
		return moves.stream().collect(Collectors.toList());
	}
	
	public Player getTurn() {
		return (moves.size()%2 == 0) ? Player.BLACK : Player.WHITE;
	}
}
