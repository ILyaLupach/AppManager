/* eslint-disable import/no-anonymous-default-export */
import { ActionType, AUTH_ERROR, LOADING_AUTH, LOGOUT, SET_USER } from '../actions/actionTypes'
import { UserType } from '../types/global'
import { UserStoreType } from '../types/store'


const defaultState: UserStoreType = {
  isGuest: true,
  user: null,
  loading: false,
  error: '',
  acces: 'read-only'
}

export default (state = defaultState, action: ActionType) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isGuest: false,
        user: action.payload,
        acces: (action.payload as UserType)?.acces || defaultState.acces
      }
    case LOGOUT:
      return {
        ...state,
        isGuest: true,
        user: null
      }
    case LOADING_AUTH:
      return {
        ...state,
        loading: action.payload
      }
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
