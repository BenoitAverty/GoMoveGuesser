package fr.ab0.gomoveguesser.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.ab0.gomoveguesser.application.dto.MoveDto;
import fr.ab0.gomoveguesser.domain.game.Game;
import fr.ab0.gomoveguesser.domain.game.GameRepository;

@RestController
@RequestMapping("/api/games")
public class GameController {
	
	@Value("${gomoveguesser.password")
	private String password;
	
	@Autowired
	private GameRepository gameRepository;
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<Game> getGame() {
		
		Game g = gameRepository.findFirstByOrderByUuidAsc();
		
		return ResponseEntity.ok().body(g);
		
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/moves")
	public ResponseEntity<Void> postMove(MoveDto m) {
		
		Game g = gameRepository.findFirstByOrderByUuidAsc();
		
		if(! m.password.equals(password)) {
			return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
		}
		g.addMove(m.x, m.y);
		
		return ResponseEntity.ok().build();
	}
	
}
