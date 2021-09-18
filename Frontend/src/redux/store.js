import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { courseListReducer, coursePurchasedListReducer, courseDetailsReducer, courseCreateReducer, courseUpdateReducer } from '../redux/reducers/courseReducer';
import { reviewListReducer, reviewDetailsReducer, reviewCreateReducer, reviewUpdateReducer } from './reducers/reviewReducer';
import { playlistCreateReducer, playlistDetailsReducer, playlistUpdateReducer } from './reducers/videoReducer';
import { blogListReducer, blogDetailsReducer, blogCreateReducer } from '../redux/reducers/blogReducer';
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers';
import { paypalPayoutReducer } from './reducers/paypalReducer';
import { userSigninReducer, userDetailsReducer } from './reducers/userReducer';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    }
};
const reducer = combineReducers({
    courseList: courseListReducer,
    coursePurchasedList: coursePurchasedListReducer,
    courseDetails: courseDetailsReducer,
    courseCreate: courseCreateReducer,
    courseUpdate: courseUpdateReducer,

    reviewList: reviewListReducer,
    reviewDetails: reviewDetailsReducer,
    reviewCreate: reviewCreateReducer,
    reviewUpdate: reviewUpdateReducer,

    paypalPayout: paypalPayoutReducer,

    userSignin: userSigninReducer,
    userDetails: userDetailsReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    
    playlistCreate: playlistCreateReducer,
    playlistDetails: playlistDetailsReducer,
    playlistUpdate: playlistUpdateReducer,

    blogList: blogListReducer,
    blogDetails: blogDetailsReducer,
    blogCreate: blogCreateReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;