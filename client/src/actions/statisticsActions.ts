import api from '../api'
import { Dispatch } from 'react'
import { ActionType, SET_STATISTICS, STATISTICS_LOADING } from './actionTypes'

export const getStatistics =
  (firstDate: Date, lastDate: Date) => async (dispatch: Dispatch<ActionType>) => {
    dispatch({
      type: STATISTICS_LOADING,
      payload: true
    })
    const statistics: Object = await api.getStatistics(firstDate, lastDate)
    dispatch({
      type: SET_STATISTICS,
      payload: statistics
    })
    dispatch({
      type: STATISTICS_LOADING,
      payload: false
    })
  }
