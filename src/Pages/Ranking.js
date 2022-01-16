import React, { Component } from 'react';
import ButtonRedirectLogin from '../Components/ButtonRedirectLogin';
import { getLocalStorage } from '../services/localStorage';

class Ranking extends Component {
  constructor() {
    super();
    const getStorage = JSON.parse(getLocalStorage('ranking'));
    this.state = {
      ranking: getStorage || [],
    };
  }

  render() {
    const { ranking } = this.state;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking List</h1>
        {ranking.sort((a, b) => b[2] - a[2])
          .map(([nome, token, score], index) => (
            <div key={ index }>
              <p data-testid={ `player-name-${index}` }>{ nome }</p>
              <img src={ `https://www.gravatar.com/avatar/${token}` } alt="avatar" />
              <p data-testid={ `player-score-${index}` }>{ score }</p>
            </div>
          ))}
        <ButtonRedirectLogin
          datatestid="btn-go-home"
          text="GoHome"
        />
      </>
    );
  }
}

export default Ranking;
