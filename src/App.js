import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Route path='/' exact component={Login} />
      </Router>
    </div>
  );
};

export default App;
