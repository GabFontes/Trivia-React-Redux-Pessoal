import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSettings } from '../redux/actions';
import { getCategory } from '../services/requestAPI';

const dificulties = ['easy', 'medium', 'hard'];

const setAny = '';

const boolean = ['multiple', 'boolean'];

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      category: '',
      type: '',
      dificulty: '',
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  handleChange = ({ target: { id, value } }) => {
    console.log(value);
    this.setState({ [id]: value });
  }

  setConfigs = () => {
    const { category, type, dificulty } = this.state;
    const { dispatch, history } = this.props;
    dispatch(setSettings({ category, type, dificulty }));
    history.push('/');
  }

  getCategories = async () => {
    const categories = await getCategory();
    this.setState({ categories });
  }

  render() {
    const { categories, category, type, dificulty } = this.state;
    return (
      <>
        <p data-testid="settings-title">Settings</p>
        <label htmlFor="category">
          Categoria:
          {' '}
          <select
            id="category"
            value={ category }
            onChange={ this.handleChange }
          >
            <option value={ setAny }>Any</option>
            {categories.map(({ id, name }, index) => (
              <option
                key={ index }
                value={ id }
              >
                { name }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="type">
          Tipo:
          {' '}
          <select
            id="type"
            value={ type }
            onChange={ this.handleChange }
          >
            <option value={ setAny }>Any</option>
            {boolean.map((item, index) => (
              <option
                value={ item }
                key={ index }
                name={ item }
              >
                { item }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="dificulty">
          Dificuldade:
          {' '}
          <select
            id="dificulty"
            value={ dificulty }
            onChange={ this.handleChange }
          >
            <option value={ setAny }>Any</option>
            {dificulties.map((item, index) => (
              <option
                value={ item }
                key={ index }
              >
                { item }
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={ this.setConfigs }
        >
          Settings
        </button>
      </>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Settings);
