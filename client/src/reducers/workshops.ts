import { WorkshopsStoreType } from '../types/store'
import { ActionType, GET_ALL_WORKSHOPS } from '../actions/actionTypes'

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
    default:
      return state
  }
}
