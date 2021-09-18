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

export const courseListReducer = (state = {courses: [], loading:true, error:null}, action) => {
    switch (action.type){
        case COURSE_LIST_REQUEST:
            return { loading: true };
        case COURSE_LIST_SUCCESS:
            return { courses: action.payload, loading: false };
        case COURSE_LIST_FAIL:
            return { error: action.payload, loading: false };
        default:
            return state;
    }
};

export const coursePurchasedListReducer = (state = {courses: [], loading:true, error:null}, action) => {
    switch (action.type){
        case COURSE_PURCHASED_LIST_REQUEST:
            return { loading: true };
        case COURSE_PURCHASED_LIST_SUCCESS:
            return { courses: action.payload, loading: false };
        case COURSE_PURCHASED_LIST_FAIL:
            return { error: action.payload, loading: false };
        default:
            return state;
    }
};

export const courseDetailsReducer = (state = {course: {}, loading:true }, action) => {
    switch (action.type) {
        case COURSE_DETAILS_REQUEST:
            return { loading: true };
        case COURSE_DETAILS_SUCCESS:
            return { loading: false, course: action.payload };
        case COURSE_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const courseCreateReducer = (state = {course: {}, loading:true }, action) => {
    switch (action.type) {
        case COURSE_CREATE_REQUEST:
            return { loading: true };
        case COURSE_CREATE_SUCCESS:
            return { loading: false, course: action.payload };
        case COURSE_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const courseUpdateReducer = (state = {course: {}, success: false, loading:true }, action) => {
    switch (action.type) {
        case COURSE_UPDATE_REQUEST:
            return { loading: true };
        case COURSE_UPDATE_SUCCESS:
            return { loading: false, success: true, course: action.payload };
        case COURSE_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};