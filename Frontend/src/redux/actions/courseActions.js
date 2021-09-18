import Axios from 'axios';

import {
    COURSE_LIST_REQUEST,
    COURSE_LIST_SUCCESS,
    COURSE_LIST_FAIL, 
    
    COURSE_PURCHASED_LIST_REQUEST,
    COURSE_PURCHASED_LIST_SUCCESS,
    COURSE_PURCHASED_LIST_FAIL, 

    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
    COURSE_DETAILS_FAIL,
    COURSE_CREATE_REQUEST,
    COURSE_CREATE_SUCCESS,
    COURSE_CREATE_FAIL,
    COURSE_UPDATE_REQUEST,
    COURSE_UPDATE_SUCCESS,
    COURSE_UPDATE_FAIL
} from '../constants/courseConstants';

import { playlistCreate } from './videoActions';

export const list_courses = () => async (dispatch) => {
    dispatch({type: COURSE_LIST_REQUEST,});
    try {
        const {data} = await Axios.get('http://localhost:5000/api/courses');
        dispatch({ type: COURSE_LIST_SUCCESS, payload: data
        });
    } catch (error) {
        dispatch({type: COURSE_LIST_FAIL, payload: error.message});
    }
};

export const listPurchasedCourses = () => async (dispatch, getState) => {
    dispatch({type: COURSE_PURCHASED_LIST_REQUEST,});
    try {
        const { userSignin: { userInfo },} = getState();

        const {data} = await Axios.get('http://localhost:5000/api/courses/purchased',
        { headers: { Authorization: `Bearer ${userInfo.token}` }, }
        );


        dispatch({ type: COURSE_PURCHASED_LIST_SUCCESS, payload: data
        });
    } catch (error) {
        dispatch({type: COURSE_PURCHASED_LIST_FAIL, payload: error.message});
    }
};

export const coursesDetails = (courseId) => async (dispatch) => {
    dispatch({ type: COURSE_DETAILS_REQUEST, payload: courseId });
    try {
        const { data } = await Axios.get(`http://localhost:5000/api/courses/${courseId}`);
        dispatch({ type: COURSE_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: COURSE_DETAILS_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const courseCreate = (courseId) => async (dispatch, getState) => {
    dispatch({ type: COURSE_CREATE_REQUEST });
    try {
        const { userSignin: { userInfo },} = getState();
        /*
        const { data } = await Axios.post(`http://localhost:5000/api/courses/create`, 
        { headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`}
        });
        */

        const { data } = await Axios({ method: 'post', url: `/api/courses/create`, headers: { Authorization: `Bearer ${userInfo.token}`}})

        if (data) {
            dispatch(playlistCreate(data._id))
            dispatch({ type: COURSE_CREATE_SUCCESS, payload: data });
        }
        
        
        console.log(data);
    } catch (error) {
        console.log("Error");
        dispatch({
            type: COURSE_CREATE_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const courseUpdate = (courseId, formData) => async (dispatch) => {
    dispatch({ type: COURSE_UPDATE_REQUEST });

    try {
        const config = {header: {"content-type": "multipart/form-data"}};
        const { data } = await Axios.put(`http://localhost:5000/api/courses/${courseId}`, formData, config);
        dispatch({ type: COURSE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: COURSE_UPDATE_FAIL, 
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
            });
        }
};