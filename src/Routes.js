import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default Routes;
