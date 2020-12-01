import api from '../api'
import { ActionType, GET_ALL_WORKSHOPS, REMOVE_PERSON, REMOVE_WORKSHOP, UPDATE_PERSON, UPDATE_WORKSHOP } from "./actionTypes"
import { WorkshopsType } from "../types/global"
import { Dispatch } from 'react'
import { StoreType } from '../types/store'

export const getAllWorkshops =
  () => async (dispatch: Dispatch<ActionType>) => {
    const workshops: WorkshopsType[] = await api.getAllWorkshops()
    dispatch({
      type: GET_ALL_WORKSHOPS,
      payload: workshops
    })
  }

export const updateWorkshop =
  (workshop: WorkshopsType) => (dispatch: Dispatch<ActionType>, getState: () => StoreType) => {
    const { workshops: workshopsList } = getState()
    const newWorkshopsList =
      [...workshopsList.workshops.filter(item => item._id !== workshop._id), workshop]
    console.log(newWorkshopsList)
    dispatch({
      type: UPDATE_WORKSHOP,
      payload: newWorkshopsList,
    })
  }

export const removeWorkshop = (id: number) => ({
  type: REMOVE_WORKSHOP,
  payload: id
})
