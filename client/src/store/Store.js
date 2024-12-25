import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { chirpReducer } from "./Chirp/Reducer";

const rootReducers = combineReducers({
    auth: authReducer,
    chirp: chirpReducer
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));