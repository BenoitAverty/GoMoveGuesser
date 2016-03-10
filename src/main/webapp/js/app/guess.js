(function() {

  createGuessingBoard();

  apiGetGame().then(function(game) {
    game.moves.forEach(function(move) {
      addMove(jboard, new JGO.Coordinate(move.x, move.y))
    });

    apiSubscribeWebsocket();
  });

})();
