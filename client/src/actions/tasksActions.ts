import api from '../api'
import { ActionType, GET_ALL_TASKS, LOADING_TASKS, REMOVE_TASK, SET_FILTER, SET_QUERY, UPDATE_TASK } from "./actionTypes"
import { TasksType } from "../types/global"
import { Dispatch } from 'react'
import { StoreType } from '../types/store'

export const getAllTasks = () => async (dispatch: Dispatch<ActionType>) => {
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

export const updateTask =
  (task: TasksType) => (dispatch: Dispatch<ActionType>, getState: () => StoreType) => {
    const { tasks: tasksStore } = getState()
    const newTasksList = [...tasksStore.tasks.filter(item => item._id !== task._id), task]
    dispatch({
      type: UPDATE_TASK,
      payload: newTasksList
    })
  }

export const removeTask = (id: number) => ({
  type: REMOVE_TASK,
  payload: id
})

export const setFilter = (activeItem: string) => ({
  type: SET_FILTER,
  payload: activeItem
})

export const setSearchQuery = (value: string) => ({
  type: SET_QUERY,
  payload: value
})
