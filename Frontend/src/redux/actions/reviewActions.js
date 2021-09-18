import Axios from 'axios';

import {
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
    REVIEW_LIST_FAIL, 
    
    REVIEW_PURCHASED_LIST_REQUEST,
    REVIEW_PURCHASED_LIST_SUCCESS,
    REVIEW_PURCHASED_LIST_FAIL, 

    REVIEW_DETAILS_REQUEST,
    REVIEW_DETAILS_SUCCESS,
    REVIEW_DETAILS_FAIL,
    REVIEW_CREATE_REQUEST,
    REVIEW_CREATE_SUCCESS,
    REVIEW_CREATE_FAIL,
    REVIEW_UPDATE_REQUEST,
    REVIEW_UPDATE_SUCCESS,
    REVIEW_UPDATE_FAIL
} from '../constants/reviewConstants';

import { playlistCreate } from './videoActions';

export const list_reviews = () => async (dispatch) => {
    dispatch({type: REVIEW_LIST_REQUEST,});
    try {
        const {data} = await Axios.get('http://localhost:5000/api/reviews');
        dispatch({ type: REVIEW_LIST_SUCCESS, payload: data
        });
    } catch (error) {
        dispatch({type: REVIEW_LIST_FAIL, payload: error.message});
    }
};

export const listPurchasedCourses = () => async (dispatch, getState) => {
    dispatch({type: REVIEW_PURCHASED_LIST_REQUEST,});
    try {
        const { userSignin: { userInfo },} = getState();

        const {data} = await Axios.get('http://localhost:5000/api/reviews/purchased',
        { headers: { Authorization: `Bearer ${userInfo.token}` }, }
        );


        dispatch({ type: REVIEW_PURCHASED_LIST_SUCCESS, payload: data
        });
    } catch (error) {
        dispatch({type: REVIEW_PURCHASED_LIST_FAIL, payload: error.message});
    }
};

export const reviewsDetails = (reviewId) => async (dispatch) => {
    dispatch({ type: REVIEW_DETAILS_REQUEST, payload: reviewId });
    try {
        const { data } = await Axios.get(`http://localhost:5000/api/reviews/${reviewId}`);
        dispatch({ type: REVIEW_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REVIEW_DETAILS_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const reviewCreate = (reviewId) => async (dispatch, getState) => {
    dispatch({ type: REVIEW_CREATE_REQUEST });
    try {
        const { userSignin: { userInfo },} = getState();
        const { data } = await Axios.post(`http://localhost:5000/api/reviews/create`,
        { headers: { Authorization: `Bearer ${userInfo.token}` }, }
        );
        dispatch(playlistCreate(data._id))
        dispatch({ type: REVIEW_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REVIEW_CREATE_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const reviewUpdate = (reviewId, formData) => async (dispatch) => {
    dispatch({ type: REVIEW_UPDATE_REQUEST });

    try {
        const config = {header: {"content-type": "multipart/form-data"}};
        const { data } = Axios.put(`http://localhost:5000/api/reviews/${reviewId}`, formData, config);
        dispatch({ type: REVIEW_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REVIEW_UPDATE_FAIL, 
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
            });
        }
};