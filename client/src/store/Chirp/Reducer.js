import { FIND_CHIRP_BY_ID_FAILURE, FIND_CHIRP_BY_ID_REQUEST, FIND_CHIRP_BY_ID_SUCCESS, GET_ALL_CHIRPS_SUCCESS, GET_USERS_CHIRP_SUCCESS, LIKE_CHIRP_FAILURE, LIKE_CHIRP_REQUEST, LIKE_CHIRP_SUCCESS, REPLY_CHIRP_SUCCESS, RECHIRP_FAILURE, RECHIRP_REQUEST, RECHIRP_SUCCESS, CHIRP_CREATE_FAILURE, CHIRP_CREATE_REQUEST, CHIRP_CREATE_SUCCESS, CHIRP_DELETE_FAILURE, CHIRP_DELETE_REQUEST, CHIRP_DELETE_SUCCESS, USER_LIKE_CHIRP_FAILURE, USER_LIKE_CHIRP_REQUEST, USER_LIKE_CHIRP_SUCCESS } from "./ActionType";

const initialState = {
    loading: false,
    data: null,
    error: null,
    chirps: [],
    chirp: null
}

export const chirpReducer = (state = initialState, action) => {

    switch(action.type){
        case CHIRP_CREATE_REQUEST:
        case CHIRP_DELETE_REQUEST:
        case USER_LIKE_CHIRP_REQUEST:
        case LIKE_CHIRP_REQUEST:
        case RECHIRP_REQUEST:
        case FIND_CHIRP_BY_ID_REQUEST:
            return {...state, loading: true, error: null};

        case CHIRP_CREATE_FAILURE:
        case CHIRP_DELETE_FAILURE:
        case USER_LIKE_CHIRP_FAILURE:
        case LIKE_CHIRP_FAILURE:
        case RECHIRP_FAILURE:
        case FIND_CHIRP_BY_ID_FAILURE:
            return {...state, loading: false, error: action.payload};

        case CHIRP_CREATE_SUCCESS:
            return {...state, loading: false, error: null, chirps: [action.payload, ...state.chirps]};

        case GET_ALL_CHIRPS_SUCCESS:
        case GET_USERS_CHIRP_SUCCESS:
            return {...state, loading: false, error: null, chirps: action.payload};

        case USER_LIKE_CHIRP_SUCCESS:
            return {...state, loading: false, error: null, likedChirps: action.payload};

        case LIKE_CHIRP_SUCCESS:
            return {...state, loading: false, error: null, like: action.payload};

        case CHIRP_DELETE_SUCCESS:
            return {
                ...state, 
                loading: false, 
                error: null, 
                chirps: state.chirps.filter(chirp => chirp.id !== action.payload) 
            };

        case RECHIRP_SUCCESS:
            return {...state, loading: false, error: null, rechirp: action.payload};

        case FIND_CHIRP_BY_ID_SUCCESS:
        case REPLY_CHIRP_SUCCESS:
            return {...state, loading: false, error: null, chirp: action.payload};

        default:
            return state;
    }
}