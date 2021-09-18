import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';

export default function Course(props) {
    const { _id, imageKey, title, description, price, star } = props;
    console.log(imageKey);
    const [readMore, setReadMore] = useState(false);
    return (
        
            <div className="course-widget">
                <div>
                    <img src={`/api/courses/image/${imageKey}`} alt="Paris" />
                </div>
                <h4>{title}</h4>
                <p className="course-widget-details">{readMore ? description : `${description.substring(0, 137)}... `}
                    <button onClick={() => setReadMore(!readMore)}>
                        {readMore ? 'show less' : 'read more'}
                    </button>
                    <Link to={`/coursepreview/${_id}`}>Yuh</Link>
                </p>

                <hr />

                <div className="course-widget-end">
                    {price==0 || price==null ? (
                    <h3>FREE</h3>
                    ) : (
                    <h3>${price}</h3>
                    )}
                    <div>
                        <p className="course-widget-details">{star} STARS</p>
                        <p>
                            <Rating rating={star}></Rating>
                        </p>
                    </div>
                </div>
            </div>
    );
}