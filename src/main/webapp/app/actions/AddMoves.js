
export const ADD_MOVES = 'ADD_MOVES';

const addMoves = (moves) => {
    return {
      type: ADD_MOVES,
      moves
    }
};

export default addMoves;
