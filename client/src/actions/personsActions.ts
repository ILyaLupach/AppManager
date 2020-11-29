import api from '../api'
import { ActionType, ADD_NEW_PERSON, EDIT_PERSON, GET_ALL_PERSONS, LOADING_PERSONS } from "./actionTypes"

import { PersonType } from "../types/global"
import { Dispatch } from 'react'

export const getAllPersons =
  () => async (dispatch: Dispatch<ActionType>) => {
    dispatch({
      type: LOADING_PERSONS,
      payload: true
    })
    const persons: PersonType[] = await api.getAllPersons()
    dispatch({
      type: GET_ALL_PERSONS,
      payload: persons
    })
    dispatch({
      type: LOADING_PERSONS,
      payload: false
    })
  }

export const createNewPerson = (newPerson: PersonType) =>
  (dispatch: Dispatch<ActionType>) => {
    dispatch({
      type: ADD_NEW_PERSON,
      payload: newPerson,
    })
  }

export const updatePerson = () =>
  async (dispatch: Dispatch<ActionType>) => {
    const persons: PersonType[] = await api.getAllPersons()
    dispatch({
      type: EDIT_PERSON,
      payload: persons,
    })
  }
