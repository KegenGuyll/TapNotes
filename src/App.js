import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import Navigation from './components/Navigation';

const App = props => {
  return (
    <div className='App'>
      <Router>
        <Navigation user={props.user}>
          <Switch>
            <Route path='/' exact render={() => <Home user={props.user} />} />
          </Switch>
        </Navigation>
      </Router>
    </div>
  );
};

export default App;
