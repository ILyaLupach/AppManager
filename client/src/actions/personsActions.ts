import api from '../api'
import { ActionType, ADD_NEW_PERSON, UPDATE_PERSON, GET_ALL_PERSONS, LOADING_PERSONS, REMOVE_PERSON } from "./actionTypes"
import { StoreType } from '../types/store'
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

export const updatePerson =
  (person: PersonType) => (dispatch: Dispatch<ActionType>, getState: () => StoreType) => {
    const { persons: personsStore } = getState()
    const newPersonsList = [...personsStore.persons.filter(item => item._id !== person._id), person]
    dispatch({
      type: UPDATE_PERSON,
      payload: newPersonsList,
    })
  }

  export const removePerson = (id: number) => ({
    type: REMOVE_PERSON,
    payload: id
  })
