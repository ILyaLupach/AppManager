import { FilterStoreType } from '../types/store'
import { ActionType } from '../types/actions'
import { SET_FILTER, SET_QUERY } from '../actions/actionTypes'

const initialState: FilterStoreType = {
    searchQuery: '',
    filterBy: "Все"
}

export default (state: FilterStoreType = initialState, action: ActionType<FilterStoreType>) => {
    switch (action.type) {
        case SET_QUERY:
            return {
                ...state,
                searchQuery: action.payload
            }
        case SET_FILTER:
            return {
                ...state,
                filterBy: action.payload
            }
        default:
            return state
    }
}
