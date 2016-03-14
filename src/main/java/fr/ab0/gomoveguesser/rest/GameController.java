package fr.ab0.gomoveguesser.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.ab0.gomoveguesser.application.GameApplication;
import fr.ab0.gomoveguesser.application.dto.GameDto;
import fr.ab0.gomoveguesser.rest.dto.PostMoveDto;

@RestController
@RequestMapping("/api/games")
public class GameController {
	
	@Autowired 
	private GameApplication gameApplication;
	
	@Value("${gomoveguesser.password}")
	private String password;
	
	
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<GameDto> getGame() {
		
		return ResponseEntity.ok().body(gameApplication.getGame());
		
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/moves")
	public ResponseEntity<Void> postMove(@RequestBody PostMoveDto m) {
		if(m.password==null || ! m.password.equals(password)) {
			return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
		}
		m.password = null;
		
		m.moves.stream().forEach(gameApplication::addMoveToGame);
		
		return ResponseEntity.ok().build();
	}
	
}
