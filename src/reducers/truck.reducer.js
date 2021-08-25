import {Constants} from "../constants/constants";

const DefaultState = {
    availableTrucks: [],
    pending: false,
}

// Reducer is successfully changing the state but it seems to be
// mutating it, because no calls are reaching ShouldComponentUpdate
// and no re-rendering is occurring despite successful calls
export function truckReducer(state = DefaultState, action) {

    switch (action.type) {
        case Constants.REGISTER_TRUCK_LOADING:
            return state = {
                ...state,
            };
        case Constants.REGISTER_TRUCK_SUCCESS:
            return state = {
                ...state,
            };
        case Constants.REGISTER_TRUCK_FAILED:
            return state = {
                ...state,
            };

        case Constants.SEARCH_TRUCK_LOADING:
            return state = {
                ...state,
                pending: true
            };
        case Constants.SEARCH_TRUCK_SUCCESS:
            return state = {
                ...state,
                pending: false,
                availableTrucks: action.payload.trucks
            }

        case Constants.SEARCH_TRUCK_FAILED:
            return state = {
                ...state,
                pending: false,
            };
        default:
            return state
    }
}
