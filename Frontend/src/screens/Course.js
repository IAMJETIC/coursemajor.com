import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player'

import { useSelector, useDispatch } from 'react-redux';
import { coursesDetails } from '../redux/actions/courseActions';
import { playlistDetails } from '../redux/actions/videoActions';

import Rating from '../components/Rating';

export default function Course(props) {
    const [currentVideo, setCurrentVideo] = useState();
    
    const dispatch = useDispatch();
    const courseId = props.match.params.id;

    useEffect(() => {
        dispatch(coursesDetails(courseId));
        dispatch(playlistDetails(courseId));
    }, [dispatch]);
    
    const courseDetail = useSelector(state => state.courseDetails);
    const { loading, error, course } = courseDetail;
    
    const playlistDetail = useSelector(state => state.playlistDetails);
    const { playlist } = playlistDetail;

return(
    <div>
            {playlistDetail.loading || courseDetail.loading ? (
                <h1>Loading...</h1>
            ) : playlistDetail.error ? (
                <h1>{error}</h1>
            ) : (
                <div>
                    <h1>Course Title</h1>
                    <div className="productOverview">
                        <div className="playlist-video">
                            {console.log(currentVideo)}
                            <ReactPlayer 
                                controls 
                                url={`${currentVideo}`}
                                //url='https://www.youtube.com/watch?v=TRCDsB9i3bI&t=27646s' 
                                //width='100%'
                                //height='100%'
          
                            />
                        </div>

                     <div className="playlist-container">

                        <ul>
                            {playlistDetail.loading ? (
                                <div>Loading...</div>
                            ) : (
                                playlist.videoplaylist ? (
                                playlist.videoplaylist.map((playlist) => {
                                    return (
                                        <li>
                                            <div className="playlist-link" to={() => setCurrentVideo(`/${playlistDetail.playlist.videoplaylist.Key}`)}>
                                            {console.log(playlist.Key)}
                                            <button className="playlist-link" onClick={() => setCurrentVideo(`/api/playlist/video/${playlist.Key}`)}>Lol</button>
                                                <div className="playlist-widget">
                                                    <p className="playlist-number">{playlist.Number}</p>
                                                    <div className="playlist-thumbnail">
                                                        <img src={`/${courseDetail.course.image}`} alt="Paris"/>
                                                    </div>
                                                    
                                                    <div className="playlist-details">
                                                        <h4>{playlist.Title.toUpperCase()}</h4>
                                                        <p>{playlist.Description}</p>
                                                    </div>
                                                </div>
                                            </div>  
                                        </li>
                                    )
                                
                            })
                                
                         ) : (
                                        <>lol</>
                                    )
                                    )
                        }
                        </ul>
                    </div>
                
                    </div>

                    <br/>
                        <hr/>
                    <br/>

                    <div className="productOverviewInfo">
                        <div className="cells">
                            <h1>25</h1>
                            <p>TOPICS</p>
                        </div>
                        
                        <div className="cells">
                            <div className="lifetime-acc">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" className="bi bi-calendar2-check" viewBox="0 0 16 16">
                                    <path d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                                    <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
                                </svg>
                            </div>
                            <p>LIFETIME ACCESS</p>
                        </div>
                        
                        <div className="cells">
                            <p className="rating-text">RATING</p>
                            <p>4.5 Stars</p>
                            <div className="ratings">
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                            </div>
                        </div>
                        
                    </div>

                    <br/>

                    <div className="grey-container">
                        <h3>Reviews</h3>
                        <br/>
                        <div className="review-container">

                            <div className="reviews">
                                <div className="reviews-header">
                                    <div className="review-img">
                                        <img src="https://storage.googleapis.com/fe-storage/2020/11/8f043753-testimonial-placeholder-female-71-v3.png"/>
                                    </div>
                            
                                    <div className="review-header-text">
                                        <p><b>SUMMER INTERN 2020</b></p>
                                        <p>The Modeler</p>
                                        <div className="ratings">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <p className="reviews-details-text">
                                The Modeler by Financial Edge gives the student an opportunity to learn hands-on experience in financial modeling. From short cuts and revision techniques to Three Model Statement creation. Certainly an insight
                                </p>

                            </div>



                            <div className="reviews">    
                                <div className="reviews-header">
                                    <div className="review-img">
                                        <img src="https://storage.googleapis.com/fe-storage/2020/11/8f043753-testimonial-placeholder-female-71-v3.png"/>
                                    </div>
                                    <div className="review-header-text">
                                        <p><b>SUMMER INTERN 2020</b></p>
                                        <p>The Modeler</p>
                                        <div className="ratings">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <p className="reviews-details-text">
                                The Modeler by Financial Edge gives the student an opportunity to learn hands-on experience in financial modeling. From short cuts and revision techniques to Three Model Statement creation. Certainly an insight
                                </p>
                            </div>
                        </div>   
                    </div>


                    <h5>OTHER COURSES YOU MAY BE INTERESTED IN</h5>

                    <div className="upsellcourses"> 
                        <ul>   
                            <li>
                                <div className="course-widget">
                                    <div>
                                        <img src="https://storage.googleapis.com/fe-storage/2020/11/242aaa44-the-modeler-online-course.png" alt="Paris"/>
                                    </div>
                                    <h4>THE ASSET MANAGER</h4>
                                    <p className="course-widget-details">Learn asset management from the firm hired by the top 4 investment banks to teach their new analysts.</p>

                                    <hr/>   

                                    <div className="course-widget-end">
                                        <h3>$749</h3>
                                        <div>
                                            <p className="course-widget-details">5 STARS</p>
                                            <p>Star star star star</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                                
                            <li>
                                <div className="course-widget othercoursesWIDGETADD">
                                    <div>
                                        <img src="https://storage.googleapis.com/fe-storage/2020/11/242aaa44-the-modeler-online-course.png" alt="Paris"/>
                                    </div>

                                    <h4>THE ASSET MANAGER</h4>
                                    <p className="course-widget-details">Learn asset management from the firm hired by the top 4 investment banks to teach their new analysts.</p>

                                    <hr/>   

                                    <div className="course-widget-end">
                                        <h3>$749</h3>
                                        <div>
                                            <p className="course-widget-details">5 STARS</p>
                                            <p>Star star star star</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                                
                            <li>
                                <div className="course-widget othercoursesWIDGETADD">
                                    <div>
                                        <img src="https://storage.googleapis.com/fe-storage/2020/11/242aaa44-the-modeler-online-course.png" alt="Paris"/>
                                    </div>

                                    <h4>THE ASSET MANAGER</h4>
                                    <p className="course-widget-details">Learn asset management from the firm hired by the top 4 investment banks to teach their new analysts.</p>

                                    <hr/>   

                                    <div className="course-widget-end">
                                        <h3>$749</h3>
                                        <div>
                                            <p className="course-widget-details">5 STARS</p>
                                            <p>Star star star star</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                                    
                                
                            
                            <li>
                                <div className="course-widget othercoursesWIDGETADD">
                                    <div>
                                        <img src="https://storage.googleapis.com/fe-storage/2020/11/242aaa44-the-modeler-online-course.png" alt="Paris"/>
                                    </div>

                                    <h4>THE ASSET MANAGER</h4>
                                    <p className="course-widget-details">Learn asset management from the firm hired by the top 4 investment banks to teach their new analysts.</p>

                                    <hr/>   

                                    <div className="course-widget-end">
                                        <h3>$749</h3>
                                        <div>
                                            <p className="course-widget-details">5 STARS</p>
                                            <p>Star star star star</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            
                                
                                    
                                </ul>
                            </div>

                        
                </div>
            )}
    </div>
    )
}
