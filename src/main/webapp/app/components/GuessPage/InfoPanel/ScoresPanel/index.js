import React from 'react';

import { connect } from 'react-redux';

class ScoresPanel extends React.Component {
  render() {
    return (
      <div className="scores-panel">
        <h2>Scores</h2>
        <ul id="players">

        </ul>
      </div>
    );
  }
}

export default connect(state=>state)(ScoresPanel);
