const initialState = {
  moves: [],
  playerTurn: 'BLACK'
}

const game = (state = initialState, event) => {
  switch (event.type) {
    case 'ADD_MOVE':
      return Object.assign({}, state, {
        moves: [...state.moves, {i: event.coord.i, j: event.coord.j}],
        playerTurn: state.playerTurn == 'BLACK' ? 'WHITE' : 'BLACK'
      });
    default:
      return state;
  }
}

export default game;
