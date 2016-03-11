package fr.ab0.gomoveguesser.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import fr.ab0.gomoveguesser.application.dto.GameDto;
import fr.ab0.gomoveguesser.application.dto.MoveDto;
import fr.ab0.gomoveguesser.domain.game.Game;
import fr.ab0.gomoveguesser.domain.game.GameRepository;
import fr.ab0.gomoveguesser.domain.user.ScoreCalculator;

@Service
public class GameApplication {
	
	@Autowired
	private SimpMessagingTemplate template;
	
	@Autowired
	private ScoreCalculator scoreCalculator;
	
	@Autowired
	private GameRepository gameRepository;
	
	public GameDto getGame() {
		return new GameDto(gameRepository.findAll().iterator().next());
	}
	
	public void addMoveToGame(MoveDto move) {
		Game g = gameRepository.findAll().iterator().next();
		
		g.addMove(move.x, move.y);
		
		gameRepository.save(g);
		
		scoreCalculator.adjustScores(move.x, move.y);
		
		template.convertAndSend("/topic/moves", move);
	}
}
