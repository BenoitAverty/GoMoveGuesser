(function() {
  var jboard = new JGO.Board(19);
  var jsetup = new JGO.Setup(jboard, JGO.BOARD.medium);
  var player = JGO.BLACK; // next player
  var ko = false, lastMove = false; // ko coordinate and last move coordinate
  var lastHover = false, lastX = -1, lastY = -1; // hover helper vars
  var lastMoveValid = false, lastMoveSent = false;
  var lastCrossMarkCoord;
  var lastPlay;

  jsetup.setOptions({stars: {points:9}});
  jsetup.create('board', function(canvas) {
    canvas.addListener('click', function(coord, ev) {

      // clear hover away - it'll be replaced or then it will be an illegal move
      // in any case so no need to worry about putting it back afterwards
      if(lastHover)
        jboard.setType(new JGO.Coordinate(lastX, lastY), JGO.CLEAR);

      lastHover = false;

      lastPlay = jboard.playMove(coord, player, ko);

      if(lastPlay.success) {
        lastMoveValid = true;
        lastMoveSent = false;
        if(lastCrossMarkCoord != lastMove) {
          jboard.setMark(lastCrossMarkCoord, JGO.MARK.NONE)
          jboard.setType(lastCrossMarkCoord, JGO.CLEAR);
        }
        jboard.setMark(coord, JGO.MARK.CROSS);
        jboard.setType(coord, player == JGO.WHITE ? JGO.DIM_WHITE : JGO.DIM_BLACK);
        lastCrossMarkCoord = coord;
      }
      else {
        alert('Illegal move: ' + lastPlay.errorMsg);
      }
    });

    canvas.addListener('mousemove', function(coord, ev) {
      if(coord.i == -1 || coord.j == -1 || (coord.i == lastX && coord.j == lastY))
        return;

      if(lastHover) // clear previous hover if there was one
        jboard.setType(new JGO.Coordinate(lastX, lastY), JGO.CLEAR);

      lastX = coord.i;
      lastY = coord.j;

      if(jboard.getType(coord) == JGO.CLEAR && jboard.getMark(coord) == JGO.MARK.NONE) {
        jboard.setType(coord, player == JGO.WHITE ? JGO.DIM_WHITE : JGO.DIM_BLACK);
        lastHover = true;
      } else
        lastHover = false;
    });

    canvas.addListener('mouseout', function(ev) {
      if(lastHover)
        jboard.setType(new JGO.Coordinate(lastX, lastY), JGO.CLEAR);

      lastHover = false;
    });

    document.getElementById('submit_move').addEventListener('click', function() {
      if(!lastMoveSent && lastMoveValid) {
        var opponent = (player == JGO.BLACK) ? JGO.WHITE : JGO.BLACK;

        var password = document.getElementById('password').value;
        apiSubmitMove(lastCrossMarkCoord, password) // submit the move to backend

        .then(function(response) {
          lastMoveSent = true;
          lastMoveValid = false;

          jboard.setType(lastCrossMarkCoord, player); // play stone
          jboard.setType(lastPlay.captures, JGO.CLEAR); // clear opponent's stones

          if(lastMove)
            jboard.setMark(lastMove, JGO.MARK.NONE); // clear previous mark
          if(ko)
            jboard.setMark(ko, JGO.MARK.NONE); // clear previous ko mark

          jboard.setMark(lastCrossMarkCoord, JGO.MARK.CIRCLE); // mark move
          lastMove = lastCrossMarkCoord;

          if(lastPlay.ko)
            jboard.setMark(lastPlay.ko, JGO.MARK.SQUARE); // mark ko, too
          ko = lastPlay.ko;

          player = opponent;
        }
      )
      .catch(function(response) {
        alert('Failure : '+response.status)
      });

      }
    });
  });
})();
