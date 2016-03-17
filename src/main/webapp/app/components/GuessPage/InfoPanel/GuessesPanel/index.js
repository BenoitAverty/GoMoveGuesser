import React from 'react';
import convertToJson from 'fetch-to-json';

import { connect } from 'react-redux';

class GuessesPanel extends React.Component {

  _computeGuessesList() {
    let guesses = {};
    this.props.users.other
    .concat({
      guess: this.props.users.current.guess
    })
    .filter(u => (typeof u.guess !== 'undefined' && u.guess !== null))
    .forEach(u => {
      let guessHash = u.guess.i*19 + u.guess.j;
      if(guessHash in guesses) {
        guesses[guessHash].number++;
      }
      else {
        guesses[guessHash] = {
          coord: {i: u.guess.i, j: u.guess.j},
          number: 1
        }
      }
    });

    let curMark = 'A';
    let list = [];
    for(var hash in guesses) {
      list.push(<li key={hash}>{curMark + " : " + guesses[hash].number + " people have guessed this."}</li>)
    }

    return list;
  }

  render() {

    return (
      <div className="guesses-panel">
        <h2>Guesses for next move</h2>
        <ul id="guesses">
          {this._computeGuessesList()}
        </ul>
      </div>
    );
  }
}

export default connect(state => state)(GuessesPanel);
