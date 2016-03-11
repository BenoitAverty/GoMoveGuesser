package fr.ab0.gomoveguesser.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.ab0.gomoveguesser.application.GuessApplication;
import fr.ab0.gomoveguesser.application.WrongPasswordException;
import fr.ab0.gomoveguesser.application.dto.GuessDto;

@RestController
@RequestMapping("/api/guesses")
public class GuessController {
	
	@Autowired
	private GuessApplication guessApplication;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Void> postGuess(@RequestBody GuessDto guess) {
		
		try {
			guessApplication.submitGuess(guess);	
		}
		catch(WrongPasswordException e) {
			return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
		}
		catch(IllegalArgumentException e) {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.ok().build();
	}
}
