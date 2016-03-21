import React from 'react';
import convertToJson from 'fetch-to-json';

import { connect } from 'react-redux';

import nextChar from '../../../../utils/nextChar';

class GuessesPanel extends React.Component {

  _computeGuessesList() {
    let guesses = {};
    this.props.guesses.forEach(g => {
      let guessHash = g.i*19 + g.j;
      if(guessHash in guesses) {
        guesses[guessHash].number++;
      }
      else {
        guesses[guessHash] = {
          coord: {i: g.i, j: g.j},
          number: 1
        }
      }
    });

    let curMark = 'A';
    let list = [];
    for(var hash in guesses) {
      list.push(<li key={hash}>{curMark + " : " + guesses[hash].number + " people have guessed this."}</li>);
      curMark = nextChar(curMark);
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

const mapStateToProps = (state) => {
    return {
      guesses: state.users.other
        .map((u) => u.guess)
        .concat(state.users.current.guess)
        .filter(g => {return g != null})
    }
}

export default connect(mapStateToProps)(GuessesPanel);
