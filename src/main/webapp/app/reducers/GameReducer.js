import { ADD_MOVES } from '../actions';

const initialState = {
  moves: [],
  playerTurn: 'BLACK'
}

const game = (state = initialState, event) => {
  switch (event.type) {
    case ADD_MOVES:
      console.log("addMoves action detected");
      return Object.assign({}, state, {
        moves: [...state.moves, ...event.moves],
        playerTurn: state.playerTurn == 'BLACK' ? 'WHITE' : 'BLACK'
      });
    default:
      return state;
  }
}

export default game;
