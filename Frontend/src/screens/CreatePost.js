import React from 'react';
import { useState, useEffect } from "react";
import { blogCreate } from '../redux/actions/blogActions';
import { useSelector, useDispatch } from 'react-redux';

export default function CreatePost(props) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    
    const dispatch = useDispatch();

    const createBlogHandler = async (e) => {
        e.preventDefault();
        dispatch(blogCreate(title, description));
    }

    const blogDetail = useSelector(state => state.blogDetails);
    const { loading, error, blog } = blogDetail;

    if (blog._id) {
        props.history.push(blog._id)
    }

//}
    return (
        <div>
            <button onClick={createBlogHandler}>Post Blog</button>
            
            <br/>

            <input 
                className="CourseTitleInput" 
                type="text"
                placeholder={`Enter a Course Title, For Example ${blog.title}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            &nbsp;

            <input 
                className="CourseTitleInput" 
                type="text"
                placeholder={`Enter a Post Title, For Example ${blog.author}`}
                value={title}
                onChange={(e) => setAuthor(e.target.value)}
            />

            &nbsp;
        
            <div className="productOverviewDetails">
                <label for="CourseDescription">
                    Course Description:
                </label>
                            
                <textarea 
                    name="text" 
                    className="CourseDescriptionInput" 
                    wrap="soft"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                >
                    Here goes your Course Description
                </textarea>         
            </div>
        </div>   
    );
}