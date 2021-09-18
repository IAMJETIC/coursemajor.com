import Axios from 'axios';

import {
    BLOG_LIST_REQUEST,
    BLOG_LIST_SUCCESS,
    BLOG_LIST_FAIL, 
    BLOG_DETAILS_REQUEST,
    BLOG_DETAILS_SUCCESS,
    BLOG_DETAILS_FAIL,
    BLOG_CREATE_REQUEST,
    BLOG_CREATE_SUCCESS,
    BLOG_CREATE_FAIL,
    BLOG_UPDATE_REQUEST,
    BLOG_UPDATE_SUCCESS,
    BLOG_UPDATE_FAIL
} from '../constants/blogConstants';

import { playlistCreate } from './videoActions';

export const list_blogs = () => async (dispatch) => {
    dispatch({type: BLOG_LIST_REQUEST,});
    try {
        const {data} = await Axios.get('http://localhost:5000/api/blogs');
        dispatch({ type: BLOG_LIST_SUCCESS, payload: data
        });
    } catch (error) {
        dispatch({type: BLOG_LIST_FAIL, payload: error.message});
    }
};

export const blogsDetails = (blogId) => async (dispatch) => {
    dispatch({ type: BLOG_DETAILS_REQUEST, payload: blogId });
    try {
        const { data } = await Axios.get(`http://localhost:5000/api/blogs/${blogId}`);
        dispatch({ type: BLOG_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: BLOG_DETAILS_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const blogCreate = (blogId) => async (dispatch) => {
    dispatch({ type: BLOG_CREATE_REQUEST });
    try {
        const { data } = await Axios.post(`http://localhost:5000/api/blogs/create`);
        console.log(data);
        dispatch(playlistCreate(data._id))
        dispatch({ type: BLOG_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: BLOG_CREATE_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const blogUpdate = (blogId) => async (dispatch) => {
    dispatch({ type: BLOG_CREATE_REQUEST });
    try {
        const { data } = await Axios.put(`http://localhost:5000/api/blogs/create`);
        console.log(data);
        dispatch({ type: BLOG_CREATE_SUCCESS, payload: data });
        
    } catch (error) {
        dispatch({
            type: BLOG_CREATE_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};