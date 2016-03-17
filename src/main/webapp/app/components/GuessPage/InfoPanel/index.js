import React from 'react';

import { connect } from 'react-redux';

import GuessesPanel from './GuessesPanel';
import ScoresPanel from './ScoresPanel';

class InfoPanel extends React.Component {
  render() {
    return (
      <div id="users-container">
        <GuessesPanel />
        <ScoresPanel />
      </div>
    );
  }
}

export default connect(state=>state)(InfoPanel);
