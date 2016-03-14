function convertToJson(response) {
    if(!response.ok) throw response;
    else return response.json();
}

function apiSubmitMove(coord, password) {
  return fetch('/api/games/moves', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        moves: [
          { x: coord.i, y: coord.j }
        ],
        password: password
      })

  })
  .then(function(response) {
    if(!response.ok) throw response;
    else return response;
  });
}

function apiSubmitMoves(coordList, password) {
  return fetch('/api/games/moves', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        moves: coordList,
        password: password
      })

  })
  .then(function(response) {
    if(!response.ok) throw response;
    else return response;
  });
}

function apiSubmitGuess(coord, username, password) {
  return fetch('/api/guesses', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        x: coord.i,
        y: coord.j,
        username: username,
        password: password
      })

  })
  .then(function(response) {
    if(!response.ok) throw response;
    else return response;
  });
}

function apiRetrieveUserInfo() {
  return fetch('/api/users', {
    method: 'GET',
  })
  .then(convertToJson);
}

function apiGetGame() {
  return fetch('/api/games', {
    method: 'GET',
    headers: {accept: 'application/json'}
  })
  .then(convertToJson);
}

var socket = new SockJS('/api/ws/endpoint');
var stompClient = Stomp.over(socket);
var stompConnected=false;

function wsConnect() {
  return new Promise(function(resolve, reject) {
    stompClient.connect({}, function(frame) {
        stompConnected = true;
        resolve();
    });
  });
}

function apiSubscribeWebsocketMoves(moveReceivedCallback) {
    stompClient.subscribe('/topic/moves', moveReceivedCallback);
}

function apiSubscribeWebsocketGuesses(guessReceivedCallback) {
    stompClient.subscribe('/topic/guesses', guessReceivedCallback);
}
