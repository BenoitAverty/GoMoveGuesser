function apiSubmitMove(coord, password) {
  return $.post('/api/games/moves', JSON.stringify({
    x: coord.i,
    y: coord.j,
    password: password
  }));
}
