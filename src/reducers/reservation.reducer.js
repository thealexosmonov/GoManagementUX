import {Constants} from "../constants/constants";


const DefaultState = {
    reservations: [],
    searchingForReservations: false,
}

export function reservationReducer(state = DefaultState, action) {

    switch (action.type) {
        case Constants.LIST_RESERVATIONS_LOADING:
            return {
                ...state,
                searchingForReservations: true,
                errorMsg: ""
            };
        case Constants.LIST_RESERVATIONS_SUCCESS:
            return {
                ...state,
                reservations: action.payload.reservations,
                searchingForReservations: false,
                errorMsg: ""
            };
        case Constants.LIST_RESERVATIONS_FAILED:
            return {
                ...state,
                searchingForReservations: false,
                errorMsg: ""
            };
        case Constants.BOOK_RESERVATION_LOADING:
            return {
                ...state,
                errorMsg: ""
            };
        case Constants.BOOK_RESERVATION_FAILED:
            return {
                ...state,
                errorMsg: ""
            };
        case Constants.BOOK_RESERVATION_SUCCESS:
            return {
                ...state,
                errorMsg: ""
            };

        default:
            return state
    }
}