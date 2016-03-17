import { combineReducers } from 'redux';

import game from './GameReducer';
import users from './UsersReducer';

const appReducer = combineReducers({
  game, users
});

export default appReducer;
