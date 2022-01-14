import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Question.css';
import toggleAnsweredClass from '../helpers';

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

  getAlternatives = () => {
    const { question } = this.props;
    if (Object.keys(question).length > 0) {
      const answers = question.incorrect_answers
        .map((incorrect, index) => [incorrect, `wrong-answer-${index}`,
          Math.floor(Math.random() * (100 - 1)) + 1]);
      const results = [...answers, [question.correct_answer, CORRECT_ANSWER,
        Math.floor(Math.random() * (100 - 1)) + 1]];
      const alternatives = results.sort((a, b) => a[2] - b[2]);
      this.setState({ alternatives });
    }
  }

  handleChange = () => {
    toggleAnsweredClass();
    this.setState({ hiddenButton: false });
  }

  render() {
    const { question } = this.props;
    const { alternatives, hiddenButton } = this.state;
    return (
      <div>
        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{ question.question }</p>
        <div data-testid="answer-options">
          { alternatives.map(([text, testid], index) => (
            <button
              className="questions"
              key={ index }
              id={ testid }
              name={ testid }
              type="button"
              data-testid={ testid }
              onClick={ this.handleChange }
            >
              {text}
            </button>
          ))}
          <button
            hidden={ hiddenButton }
            data-testid="btn-next"
            type="button"
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

export default Question;
