import React from 'react';

//components
//import Board from './Board';

class BoardPanel extends React.Component {
  render() {
    return (
      <div id="board-container">
        <h1>It's <span className="playerturn">black</span>'s turn. Can you guess the next move ?</h1>
        <ul>
          <li>Click on the board where you think <span className="playerturn">black</span> will play.</li>
          <li>You can change your guess at any time before the move is actually played. Don't cheat...</li>
          <li>The less people to agree with you, the more points you win if you're right!</li>
        </ul>
        <div id="board"></div>
        <form>
          <input id="form_username" type="text" placeholder="Pseudonym" /><input id="form_password" type="password" placeholder="password" />
        </form>
      </div>
    );
  }
}

export default BoardPanel;
