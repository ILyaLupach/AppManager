import api from '../api'
import {
    GET_ALL_TASKS,
    LOADING_TASKS,
    GET_ALL_WORKSHOPS,
    GET_ALL_PERSONS,
    SET_FILTER,
    SET_QUERY,
    LOADING_PERSONS
} from "./actionTypes"

import { TasksType, WorkshopsType, PersonType } from "../types/global"
import { ActionType } from '../types/actions'
import { Dispatch } from 'react'

export const getAllTasks =
    () => async (dispatch: Dispatch<ActionType<boolean | TasksType[]>>) => {
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

export const getAllWorkshops =
    () => async (dispatch: Dispatch<ActionType<WorkshopsType[]>>) => {
        const workshops: WorkshopsType[] = await api.getAllWorkshops()
        dispatch({
            type: GET_ALL_WORKSHOPS,
            payload: workshops
        })
    }

export const getAllPersons =
    () => async (dispatch: Dispatch<ActionType<PersonType[] | boolean>>) => {
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

export const setFilter = (activeItem: string) => ({
    type: SET_FILTER,
    payload: activeItem
})
export const setSearchQuery = (value: string) => ({
    type: SET_QUERY,
    payload: value
})
