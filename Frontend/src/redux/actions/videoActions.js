import Axios from 'axios';

import {
    PLAYLIST_LIST_REQUEST,
    PLAYLIST_LIST_SUCCESS,
    PLAYLIST_LIST_FAIL, 
    PLAYLIST_DETAILS_REQUEST,
    PLAYLIST_DETAILS_SUCCESS,
    PLAYLIST_DETAILS_FAIL,
    PLAYLIST_CREATE_REQUEST,
    PLAYLIST_CREATE_SUCCESS,
    PLAYLIST_CREATE_FAIL,
    PLAYLIST_UPDATE_REQUEST,
    PLAYLIST_UPDATE_SUCCESS,
    PLAYLIST_UPDATE_FAIL
} from '../constants/videoConstants';


export const playlistDetails = (courseId) => async (dispatch, getState) => {
    dispatch({ type: PLAYLIST_DETAILS_REQUEST, payload: courseId });
    try {
        const { userSignin: { userInfo },} = getState();

        const { data } = await Axios.get(`http://localhost:5000/api/playlist/${courseId}`, {
            headers: { Authorization: `Bearer ${userInfo?.token}` },
        });

        dispatch({ type: PLAYLIST_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PLAYLIST_DETAILS_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const playlistCreate = (courseId) => async (dispatch, getState) => {
    dispatch({ type: PLAYLIST_CREATE_REQUEST });
    try {
        const { userSignin: { userInfo },} = getState();
        const { data } = await Axios.post(`http://localhost:5000/api/playlist/create/${courseId}`, {
            headers: { Authorization: `Bearer ${userInfo?.token}` },
        });
        //console.log(data);
        //console.log("play create");
        dispatch({ type: PLAYLIST_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PLAYLIST_CREATE_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const playlistUpdate = (courseId, playlistTitle, playlistDescription, file) => async (dispatch, getState) => {
    dispatch({ type: PLAYLIST_UPDATE_REQUEST });

    let formData = new FormData();
    formData.append("Title", playlistTitle);
    formData.append("Description", playlistDescription);
    formData.append("video", file);
       
    
    const { userSignin: { userInfo },} = getState();

    const config = {headers: { Authorization: `Bearer ${userInfo?.token}`, 'content-type': 'multipart/form-data', }}
       
    try {
        const { data } = Axios.put(`http://localhost:5000/api/playlist/${courseId}`, formData, config)
            .then((response) => {
                dispatch(playlistDetails(courseId));
            }).catch((err) => {
                //console.log(err)
            })

        dispatch({ type: PLAYLIST_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PLAYLIST_UPDATE_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const playlistArrange = (numToUpdate, upDown, courseId) => async (dispatch, getState) => {
    dispatch({ type: PLAYLIST_UPDATE_REQUEST });
    const { userSignin: { userInfo },} = getState();
    try {
        let up=false;
        let down=false;

        if (upDown === 'up') {
            up=true;
            down=false;
        }
        if (upDown === 'down') {
            up=false;
            down=true;
        }
        
        const { data } = await Axios.put(`http://localhost:5000/api/playlist/arrange/${courseId}`, {numToUpdate, up, down}, {
            headers: { Authorization: `Bearer ${userInfo?.token}` },
        });
    dispatch({ type: PLAYLIST_UPDATE_SUCCESS, payload: data });
    
    dispatch(playlistDetails(courseId));

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PLAYLIST_UPDATE_FAIL, payload: message });
  }
};


export const playlistVideoUpdate = (numToUpdate, title, description, courseId) => async (dispatch, getState) => {
    dispatch({ type: PLAYLIST_UPDATE_REQUEST });
    const { userSignin: { userInfo },} = getState();
    
    try {
        const { data } = await Axios.put(`http://localhost:5000/api/playlist/updateVideoDetails/${courseId}`, {numToUpdate, title, description}, {
            headers: { Authorization: `Bearer ${userInfo?.token}` },
        });
    dispatch({ type: PLAYLIST_UPDATE_SUCCESS, payload: data });
    
    dispatch(playlistDetails(courseId));

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PLAYLIST_UPDATE_FAIL, payload: message });
  }
};


export const playlistDelete = (numberToRemove, courseId) => async (dispatch, getState) => {
    dispatch({ type: PLAYLIST_UPDATE_REQUEST });
    const { userSignin: { userInfo },} = getState();
    try {   
        console.log(numberToRemove);
        const { data } = await Axios.patch(`http://localhost:5000/api/playlist/remove/${courseId}`, {numberToRemove}, {
            headers: { Authorization: `Bearer ${userInfo?.token}` },
        });
    dispatch({ type: PLAYLIST_UPDATE_SUCCESS, payload: data });
    
    dispatch(playlistDetails(courseId));

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PLAYLIST_UPDATE_FAIL, payload: message });
  }
};