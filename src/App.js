import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';

const App = props => {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact render={() => <Home user={props.user} />} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
