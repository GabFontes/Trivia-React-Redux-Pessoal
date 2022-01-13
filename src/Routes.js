import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Settings from './Pages/Settings';
import Trivia from './Pages/Trivia';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/trivia" component={ Trivia } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    );
  }
}

export default Routes;
