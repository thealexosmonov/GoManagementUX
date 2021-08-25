import {Constants} from "../constants/constants";
import {truckAPI} from "../api/truck.api";

export const truckActions = {
    registerTruck,
    searchTruck,
};

function registerTruck(vin, type) {
    return dispatch => {
        dispatch(request({ vin, type }));

        truckAPI.registerTruck(vin, type)
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

    function request(payload) { return { type: Constants.REGISTER_TRUCK_LOADING, payload } }
    function success(payload) { return { type: Constants.REGISTER_TRUCK_SUCCESS, payload } }
    function failure(error) { return { type: Constants.REGISTER_TRUCK_FAILED, error } }
}


function searchTruck(type, startTime, endTime) {
    return dispatch => {
        dispatch(request({ type, startTime, endTime }));

        truckAPI.searchTruck(type, startTime, endTime)
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

    function request(payload) { return { type: Constants.SEARCH_TRUCK_LOADING, payload } }
    function success(payload) { return { type: Constants.SEARCH_TRUCK_SUCCESS, payload } }
    function failure(error) { return { type: Constants.SEARCH_TRUCK_FAILED, error } }
}