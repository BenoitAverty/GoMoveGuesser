
import React from 'react';

import { connect } from 'react-redux';

import nextChar from '../../../../utils/nextChar';
import { currentUserGuess } from '../../../../actions';

class Board extends React.Component {

  constructor(props) {
    super(props);

    this.jboard = new JGO.Board(19);
    this.jsetup = new JGO.Setup(this.jboard, JGO.BOARD.medium);
    this.jsetup.setOptions({stars: {points:9}});
    this.ko = false;
  }

  componentDidMount() {
    let hoverCoord = new JGO.Coordinate(-1,-1);
    let jsetup = this.jsetup;
    let jboard = this.jboard;
    let props = this.props;
    let ko = this.ko;

    jsetup.create('board', function(canvas) {

      canvas.addListener('click', function(coord, ev) {

        let playerTurn = (this.props.moves.length%2 == 0) ? JGO.BLACK : JGO.WHITE;

        // clear hover away - it'll be replaced or then it will be an illegal move
        // in any case so no need to worry about putting it back afterwards
        if(hoverCoord.i >= 0 && hoverCoord.j >= 0)
          jboard.setMark(hoverCoord, JGO.MARK.NONE);

        hoverCoord = new JGO.Coordinate(-1,-1);

        let guess = jboard.playMove(coord, playerTurn, this.ko);

        if(guess.success) {
          props.dispatch(currentUserGuess(coord));
        }
        else {
          alert('Illegal move: ' + guess.errorMsg);
        }
      }.bind(this));

      canvas.addListener('mousemove', function(coord, ev) {
        if(coord.i == -1 || coord.j == -1 || (coord.i == hoverCoord.i && coord.j == hoverCoord.j))
          return;

        if(hoverCoord.i >= 0 && hoverCoord.j >= 0) { // clear previous hover if there was one
            jboard.setMark(hoverCoord, JGO.MARK.NONE);
            hoverCoord = new JGO.Coordinate(-1,-1);
        }

        if(jboard.getType(coord) == JGO.CLEAR && jboard.getMark(coord) == JGO.MARK.NONE) {
          jboard.setMark(coord, JGO.MARK.CROSS);
          hoverCoord = new JGO.Coordinate(coord.i, coord.j);
        }
      });

      canvas.addListener('mouseout', function(ev) {
        if(hoverCoord.i >= 0 && hoverCoord.j >= 0)
          jboard.setMark(hoverCoord, JGO.MARK.NONE);

        hoverCoord = new JGO.Coordinate(-1,-1);
      });
    }.bind(this));

    this._addMoves(props.moves);
    this._setGuesses(props.guesses);
  }

  _addMoves(moves) {
    let jboard = this.jboard;
    let ko = this.ko;
    let playerTurn = (this.props.moves.length%2 == 0) ? JGO.BLACK : JGO.WHITE;

    if(this.lastMove) {
      jboard.setMark(this.lastMove, JGO.MARK.NONE);
    }

    let lastMove;
    moves.forEach(m => {
      let moveCoord = new JGO.Coordinate(m.i, m.j);
      let play = jboard.playMove(moveCoord, playerTurn, ko);

      if(play.success) {
        jboard.setType(moveCoord, playerTurn);
        jboard.setType(play.captures, JGO.CLEAR);

        //clear previous ko then mark current ko if any.
        if(ko) {
            jboard.setMark(ko, JGO.MARK.NONE);
        }
        if(play.ko) {
          jboard.setMark(play.ko, JGO.MARK.SQUARE);
        }
        ko = play.ko;

        playerTurn = (playerTurn == JGO.BLACK ? JGO.WHITE : JGO.BLACK);
        lastMove = moveCoord;
      }

    });

    this.lastMove = lastMove;
    this.ko = ko;
    jboard.setMark(this.lastMove, JGO.MARK.CIRCLE);
  }

  _setGuesses(guesses) {
    this.jboard.each(c => {
      if(this.jboard.getMark(c) !== JGO.MARK.CIRCLE && this.jboard.getMark(c) !== JGO.MARK.SQUARE) {
        this.jboard.setMark(c, JGO.MARK.NONE);
      }
    });
    let curMark = 'A';
    guesses.forEach(g => {
      let coord = new JGO.Coordinate(g.i, g.j);
      if(this.jboard.getMark(coord) === JGO.MARK.NONE) {
          this.jboard.setMark(coord, curMark);
      }
      curMark = nextChar(curMark);
    });
  }

  componentWillUpdate(nextProps) {
    this._setGuesses(nextProps.guesses);

    let oldMoves = new Set(this.props.moves);
    let newMoves = nextProps.moves.filter(m => !oldMoves.has(m));
    this._addMoves(nextProps.moves);
  }

  render() {
    return (
      <div id="board"></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    moves: state.game.moves,
    guesses: state.users.other
      .map((u) => u.guess)
      .concat(state.users.current.guess)
      .filter(g => {return g != null})
  };
};

export default connect(mapStateToProps)(Board);
