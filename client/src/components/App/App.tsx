import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../store'
import TasksPage from '../TasksPage'
import NavDrawer from '../NavDrawer'
import PersonPage from '../PersonsPage'
import SettingsPage from '../SettingsPage'

import "./App.scss"

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavDrawer />
        <Switch>
          <Route path='/persons' component={PersonPage} />
          <Route path='/settings' component={SettingsPage} />
          <Route path='/' exact component={TasksPage} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
