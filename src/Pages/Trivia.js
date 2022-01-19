import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Question from '../Components/Question';
import { getQuestions, requestToken } from '../services/requestAPI';
import toggleAnsweredClass from '../helpers';
// import toggleAnsweredClass from '../helpers';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      currentQuestion: 0,
      render: false,
      timer: 30,
      disabled: false,
      pauseTimer: false,
    };
  }

  componentDidMount() {
    this.requestAPI();
    this.gameTimer();
  }

  requestAPI = async () => {
    const { token, configs } = this.props;
    const getJson = await getQuestions(token, configs);
    if (getJson.response_code === 0) {
      this.setState({ questions: getJson.results, render: true });
    } else {
      const requestNewToken = await requestToken();
      const { results } = await getQuestions(requestNewToken, configs);
      this.setState({ questions: results, render: true });
    }
  }

  setNextQuestion = () => {
    const { currentQuestion, questions } = this.state;
    const { history } = this.props;
    if (currentQuestion === questions.length - 1) {
      history.push('/feedback');
    } else {
      this.setState({
        currentQuestion: currentQuestion + 1,
        timer: 30,
        pauseTimer: false,
      });
      this.gameTimer();
    }
  }

  disableTimer = (interval) => {
    this.setState({ disabled: true });
    return clearInterval(interval);
  }

  gameTimer = () => {
    const interval = setInterval(() => {
      const { timer, pauseTimer } = this.state;
      if (timer === 1) {
        this.disableTimer(interval);
        toggleAnsweredClass();
      } else if (pauseTimer) {
        this.disableTimer(interval);
      }
      this.setState({ timer: timer - 1 });
    }, +'1000');
  }

  returnPauseTimer = () => {
    this.setState({ pauseTimer: true });
  }

  setDisabled = () => {
    const { disabled } = this.state;
    this.setState({ disabled: !disabled });
  }

  render() {
    const {
      questions,
      currentQuestion,
      render,
      disabled,
      timer,
    } = this.state;
    return (
      <div>
        <Header />
        { timer }
        {render && <Question
          setDisabled={ this.setDisabled }
          stopTimer={ this.stopTimer }
          setNextQuestion={ this.setNextQuestion }
          timer={ timer }
          returnPauseTimer={ this.returnPauseTimer }
          disabled={ disabled }
          question={ questions[currentQuestion] }
        /> }
      </div>
    );
  }
}

Trivia.propTypes = {
  token: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  token: state.token,
  configs: state.config,
});

export default connect(mapStateToProps)(Trivia);
