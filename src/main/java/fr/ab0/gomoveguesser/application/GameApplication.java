package fr.ab0.gomoveguesser.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import fr.ab0.gomoveguesser.application.dto.GameDto;
import fr.ab0.gomoveguesser.application.dto.MoveDto;
import fr.ab0.gomoveguesser.domain.game.Game;
import fr.ab0.gomoveguesser.domain.game.GameRepository;

@Service
public class GameApplication {
	
	@Autowired
	private SimpMessagingTemplate template;
	
	@Autowired
	private GameRepository gameRepository;
	
	public GameDto getGame() {
		return new GameDto(gameRepository.findAll().iterator().next());
	}
	
	public void addMoveToGame(MoveDto move) {
		Game g = gameRepository.findAll().iterator().next();
		
		g.addMove(move.x, move.y);
		
		gameRepository.save(g);
		
		template.convertAndSend("/topic/moves", move);
	}
}
