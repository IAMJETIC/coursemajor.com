import Axios from 'axios';

import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNOUT,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL
} from '../constants/userConstants';

export const signin = (email, password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST});
    try {
        const config = {
            header: {"Content-Type": "application/json",},
        };
        const { data } = await Axios.post(
            "http://localhost:5000/api/auth/login",
            { email, password },
            config
            );
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: data});
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({type: USER_SIGNIN_FAIL, payload: error.response.data.error});
    }
};

export const signout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("authToken");
    dispatch({ type: USER_SIGNOUT });
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const { userSignin: { userInfo },} = getState();
  try {
    const { data } = await Axios.get(`/api/auth/`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};



export const updateUser = (paypal) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST });
  const { userSignin: { userInfo },} = getState();
  try {
    const { data } = await Axios.put(`/api/auth/`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};