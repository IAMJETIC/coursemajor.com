//import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux';
import { coursesDetails, courseUpdate } from '../redux/actions/courseActions';
import { playlistDetails, 
    playlistUpdate, 
    playlistArrange, 
    playlistDelete, 
    playlistVideoUpdate 
} from '../redux/actions/videoActions';

import queryString from 'query-string';

export default function CreateCourse(props) {
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [coursePrice, setCoursePrice] = useState(997);
    const [image, setImage] = useState();
    
    
    const [playlistTitle, setPlaylistTitle] = useState("");
    const [playlistDescription, setPlaylistDescription] = useState([]);
    const [file, setFile] = useState();
    
    const [playlistEditTitle, setPlaylistEditTitle] = useState([]);
    const [playlistEditDescription, setPlaylistEditDescription] = useState([]);

    const dispatch = useDispatch();

    const { search } = useLocation()
    const { courseId, playlistId } = queryString.parse(search) 
    
    useEffect(() => {
        dispatch(coursesDetails(courseId));
        dispatch(playlistDetails(courseId));
    }, [dispatch]);
    

    const courseDetail = useSelector(state => state.courseDetails);
    const courseUpdated = useSelector(state => state.courseUpdate);
    const playlistDetail = useSelector(state => state.playlistDetails);
    const { playlist } = playlistDetail;

    const setPlaylistEditTitleFunction = index => e => {
        let newArr = [...playlistEditTitle]; // copying the old datas array
        newArr[index] = e.target.value; // replace e.target.value with whatever you want to change it to
        setPlaylistEditTitle(newArr); // ??
    }

    const setPlaylistEditDescriptionFunction = index => e => {
        let newArr = [...playlistEditDescription]; 
        newArr[index] = e.target.value; 
        setPlaylistEditDescription(newArr);
    }

    const createCourseHandler = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("Thumbnail", image);
        formData.append("name", courseName);
        formData.append("price", coursePrice);
        formData.append("description", courseDescription);

        dispatch(courseUpdate(courseId,formData));
    }

    function send (e) {
        e.preventDefault();
        dispatch(playlistUpdate(courseId, playlistTitle, playlistDescription, file));
    }

    function positionHandler(number, upDown) {
        dispatch(playlistArrange(number, upDown, courseId));
    }
    
    function deleteVideoHandler(number) {
        dispatch(playlistDelete(number, courseId));
    }

    function updateVideoHandler(number) {         
        dispatch(playlistVideoUpdate(
            number, 
            playlistEditTitle[number],
            playlistEditDescription[number], 
            courseId
        ));
    }

    function testing() {
        console.log(playlistEditTitle);
        console.log(playlistEditDescription);
    }

    return (
        <div>
            {courseDetail.loading ? (
                <h1>Loading...</h1>
            ) : courseDetail.error ? (
                <h1>{courseDetail.error}</h1>
            ) : (
            <div>
                <button onClick={testing}>yes</button>
                <form onSubmit={createCourseHandler}>
                    <div className="cartNav">
                        <div className="cartLeft">
                            <img src={courseDetail.course.image} alt="Paris"/>
                        </div>
                        
                        <div className="cartRight">
                            {courseUpdated.success ? <div>Course Updated! </div>
                            :<></>}
                            <button className="GlobalButton" type="submit">SAVE</button>
                        </div>
                    </div>

                    &nbsp;

                    <input 
                        className="CourseTitleInput" 
                        type="text"
                        placeholder={`Enter a Course Title, For Example ${courseDetail.course.name}`}
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />

                    &nbsp;

                    <div className="productOverview">
                        <img src="https://d2uolguxr56s4e.cloudfront.net/img/kartrapages/video_player_placeholder.gif"/>
                        
                        <div className="productOverviewDetails">
                            <label for="CourseDescription">
                                Course Description:
                            </label>
                            
                            <textarea 
                                name="text" 
                                className="CourseDescriptionInput" 
                                wrap="soft"
                                value={courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)}
                            >
                                Here goes your Course Description
                            </textarea>
                            
                        </div>
                    </div>   

                    <br/>

                    <label for="EnterPrice">Price:</label>
                    <input 
                        className="EnterPrice" 
                        type="text"
                        placeholder="Enter a Course Title"
                        value={coursePrice}
                        onChange={(e) => setCoursePrice(e.target.value)}
                    />

                    <label htmlFor="image">image</label>
                    <input type="file" accept=".jpg" onChange={e => setImage(e.target.files[0])}/>
                    
                    <br/>
                    <br/>

                </form>
                    
                    
                    
                    <h2>Add a video:</h2>

                        <div className="preview-playlist-widget">
                            <form className="preview-playlist-widget-form" onSubmit={send}>
                                <div className="preview-playlist-thumbnail">
                        
                                    <input 
                                        className="GlobalButton" 
                                        //required 
                                        //EMBEDDING LINKS COMING SOON
                                        type="file" 
                                        id="video" 
                                        accept=".mp4" 
                                        onChange={e => setFile(e.target.files[0])}
                                    />  
                                </div>
                                <div className="preview-playlist-details">
                                    <input 
                                        placeholder="ENTER VIDEO'S TITLE"
                                        //required 
                                        value={playlistTitle}
                                        onChange={(e) => setPlaylistTitle(e.target.value)}
                                    />       
                                    <input 
                                        className="preview-EnterVideoDescription" 
                                        //required
                                        placeholder="Enter video's description" 
                                        value={playlistDescription}
                                        onChange={(e) => setPlaylistDescription(e.target.value)}
                                    />        
                                </div>
                            </form>
                            <button className="GlobalButton preview-PlaylistAddButton" onClick={send}>
                                ADD
                            </button>
                        </div> 

                    <br/>

                    <div className="preview-playlist-container">

                        <h2>Playlist Preview:</h2>
                        <ul>
                            { playlistDetail.loading ? (
                                <div>Loading...</div>
                            ) : (
                                    playlist.videoplaylist ? (       
                                    playlist.videoplaylist.map((playlist, index) => {
                                        
                                        //playlistEditTitle[playlist.Number]=playlist.Title;
                                        //playlistEditDescription[playlist.Number]=playlist.Description;

                                        return (
                                            <li>
                                            <div className="preview-playlist-widget">
                                               {
                                                    //<input className="preview-playlist-number" placeholder={playlist.Number}/>
                                                }   
                                                <button onClick={()=>positionHandler(playlist.Number, 'up')}>UP</button>
                                                <button onClick={()=>positionHandler(playlist.Number, 'down')}>DOWN</button>

                                                <div className="preview-playlist-thumbnail">
                                                    <img src="https://storage.googleapis.com/fe-storage/2020/11/242aaa44-the-modeler-online-course.png" alt="Paris"/>
                                                </div>
                                                <div className="preview-playlist-details">

                                                    <input 
                                                        className="preview-playlist-details"
                                                        type="text"
                                                        placeholder={playlist.Title}
                                                        value={playlistEditTitle[playlist.Number]}
                                                        onChange={setPlaylistEditTitleFunction(playlist.Number)}
                                                    />

                                                    <input 
                                                        className="preview-EnterVideoDescription"
                                                        type="text"
                                                        placeholder={playlist.Description}
                                                        value={playlistEditDescription[playlist.Number]}
                                                        onChange={setPlaylistEditDescriptionFunction(playlist.Number)}
                                                    />

                                                </div>
                                                <button onClick={()=>deleteVideoHandler(playlist.Number)}>Delete</button>
                                                <button onClick={()=>updateVideoHandler(playlist.Number)}>Update</button>
                                            </div> 
                                        </li>
                                        )
                                    })
                                    
                                    ) : (
                                        <></>
                                    )
                                    
                                )
                            }
                        </ul>
                    </div>
                
                </div>
                
            )}
        </div>
    );
}