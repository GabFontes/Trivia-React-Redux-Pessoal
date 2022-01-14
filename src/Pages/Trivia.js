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
    };
  }

  componentDidMount() {
    this.requestAPI();
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

  render() {
    const { questions, currentQuestion, render } = this.state;
    return (
      <div>
        <Header />
        {render && <Question question={ questions[currentQuestion] } /> }
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
