import {
  LOADING_TASKS,
  GET_ALL_TASKS,
  ActionType,
  UPDATE_TASK,
  REMOVE_TASK
} from '../actions/actionTypes'
import { TasksStoreType } from '../types/store'

const initialState: TasksStoreType = {
  loading: true,
  tasks: [],
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
    case UPDATE_TASK: {
      return {
        ...state,
        tasks: action.payload
      }
    }
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(item => item._id !== action.payload)
      }
    default:
      return state
  }
}
