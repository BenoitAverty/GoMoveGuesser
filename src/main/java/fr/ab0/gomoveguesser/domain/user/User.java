package fr.ab0.gomoveguesser.domain.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import fr.ab0.gomoveguesser.domain.Entity;
import lombok.Getter;

@Document(collection="users")
public class User extends Entity {
	
	@Getter
	private String username;
	
	@Getter
	private String password;
	
	@Getter
	private Boolean guessedCurrentMove;
	
	@Getter
	private Integer score;
	
	private List<Guess> guesses;
	
	public User(String username, String password) {
		
		if(username == null || password == null || username.isEmpty() || password.isEmpty()) {
			throw new IllegalArgumentException("Username and Password cannot be empty");
		}
		this.username = username;
		this.password = password;
		this.guessedCurrentMove = false;
		this.score = 0;
		this.guesses = new ArrayList<>();
	}
	
	public List<Guess> getGuesses() {
		return new ArrayList<>(guesses);
	}

	public void addGuess(int x, int y) {
		Guess g = new Guess(x, y);
		
		if(this.guessedCurrentMove) {
			guesses.remove(guesses.size()-1);
		}
		
		this.guesses.add(g);
		this.guessedCurrentMove = true;
	}
	
	/**
	 * Return the guess of this user on the last move, or null if the user didn't submit a guess for the last move.
	 */
	public Guess getLastMoveGuess() {
		if(this.guessedCurrentMove) {
			return guesses.get(guesses.size()-1);
		}
		else {
			return null;
		}
	}
	
	public void clearGuess() {
		this.guessedCurrentMove = false;
	}

	public void addScore(Integer score) {
		this.score += score;
	}
}
