import { combineReducers } from "redux"
import tasks from './tasks'
import workshops from './workshops'
import filter from './filter'
import persons from './persons'

const rootReducer = combineReducers({
  tasks,
  workshops,
  filter,
  persons
})

export type RootState = ReturnType<typeof rootReducer>

export default combineReducers({ tasks, workshops, filter, persons })
