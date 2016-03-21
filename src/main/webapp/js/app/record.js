(function() {
  var jboard = new JGO.Board(19);
  var jsetup;
  var player = JGO.BLACK; // next player
  var ko = false, lastMove = false; // ko coordinate and last move coordinate
  var lastHover = false, lastX = -1, lastY = -1; // hover helper vars
  var lastMoveValid = false, lastMoveSent = false;
  var lastCrossMarkCoord;
  var lastPlay;

  function createBoard(board) {
    document.getElementById('board').innerHTML = '';
    jsetup = new JGO.Setup(board, JGO.BOARD.medium);
    jsetup.setOptions({stars: {points:9}});
    jsetup.create('board', function(canvas) {
      canvas.addListener('click', function(coord, ev) {

        // clear hover away - it'll be replaced or then it will be an illegal move
        // in any case so no need to worry about putting it back afterwards
        if(lastHover)
          board.setType(new JGO.Coordinate(lastX, lastY), JGO.CLEAR);

        lastHover = false;

        lastPlay = board.playMove(coord, player, ko);

        if(lastPlay.success) {
          lastMoveValid = true;
          lastMoveSent = false;
          if(lastCrossMarkCoord != lastMove) {
            board.setMark(lastCrossMarkCoord, JGO.MARK.NONE)
            board.setType(lastCrossMarkCoord, JGO.CLEAR);
          }
          board.setMark(coord, JGO.MARK.CROSS);
          board.setType(coord, player == JGO.WHITE ? JGO.DIM_WHITE : JGO.DIM_BLACK);
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
          board.setType(new JGO.Coordinate(lastX, lastY), JGO.CLEAR);

        lastX = coord.i;
        lastY = coord.j;

        if(board.getType(coord) == JGO.CLEAR && board.getMark(coord) == JGO.MARK.NONE) {
          board.setType(coord, player == JGO.WHITE ? JGO.DIM_WHITE : JGO.DIM_BLACK);
          lastHover = true;
        } else
          lastHover = false;
      });

      canvas.addListener('mouseout', function(ev) {
        if(lastHover)
          board.setType(new JGO.Coordinate(lastX, lastY), JGO.CLEAR);

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

            board.setType(lastCrossMarkCoord, player); // play stone
            board.setType(lastPlay.captures, JGO.CLEAR); // clear opponent's stones

            if(lastMove)
              board.setMark(lastMove, JGO.MARK.NONE); // clear previous mark
            if(ko)
              board.setMark(ko, JGO.MARK.NONE); // clear previous ko mark

            board.setMark(lastCrossMarkCoord, JGO.MARK.CIRCLE); // mark move
            lastMove = lastCrossMarkCoord;

            if(lastPlay.ko)
              board.setMark(lastPlay.ko, JGO.MARK.SQUARE); // mark ko, too
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
  }


  function loadSGF(sgfFile) {
    var jrecord = JGO.sgf.load(sgfFile, true);
    if(typeof jrecord == 'string') {
      alert('Error loading SGF: ' + jrecord);
      return;
    }
    if(!(jrecord instanceof JGO.Record)) {
      alert('Empty SGF or multiple games in one SGF not supported!');
      return;
    }

    var lastMoveSgf, lastMoveSgfCoord, sgfMovesList = [];
    while(lastMoveSgf = jrecord.next()) {
      lastMoveSgfCoord = lastMoveSgf.changes.find(function(e) { return e.hasOwnProperty('type'); }).c;

      lastPlay = jboard.playMove(lastMoveSgfCoord, player, ko);

      if(lastPlay.success) {

        var opponent = (player == JGO.BLACK) ? JGO.WHITE : JGO.BLACK;

        sgfMovesList.push({i: lastMoveSgfCoord.i, j: lastMoveSgfCoord.j});

        jboard.setType(lastMoveSgfCoord, player); // play stone
        jboard.setType(lastPlay.captures, JGO.CLEAR); // clear opponent's stones

        player = opponent;
      }
    }

    var password = document.getElementById('password').value;
    apiSubmitMoves(sgfMovesList, password)
    .then(function() {
      jboard.setMark(lastMoveSgfCoord, JGO.MARK.CIRCLE); // mark move
      lastMove = lastMoveSgfCoord;

      if(lastPlay.ko)
        jboard.setMark(lastPlay.ko, JGO.MARK.SQUARE); // mark ko, too
      ko = lastPlay.ko;
    })
    .catch(function(error) {
      alert('Couldn\'t send sgf moves to server. Reload this page.' + error );
    });
  }

  document.getElementById('submit_sgf').addEventListener('click', function() {
    var files = document.getElementById('sgf_file').files;
    if(files.length !== 1) {
      alert('please select one sgf file');
    }

    var sgfFile = files[0];
    var reader = new FileReader();

    reader.onloadend = function(evt) {
      if(evt.target.readyState == FileReader.DONE) {
        loadSGF(evt.target.result);
      }
    }

    reader.readAsText(sgfFile);
    return false;
  });

  createBoard(jboard);
  apiGetGame().then(function(game) {
    game.moves.forEach(function(move) {

      var moveCoord = new JGO.Coordinate(move.i, move.j);
      lastPlay = jboard.playMove(moveCoord, player, ko);

      if(lastPlay.success) {

        var opponent = (player == JGO.BLACK) ? JGO.WHITE : JGO.BLACK;

        jboard.setType(moveCoord, player); // play stone
        jboard.setType(lastPlay.captures, JGO.CLEAR); // clear opponent's stones

        player = opponent;
        lastMove = moveCoord;
      }
    });

    jboard.setMark(lastMove, JGO.MARK.CIRCLE); // mark move

    if(lastPlay.ko)
      jboard.setMark(lastPlay.ko, JGO.MARK.SQUARE); // mark ko, too
    ko = lastPlay.ko;
  });
})();
