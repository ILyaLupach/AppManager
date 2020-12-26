/* eslint-disable import/no-anonymous-default-export */
import { FilterStoreType } from '../types/store'
import { ActionType, SET_FILTER, SET_LIMIT, SET_QUERY } from '../actions/actionTypes'

const initialState: FilterStoreType = {
  searchQuery: '',
  filterBy: "Все",
  limit: 50,
}

export default (state: FilterStoreType = initialState, action: ActionType) => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      }
    case SET_FILTER:
      return {
        ...state,
        filterBy: action.payload
      }
      case SET_LIMIT:
        return {
          ...state,
          limit: state.limit + (action.payload as number)
        }
    default:
      return state
  }
}
