import { PersonType, TasksType, WorkshopsType } from '../types/global'

// tasks types
export const GET_ALL_TASKS: string = 'GET_ALL_TASKS'
export const LOADING_TASKS: string = 'LOADING_TASKS'
export const SET_FILTER: string = 'SET_FILTER'
export const SET_QUERY: string = 'SET_QUERY'

// persons types
export const GET_ALL_PERSONS: string = 'GET_ALL_PERSONS'
export const LOADING_PERSONS: string = 'LOADING_PERSONS'
export const ADD_NEW_PERSON: string = 'ADD_NEW_PERSON'
export const EDIT_PERSON: string = 'EDIT_PERSON'

// workshops types
export const GET_ALL_WORKSHOPS: string = 'GET_ALL_WORKSHOPS'

interface getAllTasks {
  type: typeof GET_ALL_TASKS
  payload: TasksType[]
}

interface loadingTasks {
  type: typeof LOADING_TASKS
  payload: boolean
}

interface setFilter {
  type: typeof SET_FILTER
  payload: string
}

interface setQuery {
  type: typeof SET_QUERY
  payload: string
}

interface getAllPerson {
  type: typeof GET_ALL_PERSONS
  payload: PersonType[]
}

interface LoadingPerson {
  type: typeof LOADING_PERSONS
  payload: boolean
}

interface addNewPerson {
  type: typeof ADD_NEW_PERSON
  payload: PersonType
}

interface editPerson {
  type: typeof EDIT_PERSON
  payload: PersonType
}

interface getAllWorkshops {
  type: typeof GET_ALL_WORKSHOPS
  payload: WorkshopsType[]
}

export type ActionType =
  getAllTasks |
  loadingTasks |
  setFilter |
  setQuery |
  getAllPerson |
  LoadingPerson |
  addNewPerson |
  getAllWorkshops |
  editPerson
