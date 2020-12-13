import api from '../api'
import { ActionType, GET_ALL_TASKS, LOADING_TASKS, REMOVE_TASK, SENDING_TASK, SET_FILTER, SET_QUERY, SHOW_COMPLETED_MESSAGE, UPDATE_TASK, UPDATE_WORKSHOP } from "./actionTypes"
import { TaskFile, TasksType } from "../types/global"
import { Dispatch } from 'react'
import { StoreType } from '../types/store'

export const getAllTasks = () => async (dispatch: Dispatch<ActionType>) => {
  dispatch({ type: LOADING_TASKS, payload: true })
  const tasks: TasksType[] = await api.getAllTasks()
  dispatch({ type: GET_ALL_TASKS, payload: tasks })
  dispatch({ type: LOADING_TASKS, payload: false })
}

export const setFilter = (activeItem: string) => ({ type: SET_FILTER, payload: activeItem })

export const setSearchQuery = (value: string) => ({ type: SET_QUERY, payload: value })

export const createNewTask =
  (task: TasksType) => async (dispatch: Dispatch<ActionType>, getState: () => StoreType) => {
    dispatch({ type: SENDING_TASK, payload: true })
    const { workshops: { workshops }, tasks } = getState()
    const { position, object, files } = task
    if (workshops?.filter(item => item.name === position)[0]?.object?.filter(item => item === object)?.length === 0) {
      const obj = workshops.filter(item => item.name === position)[0].object
      const newObj = [...obj, object];
      const { body } = await api.updateData(
        'workshops',
        workshops.filter(item => item.name === position)[0]._id, { object: newObj }
      )
      if (body) {
        const newWorkshopsList =
          [...workshops.filter(item => item._id !== body._id), body]
        dispatch({ type: UPDATE_WORKSHOP, payload: newWorkshopsList })
      }
    }
    const filesList: any = !files?.length ? [] : (files as File[])?.map(file => ({
      name: file.name,
      type: file.name.split('.').pop(),
      size: file.size,
    }))
    const { task: newTask } = await api.createNewTasks({ ...task, files: filesList })
    if (files && newTask) {
      for (const file of files) {
        await api.uploadFile(file, newTask._id)
      }
    }
    if (newTask) {
      const newTasksList = [...tasks.tasks.filter(item => item._id !== newTask._id), newTask]
      dispatch({ type: UPDATE_TASK, payload: newTasksList })
      dispatch({ type: SENDING_TASK, payload: false })
      dispatch({ type: SHOW_COMPLETED_MESSAGE, payload: true })
      setTimeout(() => dispatch({ type: SHOW_COMPLETED_MESSAGE, payload: false }), 2000)
    }
  }

export const updateTask = (task: TasksType, prevFilesList: TaskFile[] | File[] = []) =>
  async (dispatch: Dispatch<ActionType>, getState: () => StoreType) => {
    dispatch({ type: SENDING_TASK, payload: true })
    const { tasks } = getState()
    const filesList: any = !task.files?.length ? [] : (task.files as File[])?.map(file => ({
      name: file.name,
      type: file.name.split('.').pop(),
      size: file.size,
    }))
    const { body } =
      await api.updateData('tasks', task._id, { ...task, files: [...prevFilesList, ...filesList] })
      if (body && task.files) {
        for (const file of task.files) {
          await api.uploadFile(file, body._id)
        }
      }
    if (body) {
      const newTasksList = [...tasks.tasks.filter(item => item._id !== body._id), body]
      dispatch({ type: UPDATE_TASK, payload: newTasksList })
      dispatch({ type: SENDING_TASK, payload: false })
      dispatch({ type: SHOW_COMPLETED_MESSAGE, payload: true })
      setTimeout(() => dispatch({ type: SHOW_COMPLETED_MESSAGE, payload: false }), 2000)
    }
  }

export const removeTask = (id: number) => async (dispatch: Dispatch<ActionType>) => {
  const success = await api.deleteItem(id, 'tasks')
  success && dispatch({ type: REMOVE_TASK, payload: id })
}
