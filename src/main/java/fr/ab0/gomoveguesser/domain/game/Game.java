package fr.ab0.gomoveguesser.domain.game;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import fr.ab0.gomoveguesser.domain.Entity;

@Document(collection = "games")
public class Game extends Entity {
	
	private List<Move> moves;
	
	private Player turn;
	
	public Game() {
		turn = Player.BLACK;
	}
	
	public void addMove(int x, int y) {
		Move m = new Move(x, y, turn);
		moves.add(m);
	}
}
