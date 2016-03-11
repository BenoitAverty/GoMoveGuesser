package fr.ab0.gomoveguesser.domain.user;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScoreCalculator {
	
	@Autowired
	UserRepository userRepository;
	
	/** Adjust all players scores according to the coordinates of the move that was played */
	public void adjustScores(Integer x, Integer y) {
		
		List<User> users = userRepository.findAll();
		
		Map<Guess, Integer> numberPerGuess = new HashMap<>();
		Map<Guess, List<User>> playersPerGuess = new HashMap<>();
		
		Integer maximumGuessNumber = 0;
		Guess winningGuess = new Guess(x, y);
		
		
		for (User user : users) {
			Guess curGuess = user.getLastMoveGuess();
			if(curGuess != null) {
				if(numberPerGuess.containsKey(curGuess)) {
					numberPerGuess.put(curGuess, numberPerGuess.get(curGuess)+1);
				}
				else {
					numberPerGuess.put(curGuess, 1);
				}
				
				if(numberPerGuess.get(curGuess) > maximumGuessNumber) {
					maximumGuessNumber = numberPerGuess.get(curGuess);
				}
				
				if(!playersPerGuess.containsKey(curGuess)) {
					playersPerGuess.put(curGuess, new ArrayList<>());
				}
				
				playersPerGuess.get(curGuess).add(user);
			}
			user.clearGuess();
		}
		
		List<User> winningPlayers = playersPerGuess.get(winningGuess);
		if(winningPlayers != null) {
			Float winningScore = (float)maximumGuessNumber / winningPlayers.size();
			winningPlayers.forEach(u -> {
				u.addScore(Math.round(winningScore));
			});
		}
		
		users.forEach(userRepository::save);
	}
	
}
