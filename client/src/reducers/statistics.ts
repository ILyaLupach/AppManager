/* eslint-disable import/no-anonymous-default-export */
import { ActionType, SET_STATISTICS, STATISTICS_LOADING } from '../actions/actionTypes'
import { StatisticsStoreType } from '../types/store'

const initialState: StatisticsStoreType = {
  loading: false,
  statistics: { positions: [], persons: [], date: [] },
}

export default (state: StatisticsStoreType = initialState, action: ActionType) => {
  switch (action.type) {
    case SET_STATISTICS:
      return {
        ...state,
        statistics: action.payload
      }
    case STATISTICS_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}
