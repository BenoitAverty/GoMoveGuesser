import React from 'react';

//components
import BoardPanel from './BoardPanel';
import InfoPanel from './InfoPanel';

class GuessPage extends React.Component {
  render() {
    return (
      <div className="guess-page">
        <BoardPanel />
        <InfoPanel />
      </div>
    );
  }
}

export default GuessPage;
