
export const CURRENT_USER_CHANGE = 'CURRENT_USER_CHANGE';

const currentUserChange = (username, password) => {
    return {
      type: CURRENT_USER_CHANGE,
      username,
      password
    }
};

export default currentUserChange;
