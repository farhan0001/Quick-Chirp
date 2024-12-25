import { api } from "../../config/Config";
import { FIND_CHIRP_BY_ID_FAILURE, FIND_CHIRP_BY_ID_SUCCESS, GET_ALL_CHIRPS_FAILURE, GET_ALL_CHIRPS_SUCCESS, GET_USERS_CHIRP_FAILURE, GET_USERS_CHIRP_SUCCESS, LIKE_CHIRP_FAILURE, LIKE_CHIRP_SUCCESS, REPLY_CHIRP_FAILURE, REPLY_CHIRP_SUCCESS, RECHIRP_FAILURE, RECHIRP_SUCCESS, CHIRP_CREATE_FAILURE, CHIRP_CREATE_SUCCESS, CHIRP_DELETE_FAILURE, CHIRP_DELETE_SUCCESS, USER_LIKE_CHIRP_FAILURE, USER_LIKE_CHIRP_SUCCESS } from "./ActionType"

export const getAllChirps = () => async(dispatch) => {
    try{
        const {data} = await api.get("/api/chirps");
        console.log("Get all chirps: ", data);
        dispatch({type: GET_ALL_CHIRPS_SUCCESS, payload: data});
    }
    catch(error) {
        console.log("Error: ", error);
        dispatch({type: GET_ALL_CHIRPS_FAILURE, payload: error.message});
    }
}

export const getUserChirps = (userId) => async(dispatch) => {
    try{
        const {data} = await api.get(`/api/chirps/user/${userId}`);
        console.log("Get user chirps: ", data);
        dispatch({type: GET_USERS_CHIRP_SUCCESS, payload: data});
    }
    catch(error) {
        console.log("Error: ", error);
        dispatch({type: GET_USERS_CHIRP_FAILURE, payload: error.message});
    }
}

export const findChirpsByLikeContainsUser = (userId) => async(dispatch) => {
    try{
        const {data} = await api.get(`/api/chirps/user/${userId}/likes`);
        console.log("Find chirp by Id: ", data);
        dispatch({type: USER_LIKE_CHIRP_SUCCESS, payload: data});
    }
    catch(error) {
        console.log("Error: ", error);
        dispatch({type: USER_LIKE_CHIRP_FAILURE, payload: error.message});
    }
}

export const findChirpById = (chirpId) => async(dispatch) => {
    try{
        const {data} = await api.get(`/api/chirps/${chirpId}`);
        console.log("Get user chirps: ", data);
        dispatch({type: FIND_CHIRP_BY_ID_SUCCESS, payload: data});
    }
    catch(error) {
        console.log("Error: ", error);
        dispatch({type: FIND_CHIRP_BY_ID_FAILURE, payload: error.message});
    }
}

export const createChirp = (chirpData) => async(dispatch) => {
    try{
        const {data} = await api.post("/api/chirps/create", chirpData);
        console.log("Create chirp: ", data);
        dispatch({type: CHIRP_CREATE_SUCCESS, payload: data});
    }
    catch(error) {
        console.log("Error: ", error);
        dispatch({type: CHIRP_CREATE_FAILURE, payload: error.message});
    }
}

export const createChirpReply = (chirpData) => async(dispatch) => {
    try{
        const {data} = await api.post("/api/chirps/reply", chirpData);
        console.log("Reply chirp: ", data);
        dispatch({type: REPLY_CHIRP_SUCCESS, payload: data});
    }
    catch(error) {
        console.log("Error: ", error);
        dispatch({type: REPLY_CHIRP_FAILURE, payload: error.message});
    }
}

export const createRechirp = (chirpId) => async(dispatch) => {
    try{
        const {data} = await api.put(`/api/chirps/${chirpId}/rechirp`);
        console.log("Rechirp: ", data);
        dispatch({type: RECHIRP_SUCCESS, payload: data});
    }
    catch(error) {
        console.log("Error: ", error);
        dispatch({type: RECHIRP_FAILURE, payload: error.message});
    }
}

export const likeChirp = (chirpId) => async(dispatch) => {
    try{
        const {data} = await api.post(`/api/${chirpId}/like`);
        console.log("Like chirp: ", data);
        dispatch({type: LIKE_CHIRP_SUCCESS, payload: data});
    }
    catch(error) {
        console.log("Error: ", error);
        dispatch({type: LIKE_CHIRP_FAILURE, payload: error.message});
    }
}

export const deleteChirp = (chirpId) => async(dispatch) => {
    try{
        const {data} = await api.post(`/api/chirp/${chirpId}`);
        console.log("Delete chirp: ", data);
        dispatch({type: CHIRP_DELETE_SUCCESS, payload: chirpId});
    }
    catch(error) {
        console.log("Error: ", error);
        dispatch({type: CHIRP_DELETE_FAILURE, payload: error.message});
    }
}