import {Constants} from "../constants/constants";

const DefaultState = {
    signedIn: false,
    email: '',
    role: null,
    errorMsg: "",
}

export function userReducer(state = DefaultState, action) {
    switch (action.type) {
        case Constants.SIGN_IN_LOADING:
            return {
                ...state,
                signedIn: false,
                role: null,
                errorMsg: ""
            };
        case Constants.SIGN_IN_SUCCESS:
            return {
                ...state,
                signedIn: true,
                email: action.payload.email,
                role: action.payload.role,
                errorMsg: "",
            };
        case Constants.SIGN_IN_FAILED:
            return {
                ...state,
                signedIn: false,
                role: null,
                errorMsg: "",
            };
        case Constants.REGISTER_LOADING:
            return {
                ...state,
                signedIn: false,
                role: null,
                errorMsg: ""
            };
        case Constants.REGISTER_SUCCESS:
            return {
                ...state,
                signedIn: true,
                email: action.payload.email,
                role: action.payload.role,
                errorMsg: ""
            };
        case Constants.REGISTER_FAILED:
            return {
                ...state,
                signedIn: false,
                role: null,
                errorMsg: ""
            };
        default:
            return state
    }
}
