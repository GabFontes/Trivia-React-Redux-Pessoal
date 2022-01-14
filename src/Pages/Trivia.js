import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Question from '../Components/Question';
import { getQuestions, requestToken } from '../services/requestAPI';

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
    const { token } = this.props;
    const questions = await getQuestions(token);
    if (questions.response_code === 0) {
      this.setState({ questions, render: true });
    } else {
      const requestNewToken = await requestToken();
      const newReturnApi = await getQuestions(requestNewToken);
      this.setState({ questions: newReturnApi, render: true });
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

  stopTimer = (interval) => clearInterval(interval);

  gameTimer = () => {
    const interval = setInterval(() => {
      const { timer, pauseTimer } = this.state;
      if (timer === 1 || pauseTimer) {
        this.setState({ disabled: true });
        this.stopTimer(interval);
      }

      this.setState({ timer: timer - 1 });
    }, +'1000');
  }

  returnPauseTimer = () => {
    this.setState({ pauseTimer: true });
  }

  setDisabled = () => {
    this.setState({ disabled: false });
  }

  timerTest = () => true;

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
});

export default connect(mapStateToProps)(Trivia);
