import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

class Header extends Component {
  render() {
    const { name, score } = this.props;
    return (
      <div>
        <Avatar />
        <p
          data-testid="header-player-name"
        >
          {name}
        </p>
        <p
          data-testid="header-score"
        >
          {score}
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
