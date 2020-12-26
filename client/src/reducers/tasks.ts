/* eslint-disable import/no-anonymous-default-export */
import {
  LOADING_TASKS,
  GET_ALL_TASKS,
  ActionType,
  UPDATE_TASK,
  REMOVE_TASK,
  SHOW_COMPLETED_MESSAGE,
  SENDING_TASK
} from '../actions/actionTypes'
import { TasksStoreType } from '../types/store'

const initialState: TasksStoreType = {
  loading: false,
  tasks: [],
  isSendingTask: false,
  showCompletedMessage: false,
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
    case SHOW_COMPLETED_MESSAGE:
      return {
        ...state,
        showCompletedMessage: action.payload
      }
    case SENDING_TASK:
      return {
        ...state,
        isSendingTask: action.payload
      }
    default:
      return state
  }
}
