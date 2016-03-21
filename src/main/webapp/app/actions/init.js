import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import convertToJson from 'fetch-to-json';

import addMoves from './AddMoves';

export const INIT = 'INIT';

const init = () => {
  return (dispatch) => {
    // fetch moves
    fetch('/api/games')
    .then(convertToJson)
    .then((game) => {
      dispatch(addMoves(game.moves));
    });

    // subscribe to moves websocket

    // subscribe to user data websocket
  }
};

export default init;
