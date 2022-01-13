import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { userLogin } from '../redux/actions';
import { setLocalStorage, getLocalStorage } from '../services/localStorage';
import requestToken from '../services/requestAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const { history, dispatch } = this.props;
    dispatch(userLogin(this.state));
    const returnToken = await requestToken();
    setLocalStorage('token', returnToken);
    console.log(getLocalStorage());
    history.push('/trivia');
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;
    return (
      <>
        <form>
          <label htmlFor="email">
            <input
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              value={ email }
              id="email"
              type="email"
              name="email"
            />
          </label>
          <label htmlFor="name">
            <input
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleChange }
              type="text"
              id="name"
              name="name"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ name.length < 1 || email.length < 1 }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
        <Link to="/settings" type="button" data-testid="btn-settings">Settings</Link>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.instanceOf(Object),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
