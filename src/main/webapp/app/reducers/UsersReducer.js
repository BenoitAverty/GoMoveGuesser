import { combineReducers } from 'redux';

const initialState = {
  current: {name: '', password: '', guess: null, score: 0},
  other: []
}

const current = (state = initialState.current, event) => {
  switch (event.type) {
    case 'CURRENT_USER_GUESS':
      return Object.assign({}, state, {guess: event.coord});
    default:
      return state;
  }
}

const other = (state = initialState.other, event) => {
  switch (event.type) {
    default:
      return state;
  }
}

const users = combineReducers({
  other, current
});

export default users;
