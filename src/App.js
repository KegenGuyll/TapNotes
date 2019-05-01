import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { CreateCategory } from './components/Category/CreateCategory';
import Navigation from './components/Navigation';
import './index.css';

const App = props => {
  return (
    <div className='App'>
      <Router>
        <Navigation user={props.user}>
          <Switch>
            <Route path='/' exact render={() => <Home user={props.user} />} />
            <Route
              path='/createcategory'
              exact
              render={() => <CreateCategory user={props.user} />}
            />
          </Switch>
        </Navigation>
      </Router>
    </div>
  );
};

export default App;
