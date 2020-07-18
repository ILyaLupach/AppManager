import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from '../../store';

import TasksPage from '../TasksPage';

import "./App.scss";
import { Button } from '@material-ui/core';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <header className='header'>
        <div className='header__navigation'>
        <Button variant="outlined" size="small">
            Small
        </Button>
        <Button variant="contained" size="small">
            Small
        </Button>
        <Button variant="outlined" size="small">
          Small
        </Button>
        </div>
      </header>
      <main className='page'>
        <Router>
          <Route path="/" exact component={TasksPage} />
        </Router>
      </main>
    </Provider>
  )
}

export default App
