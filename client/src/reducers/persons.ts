import { ActionType } from '../types/actions'
import { PersonsStoreType } from '../types/store'
import { GET_ALL_PERSONS, LOADING_PERSONS } from '../actions/actionTypes'

const initialState = {
    persons: [],
    loading: true,
}

export default (state: PersonsStoreType = initialState, action: ActionType<PersonsStoreType>) => {
    switch (action.type) {
        case GET_ALL_PERSONS:
            return {
                ...state,
                persons: action.payload
            }
        case LOADING_PERSONS:
            return {
                ...state,
                loading: action.payload,
            }
        default:
            return state
    }
}
