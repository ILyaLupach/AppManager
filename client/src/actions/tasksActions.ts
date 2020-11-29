import api from '../api'
import { ActionType, GET_ALL_TASKS, LOADING_TASKS, SET_FILTER, SET_QUERY } from "./actionTypes"
import { TasksType } from "../types/global"
import { Dispatch } from 'react'

export const getAllTasks =
  () => async (dispatch: Dispatch<ActionType>) => {
    dispatch({
      type: LOADING_TASKS,
      payload: true
    })
    const tasks: TasksType[] = await api.getAllTasks()
    dispatch({
      type: GET_ALL_TASKS,
      payload: tasks
    })
    dispatch({
      type: LOADING_TASKS,
      payload: false
    })
  }

export const setFilter = (activeItem: string) => ({
  type: SET_FILTER,
  payload: activeItem
})
export const setSearchQuery = (value: string) => ({
  type: SET_QUERY,
  payload: value
})
