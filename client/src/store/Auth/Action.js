import axios from 'axios';
import { api, API_BASE_URL } from "../../config/Config"
import { FIND_USER_BY_ID_FAILURE, FIND_USER_BY_ID_SUCCESS, FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS } from './AuthType';

export const loginUser = (loginData) => async(dispatch) => {
    try{
        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);

        if(data.jwt){
            localStorage.setItem("jwt", data.jwt);
        }

        dispatch({type: LOGIN_USER_SUCCESS, payload: data.jwt})
    }
    catch(error) {
        console.log("Error: ", error);
        dispatch({type: LOGIN_USER_FAILURE, payload: error.message});
    }
}

export const registerUser = (registerData) => async(dispatch) => {
    try{
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup`, registerData);

        if(data.jwt){
            localStorage.setItem("jwt", data.jwt);
        }

        dispatch({type: REGISTER_USER_SUCCESS, payload: data.jwt})
    }
    catch(error) {
        console.log("Error: ", error);
        dispatch({type: REGISTER_USER_FAILURE, payload: error.message});
    }
}

export const getUserProfile = (jwt) => async(dispatch) => {
    try{
        const {data} = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        });

        if(data.jwt){
            localStorage.setItem("jwt", data.jwt);
        }

        dispatch({type: GET_USER_PROFILE_SUCCESS, payload: data})
    }
    catch(error) {
        console.log("Error: ", error);
        dispatch({type: GET_USER_PROFILE_FAILURE, payload: error.message});
    }
}

export const findUserById = (userId) => async(dispatch) => {
    try{
        const {data} = await api.get(`/api/users/${userId}`);
        console.log("User found: ", data);
        dispatch({type: FIND_USER_BY_ID_SUCCESS, payload: data})
    }
    catch(error) {
        console.log("Error: ", error);
        dispatch({type: FIND_USER_BY_ID_FAILURE, payload: error.message});
    }
}

export const updateUserProfile = (reqData) => async(dispatch) => {
    try{
        const {data} = await api.put(`/api/users/update`, reqData);
        console.log("Update user: ", data);
        dispatch({type: UPDATE_USER_SUCCESS, payload: data})
    }
    catch(error) {
        console.log("Error: ", error);
        dispatch({type: UPDATE_USER_FAILURE, payload: error.message});
    }
}

export const followUserAction = (userId) => async(dispatch) => {
    try{
        const {data} = await api.put(`/api/users/${userId}/follow`);
        console.log("Update user: ", data);
        dispatch({type: FOLLOW_USER_SUCCESS, payload: data})
    }
    catch(error) {
        console.log("Error: ", error);
        dispatch({type: FOLLOW_USER_FAILURE, payload: error.message});
    }
}

export const logout = () => async(dispatch) => {
    localStorage.removeItem("jwt");

    dispatch({type: LOGOUT})
}