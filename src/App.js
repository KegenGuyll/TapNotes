import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import Navigation from './components/Navigation';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = props => {
  return (
    <div className='App'>
      <Navigation user={props.user}>
        <Home user={props.user} />
        <ToastContainer />
      </Navigation>
    </div>
  );
};

export default App;
