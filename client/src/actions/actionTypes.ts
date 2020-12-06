import { PersonType, TasksType, UserType, WorkshopsType } from '../types/global'

// tasks types
export const GET_ALL_TASKS: string = 'GET_ALL_TASKS'
export const LOADING_TASKS: string = 'LOADING_TASKS'
export const SET_FILTER: string = 'SET_FILTER'
export const SET_QUERY: string = 'SET_QUERY'
export const UPDATE_TASK: string = 'UPDATE_TASK'
export const REMOVE_TASK: string = 'REMOVE_TASK'

// persons types
export const GET_ALL_PERSONS: string = 'GET_ALL_PERSONS'
export const LOADING_PERSONS: string = 'LOADING_PERSONS'
export const ADD_NEW_PERSON: string = 'ADD_NEW_PERSON'
export const UPDATE_PERSON: string = 'UPDATE_PERSON'
export const REMOVE_PERSON: string = 'REMOVE_PERSON'

// workshops types
export const GET_ALL_WORKSHOPS: string = 'GET_ALL_WORKSHOPS'
export const UPDATE_WORKSHOP: string = 'UPDATE_WORKSHOP'
export const REMOVE_WORKSHOP: string = 'REMOVE_WORKSHOP'

// auth type
export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'
export const LOADING_AUTH = 'LOADING_AUTH'
export const AUTH_ERROR = 'AUTH_ERROR'

interface setUser {
  type: typeof SET_USER
  payload: UserType
}

interface logOut {
  type: typeof LOGOUT
  payload: string
}

interface loadingAuth {
  type: typeof LOADING_AUTH
  payload: boolean
}

interface setErrorAuth {
  type: typeof AUTH_ERROR
  payload: string
}

interface logoutAuth {
  type: typeof LOGOUT
  payload: null
}

interface getAllTasks {
  type: typeof GET_ALL_TASKS
  payload: TasksType[]
}

interface loadingTasks {
  type: typeof LOADING_TASKS
  payload: boolean
}

interface updateTask {
  type: typeof UPDATE_TASK
  payload: TasksType
}

interface removeTask {
  type: typeof REMOVE_TASK
  payload: number | undefined
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
  type: typeof UPDATE_PERSON
  payload: PersonType[]
}

interface removePerson {
  type: typeof REMOVE_PERSON
  payload: number
}

interface getAllWorkshops {
  type: typeof GET_ALL_WORKSHOPS
  payload: WorkshopsType[]
}

interface updateWorkshop {
  type: typeof UPDATE_WORKSHOP
  payload: WorkshopsType
}

interface removeWorkshop {
  type: typeof REMOVE_WORKSHOP
  payload: number
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
  editPerson |
  updateTask |
  removeTask |
  removePerson |
  updateWorkshop |
  removeWorkshop |
  setUser |
  logOut |
  loadingAuth |
  setErrorAuth |
  logoutAuth
