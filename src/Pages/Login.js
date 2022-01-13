import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;
    return (
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
        >
          Play
        </button>
      </form>
    );
  }
}
