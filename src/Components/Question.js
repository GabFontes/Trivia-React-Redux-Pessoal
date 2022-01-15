import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Question.css';
import toggleAnsweredClass from '../helpers';
import { points } from '../redux/actions';

const CORRECT_ANSWER = 'correct-answer';

export class Question extends Component {
  constructor() {
    super();
    this.state = {
      alternatives: [],
      hiddenButton: true,
    };
  }

  componentDidMount() {
    this.getAlternatives();
  }

  componentDidUpdate(prevProps) {
    const { question } = this.props;
    if (prevProps.question !== question) {
      this.getAlternatives();
    }
  }

  getAlternatives = () => {
    const { question } = this.props;
    if (Object.keys(question).length > 0) {
      const answers = question.incorrect_answers
        .map((incorrect, index) => [incorrect, `wrong-answer-${index}`,
          Math.floor(Math.random() * (100 - 1))]);
      const results = [...answers, [question.correct_answer, CORRECT_ANSWER,
        Math.floor(Math.random() * (100 - 1))]];
      const alternatives = results.sort((a, b) => a[2] - b[2]);
      this.setState({ alternatives });
    }
  }

  difficulty = () => {
    const { question: { difficulty } } = this.props;
    if (difficulty === 'medium') {
      return 2;
    }
    if (difficulty === 'hard') {
      return +'3';
    }
    return 1;
  }

  someDifficulty = () => {
    const { timer, dispatch } = this.props;
    const returnDifficulty = this.difficulty();
    dispatch(points({
      score: +'10' + (returnDifficulty * timer),
      assertions: +'1',
    }));
  }

  handleClick = ({ target: { name } }) => {
    const { returnPauseTimer } = this.props;
    if (name === CORRECT_ANSWER) {
      this.someDifficulty();
    }
    returnPauseTimer();
    toggleAnsweredClass();
    this.setState({ hiddenButton: false });
  }

  onClickFunction = () => {
    const { setNextQuestion, stopTimer, setDisabled } = this.props;
    stopTimer();
    setDisabled();
    setNextQuestion();
    toggleAnsweredClass();
    this.setState({ hiddenButton: true });
  }

  render() {
    const { question, disabled } = this.props;
    const { alternatives, hiddenButton } = this.state;
    return (
      <div>
        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{ question.question }</p>
        <div data-testid="answer-options" className="questions">
          { alternatives.map(([text, testid], index) => (
            <button
              className={ testid === CORRECT_ANSWER ? 'correct' : 'incorrect' }
              key={ index }
              id={ testid }
              name={ testid }
              disabled={ disabled }
              type="button"
              data-testid={ testid }
              onClick={ this.handleClick }
            >
              {text}
            </button>
          ))}
          <button
            hidden={ hiddenButton }
            data-testid="btn-next"
            type="button"
            onClick={ this.onClickFunction }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.string,
}.isRequired;

export default connect()(Question);
