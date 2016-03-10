function apiSubmitMove(coord, password) {
  return fetch('/api/games/moves', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        x: coord.i,
        y: coord.j,
        password: password
      })

  })
  .then(function(response) {
    if(!response.ok) throw response;
    else return response;
  });
}

function apiGetGame() {
  return fetch('/api/games', {
    method: 'GET',
    headers: {accept: 'application/json'}
  })
  .then(function(response) {
    if(!response.ok) throw response;
    else return response.json();
  });
}

function apiSubscribeWebsocket() {
  var stompClient = null;

  function connect() {
      var socket = new SockJS('/moves');
      stompClient = Stomp.over(socket);
      stompClient.connect({}, function(frame) {
          console.log('<>Connected: ' + frame);
          stompClient.subscribe('/topic/moves', function(message) {
              var move = JSON.parse(message.body);
              addMove(new JGO.Coordinate(move.x, move.y));
          });
      });
  }

  function disconnect() {
      if (stompClient != null) {
          stompClient.disconnect();
      }
      console.log("Disconnected");
  }

  function sendName() {
      stompClient.send("/api/ws/hello", {}, JSON.stringify({}));
  }

  connect();
}
