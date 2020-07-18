import { combineReducers } from "redux"
import tasks from './tasks'
import workshops from './workshops'
import filter from './filter'
import persons from './persons'

export default combineReducers({ tasks, workshops, filter, persons })
