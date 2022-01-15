import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Avatar extends Component {
  constructor() {
    super();
    this.state = {
      hash: '',
    };
  }

  componentDidMount() {
    this.getHash();
  }

  getHash() {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({
      hash,
    });
  }

  render() {
    const { hash } = this.state;
    return (
      <img
        data-testid="header-profile-picture"
        src={ `https://www.gravatar.com/avatar/${hash}` }
        alt="emailIcon"
      />
    );
  }
}

Avatar.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Avatar);
