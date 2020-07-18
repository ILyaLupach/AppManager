import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from '../../store';

import TasksPage from '../TasksPage';

import "./App.scss";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={TasksPage} />
      </Router>
      <div className="backgroundPage" />
    </Provider>
  )
}

export default App
