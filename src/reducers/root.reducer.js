import {combineReducers} from "redux";
import {userReducer} from "./user.reducer";
import {truckReducer} from "./truck.reducer";
import {reservationReducer} from "./reservation.reducer";

const rootReducer = combineReducers({
    userReducer,
    truckReducer,
    reservationReducer,
});

export default rootReducer;