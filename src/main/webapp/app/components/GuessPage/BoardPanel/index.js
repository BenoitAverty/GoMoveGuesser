import React from 'react';

import { connect } from 'react-redux';

//components
import Board from './Board';

class BoardPanel extends React.Component {

  render() {
    let playerTurn = (this.props.game.playerTurn == 'BLACK') ? 'black' : 'white';

    return (
      <div id="board-container">
        <h1>It's {playerTurn}'s turn. Can you guess the next move ?</h1>
        <ul>
          <li>Click on the board where you think {playerTurn} will play.</li>
          <li>You can change your guess at any time before the move is actually played. Don't cheat...</li>
          <li>The less people to agree with you, the more points you win if you're right!</li>
        </ul>
        <Board moves='{this.props.game.moves}' />
        <form>
          <input id="form_username" type="text" placeholder="Pseudonym" /><input id="form_password" type="password" placeholder="password" />
        </form>
      </div>
    );
  }
}

export default connect(state => state)(BoardPanel);
