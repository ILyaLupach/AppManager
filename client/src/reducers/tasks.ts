import { LOADING_TASKS, GET_ALL_TASKS, ActionType } from '../actions/actionTypes'
import { TasksStoreType } from '../types/store'

const initialState: TasksStoreType = {
  loading: true,
  tasks: []
}

export default (state: TasksStoreType = initialState, action: ActionType) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return {
        ...state,
        tasks: action.payload
      }
    case LOADING_TASKS:
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}
