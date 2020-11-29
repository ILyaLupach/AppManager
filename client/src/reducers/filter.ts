import { FilterStoreType } from '../types/store'
import { ActionType, SET_FILTER, SET_QUERY } from '../actions/actionTypes'

const initialState: FilterStoreType = {
  searchQuery: '',
  filterBy: "Все"
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
    default:
      return state
  }
}
