import React from 'react';

import {connect} from 'react-redux';
import { currentUserChange } from '../../../../actions';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    let username = document.getElementById('form_username').value;
    let password = document.getElementById('form_password').value;

    this.props.dispatch(currentUserChange(username, password));
  }

  render() {
    return (
      <form>
        <input id="form_username" type="text" placeholder="Pseudonym" value={this.props.username} onChange={this.onChange} />
        <input id="form_password" type="password" value={this.props.password} onChange={this.onChange} placeholder="password" />
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.users.current.username,
    password: state.users.current.password
  }
}

export default connect(mapStateToProps)(LoginForm);
