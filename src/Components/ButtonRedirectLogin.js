import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetUserLogin } from '../redux/actions';

class ButtonRedirectLogin extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

    handleClick = () => {
      const { dispatch } = this.props;
      dispatch(resetUserLogin());
      this.setState({ redirect: true });
    }

    render() {
      const { redirect } = this.state;
      const { datatestid, text } = this.props;
      if (redirect) return <Redirect to="/" />;
      return (
        <button
          type="button"
          data-testid={ datatestid }
          onClick={ this.handleClick }
        >
          { text }
        </button>
      );
    }
}

ButtonRedirectLogin.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(ButtonRedirectLogin);
