package fr.ab0.gomoveguesser.domain.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import fr.ab0.gomoveguesser.domain.Entity;
import lombok.Getter;

@Document(collection="users")
public class User extends Entity {
	
	public User(String u, String p) {
		this.username = u;
		this.password = p;
	}
	
	@Getter
	private String username;
	
	@Getter
	private String password;
	
	private List<Guess> guesses;
	
	public List<Guess> getGuesses() {
		return new ArrayList<>(guesses);
	}

	public void addGuess(int x, int y) {
		Guess g = new Guess(x, y);
		this.guesses.add(g);
	}
}
