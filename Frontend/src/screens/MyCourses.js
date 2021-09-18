import React, {useEffect, useState} from 'react';
import Course from '../components/Course';
import {useSelector, useDispatch} from 'react-redux';
import {listPurchasedCourses} from '../redux/actions/courseActions';

export default function MyCourses() {

    const dispatch = useDispatch();
    const coursePurchasedList = useSelector(state => state.coursePurchasedList);
    const { loading, error, courses } = coursePurchasedList;
    console.log(courses);

    useEffect(() => {
        dispatch(listPurchasedCourses());
    }, []);


    return (
        <div>
            <header className="header-container">
                <div className="header-image">
                    <img src="https://storage.googleapis.com/fe-storage/2020/11/60bf25db-andrea-ward-lehman-brothers-homehero-desktop_1-1920x1000.jpg" alt="Header" />
                    <div className="header-text">
                        <h2>YOUR #1 PLACE FOR ONLINE COURSES</h2>
                    </div>
                </div>
            </header>

            <h1>Online Courses</h1>
            
            {loading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h1>{error}</h1>
            ) : coursePurchasedList.courses? (
                <div>
                    <div className="widget-container">  
                        {courses.length === 0 && <div>No Product Found</div>}
                        {courses.map((course) => (
                            <Course key={course._id} {...course}></Course>
                        ))}
                    </div>

                    <hr />

                </div>    
            ) : (
                <></>
            )}
            
        </div>
    );
}