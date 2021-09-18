import React, {useEffect, useState} from 'react';
import Course from '../components/Course';
import {useSelector, useDispatch} from 'react-redux';
import {list_courses} from '../redux/actions/courseActions';

export default function Home() {
    const dispatch = useDispatch();
    const courseList = useSelector(state => state.courseList);
    const { loading, error, courses } = courseList;

    useEffect(() => {
        dispatch(list_courses());
    }, []);

    const lol = useSelector(state => state.userSignin);
    const { userInfo } = lol;
    //console.log(userInfo);
    //console.log(`This is the 1st User Info ${localStorage.getItem("authToken")}`);
    //console.log(`This is the 2nd User Info ${localStorage.getItem("userInfo")}`);

    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h1>{error}</h1>
            ) : (
                <div>

                    <header class="header-container">
                        <div class="header-image">
                            <img src="https://storage.googleapis.com/fe-storage/2020/11/60bf25db-andrea-ward-lehman-brothers-homehero-desktop_1-1920x1000.jpg" alt="Header" />
                            <div class="header-text">
                                <h2>YOUR #1 PLACE FOR ONLINE COURSES</h2>
                            </div>
                        </div>
                    </header>

                    <h1>Online Courses</h1>

                    <div className="widget-container">
                        {courses.map((course) => {
                            return <Course key={course._id} {...course}></Course>
                        })}
                    </div>

                    <hr />

                    <h3>Top Sellers</h3>

                    <div class="top-sellers-container">

                        <div class="top-sellers-widget">
                            <div>
                                <img src="https://storage.googleapis.com/fe-storage/2020/11/242aaa44-the-modeler-online-course.png" alt="Paris" />
                            </div>

                            <h4>THE ASSET MANAGER</h4>
                            <p class="top-sellers-widget-details">Learn asset management from the firm hired by the top.</p>
                        </div>
                    </div>

                </div>    
            )}
            
        </div>
    );
}