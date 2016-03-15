import React from 'react';
import convertToJson from 'fetch-to-json';

class GuessesPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      guesses: []
    }
    this.getGuesses();
  }

  getGuesses() {
    let guesses = [];
    return fetch('/api/users', {
      method: 'GET',
      headers: {accept: 'application/json'}
    })
    .then(convertToJson)
    .then(function(body) {
      body.forEach(function(user) {
        if(user.lastGuess != null) {
          var hash = user.lastGuess.x * 19 + user.lastGuess.y;

          if(hash in guesses) {
            (guesses[hash].number)++
          }
          else {
            guesses[hash] = {
              number: 1,
              coord: new JGO.Coordinate(user.lastGuess.x, user.lastGuess.y)
            }
          }
        }
      });
    });
  }

  render() {
    return (
      <div className="guesses-panel">
        <h2>Guesses for next move</h2>
        <ul id="guesses">
          {this.state.guesses}
        </ul>
      </div>
    );
  }
}

export default GuessesPanel;
