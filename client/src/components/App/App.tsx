import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
import { StoreType } from 'src/types/store'

export const App = () => {
  const dispatch = useDispatch()
  const { filterBy, searchQuery, limit } = useSelector(({ filter }: StoreType) => filter)

  useEffect(() => {
    dispatch(auth())
    dispatch(getAllWorkshops())
    dispatch(getAllPersons())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllTasks(limit, filterBy, searchQuery))
  }, [dispatch, filterBy, limit, searchQuery])

  return (
    <Router>
      <NavDrawer />
      <Switch>
        <Route path='/persons' component={PersonPage} />
        <Route path='/settings' component={SettingsPage} />
        <Route path='/statistics' component={StatisticsPage} />
        <Route path='/' exact component={TasksPage} />
      </Switch>
      <Auth />
    </Router>
  )
}

export default App
