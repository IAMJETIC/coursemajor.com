import {
    BLOG_LIST_REQUEST,
    BLOG_LIST_SUCCESS,
    BLOG_LIST_FAIL,
    BLOG_DETAILS_REQUEST,
    BLOG_DETAILS_SUCCESS,
    BLOG_DETAILS_FAIL, 
    BLOG_CREATE_REQUEST,
    BLOG_CREATE_SUCCESS,
    BLOG_CREATE_FAIL
} from '../constants/blogConstants';

const initialState = {blogs: [], loading:true, error:null};

export const blogListReducer = (state = initialState, action) => {
    switch (action.type){
        case BLOG_LIST_REQUEST:
            return { loading: true };
        case BLOG_LIST_SUCCESS:
            return {
                blogs: action.payload, 
                loading: false
            };
        case BLOG_LIST_FAIL:
            return {
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};

export const blogDetailsReducer = (state = {blog: {}, loading:true }, action) => {
    switch (action.type) {
        case BLOG_DETAILS_REQUEST:
            return { loading: true };
        case BLOG_DETAILS_SUCCESS:
            return { loading: false, blog: action.payload };
        case BLOG_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const blogCreateReducer = (state = {blog: {}, loading:true }, action) => {
    switch (action.type) {
        case BLOG_CREATE_REQUEST:
            return { loading: true };
        case BLOG_CREATE_SUCCESS:
            return { loading: false, blog: action.payload };
        case BLOG_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};