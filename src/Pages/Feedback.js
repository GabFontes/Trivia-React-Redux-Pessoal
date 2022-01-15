import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import Header from '../Components/Header';
import { resetUserLogin } from '../redux/actions';
import ButtonRedirectLogin from '../Components/ButtonRedirectLogin';
import { setLocalStorage, getLocalStorage } from '../services/localStorage';

class FeedBack extends Component {
  componentDidMount() {
    this.saveLocalStorage();
  }

  saveLocalStorage = () => {
    const { name, email, score } = this.props;
    const token = md5(email).toString();
    const setArray = [name, token, score];
    if (getLocalStorage('ranking')) {
      const getStorage = JSON.parse(getLocalStorage('ranking'));
      getStorage.push(setArray);
      setLocalStorage('ranking', JSON.stringify(getStorage));
    } else {
      setLocalStorage('ranking', JSON.stringify([setArray]));
    }
  }

  handleClick = () => {
    const { dispatch, history } = this.props;
    dispatch(resetUserLogin());
    history.push('/');
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertions < +'3' ? 'Could be better...' : 'Well Done!'}
        </p>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <ButtonRedirectLogin datatestid="btn-play-again" text="Play Again" />
        <Link data-testid="btn-ranking" to="/ranking">Ranking</Link>
      </div>
    );
  }
}

FeedBack.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(FeedBack);
