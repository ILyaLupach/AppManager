import api from '../api'
import {
    GET_ALL_TASKS,
    LOADING_TASKS,
    GET_ALL_WORKSHOPS,
    GET_ALL_PERSONS,
    SET_FILTER,
    SET_QUERY
} from "./actionTypes"

import { TasksType, WorkshopType, PersonType } from "../types/global"
import { ActionType } from '../types/actions'

export const getAllTasks = () => async (dispatch: any) => {
    const tasks: TasksType[] = await api.getAllTasks()
    dispatch({
        type: GET_ALL_TASKS,
        payload: tasks
    })
}

export const loadingTasks = (bool: boolean): ActionType<boolean> => ({
    type: LOADING_TASKS,
    payload: bool
})

export const getAllWorkshops = (workshops: Array<WorkshopType>) => ({
    type: GET_ALL_WORKSHOPS,
    payload: workshops
})

export const getAllPersons = (persons: Array<PersonType>) => ({
    type: GET_ALL_PERSONS,
    payload: persons
})

export const setFilter = (activeItem: string) => ({
    type: SET_FILTER,
    payload: activeItem
})
export const setSearchQuery = (value: string) => ({
    type: SET_QUERY,
    payload: value
})
