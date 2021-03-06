import { combineReducers } from "redux"
import tasks from './tasks'
import workshops from './workshops'
import filter from './filter'
import persons from './persons'
import user from './user'
import statistics from './statistics'

const rootReducer = combineReducers({
  tasks,
  workshops,
  filter,
  persons,
  user,
  statistics,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
