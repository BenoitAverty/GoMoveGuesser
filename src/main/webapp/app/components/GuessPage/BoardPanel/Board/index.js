
import React from 'react';

import { connect } from 'react-redux';

class Board extends React.Component {

  constructor(props) {
    super(props);

    this.jboard = new JGO.Board(19);
    this.jsetup = new JGO.Setup(this.jboard, JGO.BOARD.medium);
    this.jsetup.setOptions({stars: {points:9}});
    this.ko = null;
  }

  componentDidMount() {
    let hoverCoord = new JGO.Coordinate(-1,-1);
    let jsetup = this.jsetup;
    let jboard = this.jboard;
    let props = this.props;

    jsetup.create('board', function(canvas) {

      canvas.addListener('click', function(coord, ev) {

        // clear hover away - it'll be replaced or then it will be an illegal move
        // in any case so no need to worry about putting it back afterwards
        if(hoverCoord.i >= 0 && hoverCoord.j >= 0)
          jboard.setMark(hoverCoord, JGO.MARK.NONE);

        hoverCoord = new JGO.Coordinate(-1,-1);

        let guess = jboard.playMove(coord, props.game.playerTurn, this.ko);

        if(guess.success) {
          props.dispatch({
            type: 'CURRENT_USER_GUESS',
            coord: coord
          })
        }
        else {
          alert('Illegal move: ' + guess.errorMsg);
        }
      });

      canvas.addListener('mousemove', function(coord, ev) {
        if(coord.i == -1 || coord.j == -1 || (coord.i == hoverCoord.i && coord.j == hoverCoord.j))
          return;

        if(hoverCoord.i >= 0 && hoverCoord.j >= 0) // clear previous hover if there was one
          jboard.setMark(hoverCoord, JGO.MARK.NONE);

        hoverCoord = new JGO.Coordinate(coord.i, coord.j);

        if(jboard.getType(coord) == JGO.CLEAR && jboard.getMark(coord) == JGO.MARK.NONE) {
          jboard.setMark(coord, JGO.MARK.CROSS);
        }
      }.bind(this));

      canvas.addListener('mouseout', function(ev) {
        if(hoverCoord.i >= 0 && hoverCoord.j >= 0)
          jboard.setMark(hoverCoord, JGO.MARK.NONE);

        hoverCoord = new JGO.Coordinate(-1,-1);
      });
    });


  }

  render() {
    return (
      <div id="board"></div>
    );
  }
}

export default connect(state=>state)(Board);
