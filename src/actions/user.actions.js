import {Constants} from "../constants/constants";
import {userAPI} from "../api/user.api";
import {history} from "../history";

export const userActions = {
    signin,
    register,
};

function signin(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userAPI.signin(email, password)
            .then(
                payload => {
                    if (payload.status === 200) {
                        dispatch(success(payload));
                        // not best practice, but linking diff
                        // user experiences for demo
                        if (payload.role === "user"){
                            history.push("/dashboard/user");
                        } else if (payload.role === "admin") {
                            history.push("/dashboard/admin")
                        }
                    } else {
                        dispatch(failure(payload));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(payload) { return { type: Constants.SIGN_IN_LOADING, payload } }
    function success(payload) { return { type: Constants.SIGN_IN_SUCCESS, payload } }
    function failure(error) { return { type: Constants.SIGN_IN_FAILED, error } }
}

function register(email, firstName, lastName, phoneNumber, password, role, adminKey) {
    return dispatch => {
        dispatch(request({email, firstName, lastName, phoneNumber, password, role, adminKey}));

        userAPI.register(email, firstName, lastName, phoneNumber, password, role, adminKey)
            .then(
                payload => {
                    if (payload.status === 200) {
                        dispatch(success(payload));
                        if (payload.role === "user"){
                            history.push("/dashboard/user");
                        } else if (payload.role === "admin") {
                            history.push("/dashboard/admin");
                        }
                    } else {
                        dispatch(failure(payload));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(payload) { return { type: Constants.REGISTER_LOADING, payload } }
    function success(payload) { return { type: Constants.REGISTER_SUCCESS, payload } }
    function failure(error) { return { type: Constants.REGISTER_FAILED, error } }
}