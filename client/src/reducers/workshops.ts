import { WorkshopsStoreType } from '../types/store'
import { ActionType, GET_ALL_WORKSHOPS, REMOVE_WORKSHOP, UPDATE_WORKSHOP } from '../actions/actionTypes'

const initialState = {
  workshops: [],
}

export default (state: WorkshopsStoreType = initialState, action: ActionType) => {
  switch (action.type) {
    case GET_ALL_WORKSHOPS:
      return {
        ...state,
        workshops: action.payload
      }
    case UPDATE_WORKSHOP:
      return {
        ...state,
        workshops: action.payload,
      }
    case REMOVE_WORKSHOP:
      return {
        ...state,
        workshops: state.workshops.filter(item => item._id !== action.payload),
      }
    default:
      return state
  }
}
