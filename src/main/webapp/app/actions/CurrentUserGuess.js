
export const CURRENT_USER_GUESS = 'CURRENT_USER_GUESS';

const currentUserGuess = (coord) => {
  return (dispatch, getState) => {
    const { users: { current: currentUser } } = getState();

    // Api Call
    fetch('/api/guesses', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          x: coord.i,
          y: coord.j,
          username: currentUser.username,
          password: currentUser.password
        })

    })
    .then(function(response) {
      if(response.ok) {
        dispatch({
          type: CURRENT_USER_GUESS,
          coord
        });
      }
    });
  }
};

export default currentUserGuess;
