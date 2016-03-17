import React from 'react';

import { connect } from 'react-redux';

//components
import BoardPanel from './BoardPanel';
import InfoPanel from './InfoPanel';

class GuessPage extends React.Component {

  constructor() {
    super();
    this.state = ({users: [], game: {}});
  }

  render() {

    return (
      <div className="guess-page">
        <BoardPanel />
        <InfoPanel />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(GuessPage);
