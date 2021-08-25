import {Constants} from "../constants/constants";
import {reservationsAPI} from "../api/reservations.api";

export const reservationActions = {
    listReservations,
    bookReservation
}

function listReservations(email) {
    return dispatch => {
        dispatch(request({ email }));

        reservationsAPI.listReservations(email)
            .then(
                payload => {
                    if (payload.status === 200) {
                        dispatch(success(payload));
                    } else {
                        dispatch(failure(payload));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(payload) { return { type: Constants.LIST_RESERVATIONS_LOADING, payload } }
    function success(payload) { return { type: Constants.LIST_RESERVATIONS_SUCCESS, payload } }
    function failure(error) { return { type: Constants.LIST_RESERVATIONS_FAILED, error } }
}

function bookReservation(vin, startDate, endDate, email, type) {
    return dispatch => {
        dispatch(request({ vin, startDate, endDate, email, type }));

        reservationsAPI.bookReservation(vin, startDate, endDate, email, type)
            .then(
                payload => {
                    if (payload.status === 200) {
                        dispatch(success(payload));
                    } else {
                        dispatch(failure(payload));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(payload) { return { type: Constants.BOOK_RESERVATION_LOADING, payload } }
    function success(payload) { return { type: Constants.BOOK_RESERVATION_SUCCESS, payload } }
    function failure(error) { return { type: Constants.BOOK_RESERVATION_FAILED, error } }
}