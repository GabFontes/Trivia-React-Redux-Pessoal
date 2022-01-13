import React, { Component } from 'react'
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

export class Header extends Component {
  constructor() {
    super();

    this.state = {
      hash: '',
    }
  }

  componentDidMount() {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({
      hash,
    })
  }

  render() {
    const { name } = this.props;
    const { hash } = this.state;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={`https://www.gravatar.com/avatar/${hash}`}
          alt='emailIcon'
        />
        <p
          data-testid="header-player-name"
        >
          {name}
        </p>
        <p
          data-testid="header-score"
        >
          PONTUAÇÃO: 0
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  email: state.user.gravatarEmail,
  name: state.user.name,
})

export default connect(mapStateToProps)(Header)