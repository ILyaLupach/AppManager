import { PersonsStoreType } from '../types/store'
import { ActionType, ADD_NEW_PERSON, UPDATE_PERSON, GET_ALL_PERSONS, LOADING_PERSONS, REMOVE_PERSON } from '../actions/actionTypes'

const initialState = {
  persons: [],
  loading: true,
}

export default (state: PersonsStoreType = initialState, action: ActionType) => {
  switch (action.type) {
    case GET_ALL_PERSONS:
      return {
        ...state,
        persons: action.payload,
      }
    case LOADING_PERSONS:
      return {
        ...state,
        loading: action.payload,
      }
    case ADD_NEW_PERSON:
      return {
        ...state,
        persons: [...state.persons, action.payload],
      }
    case UPDATE_PERSON:
      return {
        ...state,
        persons: action.payload,
      }
    case REMOVE_PERSON:
      return {
        ...state,
        persons: state.persons.filter(item => item._id !== action.payload),
      }
    default:
      return state
  }
}
