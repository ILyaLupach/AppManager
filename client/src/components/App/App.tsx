import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { auth } from '../../actions/authActions'
import TasksPage from '../TasksPage'
import NavDrawer from '../NavDrawer'
import PersonPage from '../PersonsPage'
import SettingsPage from '../SettingsPage'

import "./App.scss"
import Auth from '../Auth'


export const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(auth())
  }, [])
  return (
    <Router>
      <NavDrawer />
      <Switch>
        <Route path='/persons' component={PersonPage} />
        <Route path='/settings' component={SettingsPage} />
        <Route path='/' exact component={TasksPage} />
      </Switch>
      <Auth/>
    </Router>
  )
}

export default App
