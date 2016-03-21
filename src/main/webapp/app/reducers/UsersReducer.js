import { combineReducers } from 'redux';

import { CURRENT_USER_GUESS, CURRENT_USER_CHANGE } from '../actions';

const initialState = {
  current: {username: '', password: '', guess: null, score: 0},
  other: []
}

const current = (state = initialState.current, event) => {
  switch (event.type) {
    case CURRENT_USER_GUESS:
      return Object.assign({}, state, {guess: event.coord});
    case CURRENT_USER_CHANGE:
      return Object.assign({}, state, {username: event.username, password: event.password})
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
