import api from '../api'
import { ActionType, AUTH_ERROR, LOADING_AUTH, SET_USER } from "./actionTypes"
import { Dispatch } from 'react'
import { clearHash } from '../utils/location'

export const signUp =
  (email: string, password: string, name: string) => async (dispatch: Dispatch<ActionType>) => {
    dispatch({
      type: LOADING_AUTH,
      payload: true
    })
    const { data = {} } = await api.signUp(email, password, name)
    const { token, errorMessage, user } = data

    if (errorMessage) {
      dispatch(setAuthError(errorMessage))
      dispatch({
        type: LOADING_AUTH,
        payload: false
      })
    }
    if (token && user) {
      document.cookie = `token=${token}`
      dispatch({
        type: SET_USER,
        payload: user
      })
      dispatch({
        type: LOADING_AUTH,
        payload: false
      })
      clearHash()
    }
  }

export const login = (email: string, password: string) =>
  async (dispatch: Dispatch<ActionType>) => {
    dispatch({
      type: LOADING_AUTH,
      payload: true
    })
    const { data = {} } = await api.login(email, password)
    const { token, errorMessage, user } = data
    if (errorMessage) {
      dispatch(setAuthError(errorMessage))
      dispatch({
        type: LOADING_AUTH,
        payload: false
      })
    }
    if (token && user) {
      document.cookie = `token=${token}`
      dispatch({
        type: SET_USER,
        payload: user
      })
      dispatch({
        type: LOADING_AUTH,
        payload: false
      })
      clearHash()
    }
  }

export const auth = () => async (dispatch: Dispatch<ActionType>) => {
    dispatch({
      type: LOADING_AUTH,
      payload: true
    })
    const { data = {}, error } = await api.auth()
    const { token, user } = data
    if (error) {
      dispatch({
        type: LOADING_AUTH,
        payload: false
      })
    }
    if (token && user) {
      document.cookie = `token=${token}`
      dispatch({
        type: SET_USER,
        payload: user
      })
    }
    dispatch({
      type: LOADING_AUTH,
      payload: false
    })
  }

export const setAuthError = (error?: string) => ({
  type: AUTH_ERROR,
  payload: error || ''
})

export const logOut = () => {
  document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
  window.location.reload()
}
