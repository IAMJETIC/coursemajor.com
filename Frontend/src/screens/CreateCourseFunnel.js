import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { courseCreate } from '../redux/actions/courseActions';
import { playlistCreate } from '../redux/actions/videoActions';

export default function CreateCourseFunnel(props) {
    const dispatch = useDispatch();
    const courseCreated = useSelector(state => state.courseCreate);
    const playlistCreated = useSelector(state => state.playlistCreate);
    const { loading, error, course } = courseCreated;
    const { playlist } = playlistCreated;


    const createHandler = () => {
        dispatch(courseCreate());
    }

    
    playlistCreated.loading ? (
        console.log("dwl")    
    ) : (
        props.history.push(`/createCourse?courseId=${course._id}&playlistId=${playlist._id}`)    
    )

    return (

        <div>
            <div className="header-image">
                <img src="https://storage.googleapis.com/fe-storage/2020/11/60bf25db-andrea-ward-lehman-brothers-homehero-desktop_1-1920x1000.jpg" alt="Header Image" />
                <div className="header-text">
                    <h2>Come teach with us</h2>
                    <p>Become an instructor and change lives — including your own</p>
                </div>
            </div>

            <h3>So many reasons to start</h3>

            <div className="createCourseFunnel">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lightbulb" viewBox="0 0 16 16">
                        <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z" />
                    </svg>
                    <h4>Inspire learners</h4>
                    <p>
                        Teach what you know and help learners explore their interests, gain new skills, and advance their careers.
                    </p>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                    </svg>
                    <h4>Teach your way</h4>
                    <p>
                        Publish the course you want, in the way you want, and always have of control your own content.
                    </p>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gift" viewBox="0 0 16 16">
                        <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zM1 4v2h6V4H1zm8 0v2h6V4H9zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5V7zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5H7z" />
                    </svg>
                    <h4>Get rewarded</h4>
                    <p>
                        Expand your professional network, build your expertise, and earn money on each paid enrollment.
                    </p>
                </div>
            </div>

            <div className="createCourseFunnel2">
                <h4>How to begin</h4>
                <p>
                    You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool.
                </p>
                The way that you teach — what you bring to it — is up to you.

                <h4>How we help you</h4>
                <p>
                    We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized.
                </p>
            </div>

            <div className="createCourseFunnel3">
                <h2>Become an instructor today</h2>
                <p>Join the world’s largest online learning marketplace.</p>
                <button onClick={createHandler}>Get Started</button>
            </div>
        </div>
    );
}