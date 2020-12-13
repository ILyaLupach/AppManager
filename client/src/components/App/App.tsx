import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { auth } from '../../actions/authActions'
import TasksPage from '../TasksPage'
import NavDrawer from '../NavDrawer'
import PersonPage from '../PersonsPage'
import SettingsPage from '../SettingsPage'
import StatisticsPage from '../StatisticsPage'
import Auth from '../Auth'
import { getAllTasks } from 'src/actions/tasksActions'
import { getAllWorkshops } from 'src/actions/workshopsActions'

import "./App.scss"
import { getAllPersons } from 'src/actions/personsActions'

export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
    dispatch(getAllTasks())
    dispatch(getAllWorkshops())
    dispatch(getAllPersons())
  }, [])
  return (
    <Router>
      <NavDrawer />
      <Switch>
        <Route path='/persons' component={PersonPage} />
        <Route path='/settings' component={SettingsPage} />
        <Route path='/statistics' component={StatisticsPage} />
        <Route path='/' exact component={TasksPage} />
      </Switch>
      <Auth/>
    </Router>
  )
}

export default App
