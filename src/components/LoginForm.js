import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signInUser, signUpUser, logoutUser } from '../actions/AuthActions.js';

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  }

  onLoginClick = () => {
    const { email, password } = this.state;
    this.props.loginUser(email, password);
  }

  onSignupClick = () => {
    const { email, password } = this.state;
    this.props.signUpUser(email, password);
  }

  onLogoutClick = () => {
    this.props.logoutUser();
  }

  renderButton() {
    if (this.props.user.loading) {
        return <div>Loading...</div>
      }

    return (
      <div>
        <button
          style={styles.buttonStyle}
          onClick={this.onLoginClick}
        >
          Log In
        </button>
        <button
          style={styles.buttonStyle}
          onClick={this.onSignupClick}
        >
          Sign Up
        </button>
      </div>
    )
  }

  render() {
    if (this.props.user.uid) {
      return (
        <button style={styles.buttonStyle} onClick={this.onLogoutClick}>Logout</button>
      )
    }
    else {
      return (
        <div>
          E-mail:
          <input
            type="text"
            name="email"
            placeholder="Enter your e-mail"
            value={this.state.email}
            onChange={(e) => this.setState({email: e.target.value})}
            style={styles.inputStyle}
          />
          Password:
          <input
            type="password"
            name="pass"
            placeholder="Enter your password"
            value={this.state.password}
            onChange={(e) => this.setState({password: e.target.value})}
            style={styles.inputStyle}
          />
          <div>
            {this.renderButton()}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, pass) => { dispatch(signInUser(email, pass)) },
    signUpUser: (email, pass) => { dispatch(signUpUser(email, pass)) },
    logoutUser: () => { dispatch(logoutUser()) }
  }
}

const styles = {
  inputStyle: {
    width:'150px',
    margin: '5px'
  },
  buttonStyle: {
    display: 'inline-block',
    margin: '5px',
    padding: '5px',
    cursor: 'pointer'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
