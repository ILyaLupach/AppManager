import api from '../api'
import { ActionType, GET_ALL_WORKSHOPS } from "./actionTypes"

import { WorkshopsType } from "../types/global"
import { Dispatch } from 'react'

export const getAllWorkshops =
  () => async (dispatch: Dispatch<ActionType>) => {
    const workshops: WorkshopsType[] = await api.getAllWorkshops()
    dispatch({
      type: GET_ALL_WORKSHOPS,
      payload: workshops
    })
  }
