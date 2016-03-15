import React from 'react';

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

export default InfoPanel;
