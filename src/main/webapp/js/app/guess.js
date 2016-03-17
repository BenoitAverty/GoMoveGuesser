(function() {
  var ko = false, lastMove = false; // ko coordinate and last move coordinate
  var curPlayer = JGO.BLACK;
  var jboard, jsetup;
  var lastHover = false, lastX = -1, lastY = -1; // hover helper vars
  var curUserGuess;

  // Retrieve user info, scores, guesses...
  function retrieveUserInfo() {
    return apiRetrieveUserInfo().then(function(userInfo) {
      var scores = [];
      var guesses = {};

      userInfo.forEach(function(user) {
        scores.push({username: user.username, score: user.score});
        if(user.lastGuess != null) {
          var hash = user.lastGuess.x * 19 + user.lastGuess.y;

          if(hash in guesses) {
            (guesses[hash].number)++
          }
          else {
            guesses[hash] = {
              number: 1,
              coord: new JGO.Coordinate(user.lastGuess.x, user.lastGuess.y)
            }
          }
        }
      });

      // Display scores
      scores.sort(function(a,b) {
        return a.score > b.score ? 1 : (a.score < b.score ? -1 : 0);
      });

      scoreList = document.getElementById("players");
      scoreList.innerHTML = '';
      scores.forEach(function(s) {
        if(s.score > 0 || s.username == document.getElementById("form_username").value) {
          var li = document.createElement("li");
          li.textContent = s.username + " : " + s.score + " points";
          scoreList.appendChild(li);
        }
      });

      // Display guesses
      for(i = 0;i<19;i++) {
        for(j=0;j<19;j++) {
          var mark = jboard.getMark(new JGO.Coordinate(i,j));
          if(mark !== JGO.MARK.CIRCLE && mark !== JGO.MARK.SQUARE) {
            jboard.setMark(new JGO.Coordinate(i,j), JGO.MARK.NONE);
          }
        }
      }

      var curMark = 'A';
      guessesList = document.getElementById("guesses");
      //guessesList.innerHTML = '';
      for (var key in guesses) {
        if (guesses.hasOwnProperty(key)) {
          jboard.setMark(guesses[key].coord, curMark);
          var li = document.createElement("li");
          li.innerHTML = curMark + " : <strong>" + guesses[key].number + "</strong> people guessed this";
          if(curUserGuess && guesses[key].coord.equals(curUserGuess)) li.innerHTML = li.innerHTML + " <-- This is your current guess.";
          //guessesList.appendChild(li);
          curMark = String.fromCharCode(curMark.charCodeAt() + 1);
        }
      }

      return true;
    });
  }

  // Create a board and configure hover
  function createGuessingBoard() {
      jboard = new JGO.Board(19);
      jsetup = new JGO.Setup(jboard, JGO.BOARD.medium);
      jsetup.setOptions({stars: {points:9}});
      jsetup.create('board', function(canvas) {

        canvas.addListener('click', function(coord, ev) {

          // clear hover away - it'll be replaced or then it will be an illegal move
          // in any case so no need to worry about putting it back afterwards
          if(lastHover)
            jboard.setMark(new JGO.Coordinate(lastX, lastY), JGO.MARK.NONE);

          lastHover = false;

          var guess = jboard.playMove(coord, curPlayer, ko);

          if(guess.success) {
            curUserGuess = coord;
            apiSubmitGuess(coord, document.getElementById('form_username').value, document.getElementById('form_password').value)
            .then(function(response) {
              document.getElementById('form_username').style.border='';
              document.getElementById('form_password').style.border='';
            })
            .catch(function(response) {
              if(response.status == 400) {
                document.getElementById('form_username').style.border='2px solid red';
                document.getElementById('form_password').style.border='2px solid red';
                alert("Couldn't submit your guess. Don't forget to choose a username and password below the board.");
              }
              if(response.status == 401) {
                document.getElementById('form_password').style.border='2px solid red';
                alert("Couldn't submit your guess. The password for this user is incorrect. Submit the propoer password or choose another name.");
              }
            });
          }
          else {
            alert('Illegal move: ' + guess.errorMsg);
          }
        });

        canvas.addListener('mousemove', function(coord, ev) {
          if(coord.i == -1 || coord.j == -1 || (coord.i == lastX && coord.j == lastY))
            return;

          if(lastHover) // clear previous hover if there was one
            jboard.setMark(new JGO.Coordinate(lastX, lastY), JGO.MARK.NONE);

          lastX = coord.i;
          lastY = coord.j;

          if(jboard.getType(coord) == JGO.CLEAR && jboard.getMark(coord) == JGO.MARK.NONE) {
            jboard.setMark(coord, JGO.MARK.CROSS);
            lastHover = true;
          } else
            lastHover = false;
        });

        canvas.addListener('mouseout', function(ev) {
          if(lastHover)
            jboard.setMark(new JGO.Coordinate(lastX, lastY), JGO.MARK.NONE);

          lastHover = false;
        });
      });
  }

  function addMove(coord, player) {
    var lastPlay = jboard.playMove(coord, curPlayer, ko);
    if(lastPlay.success) {
      var opponent = (curPlayer == JGO.BLACK) ? JGO.WHITE : JGO.BLACK;


      jboard.setType(coord, curPlayer); // play stone
      jboard.setType(lastPlay.captures, JGO.CLEAR); // clear opponent's stones

      if(lastMove)
        jboard.setMark(lastMove, JGO.MARK.NONE); // clear previous mark
      if(ko)
        jboard.setMark(ko, JGO.MARK.NONE); // clear previous ko mark

      jboard.setMark(coord, JGO.MARK.CIRCLE); // mark move
      lastMove = coord;

      if(lastPlay.ko)
        jboard.setMark(lastPlay.ko, JGO.MARK.SQUARE); // mark ko, too
      ko = lastPlay.ko;

      curPlayer = opponent;
      [].forEach.call(document.getElementsByClassName('playerturn'), function(e) {
        e.innerHTML = (curPlayer == JGO.BLACK) ? "Black" : "White";
      });
    }
  }

  createGuessingBoard();

  apiGetGame()
  .then(function(game) {
    //game.moves.forEach(function(move) {
      //addMove(new JGO.Coordinate(move.x, move.y))
    //});
  })
  .then(retrieveUserInfo)
  .then(wsConnect)
  .then(function() {
    apiSubscribeWebsocketMoves(function(message) {
        var move = JSON.parse(message.body);
        addMove(new JGO.Coordinate(move.x, move.y));
        retrieveUserInfo();
    });
  })
  .then(function() {
    apiSubscribeWebsocketGuesses(retrieveUserInfo);
  });
})();
