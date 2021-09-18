import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import Dropzone from 'react-dropzone';
import { coursesDetails } from '../redux/actions/courseActions';
import { createOrder, OrderDetails } from '../redux/actions/orderActions';
import { useLocation } from 'react-router-dom';

export default function Course(props) {
    const dispatch = useDispatch();
    const { search } = useLocation()
    console.log(search)

    const [sdkReady, setSdkReady] = useState(false);
    
    const courseId = props.match.params.id;
    const courseDetail = useSelector(state => state.courseDetails);
    const { loading, error, course } = courseDetail;
    const { userInfo } = useSelector(state => state.userSignin);
    
    const orderCreated = useSelector(state => state.orderCreate);
    const orderDetails = useSelector(state => state.orderDetails);
    
    const redirectHandler = () => {
        props.history.push(`/login?redirect=/${course._id}`)
    }
    
    const purchaseHandler = () => {
        document.querySelector(".bg-modal").style.display = 'flex';
    }
    
    const purchaseSuccessHandler = () => {    
        
        const cart = {
            orderItems: [
                {
                    name: courseDetail.course.title,
                price: courseDetail.course.price,
                course: courseId
            }
        ],
        paymentMethod: "PayPal",
        itemsPrice: courseDetail.course.price,
            taxPrice: 0,
            totalPrice: courseDetail.course.price,
            //user: "60e8ed8fa21abc29a4dd8cc1",
            seller: courseDetail.course.seller,
            paidAt: "01/12/21",
            deliveredAt: "Date.now"
        }
        dispatch(createOrder(cart));    
    };
    
    //orderDetails.order ? props.history.push(`/course/${orderDetails.order.orderItems[0].course}`)
    //: console.log(error)
    
    orderCreated.success ? props.history.push(`/course/${orderCreated.order.orderItems[0].course}`)
    : console.log(error)


    
    useEffect(() => {
        dispatch(OrderDetails(courseId));
        
        const addPayPalScript = async () => {
            try{
                dispatch(coursesDetails(courseId));
                const { data } = await Axios.get('api/config/paypal');
                //console.log(`This is the data ${data}`);
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
                script.async = true;
                script.onload = () => {
                    setSdkReady(true);
                };
                document.body.appendChild(script);
            } catch {
                console.log("Error")
            }
        };
        if (!window.paypal) {
            try{
                addPayPalScript();
            } catch {
                console.log("PayPal Error");
            }
        } else {
            setSdkReady(true);
        }
    }, [dispatch, courseId, sdkReady]);  

    return (
        <div>
            
            {loading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h1>{error}</h1>
            ) : (   
                <div>
   
                        <div className="bg-modal">
                            <div className="modal-content">
                                <h2>Choose Your Payment Option</h2>
                                <PayPalButton
                                    amount={course.price}
                                    currency={"USD"}
                                    shippingPreference={"NO_SHIPPING"}
                                    //catchError={console.log("Transaction Declined or Error")}
                                    //onError={"Error"}
                                    onSuccess={purchaseSuccessHandler}
                                ></PayPalButton>
                                <div className="close">
                                    <button className="modal-button" onClick={()=>document.querySelector(".bg-modal").style.display = 'none'}>+</button>   
                                </div>
                            </div>
                        </div>
                    




                <div className="cartNav">

                    <div className="cartLeft">
                        <img src={`/api/courses/image/${course.imageKey}`} alt="Paris" />
                    </div>

                    <div className="cartRight">
                        <h3>${course.price}</h3>
                        { userInfo ? (
                            <button onClick={purchaseHandler}>BUY NOW</button>
                            //h<button onClick={purchaseSuccessHandler}>BUY NOW</button>
                            ) : (
                            <button onClick={redirectHandler}>BUY NOW</button>
                        )}
                    </div>
                </div>

                <h1>{course.title}</h1>

                <div className="productOverview">
                    <img src={`/api/courses/image/${course.imageKey}`} alt={course.title}/>
                    <div>
                        <p>{course.description}</p>
                        <br />
                        <div className="cartRight">
                            <h3>${course.price}</h3>
                            <p>Ratings:</p>
                            <button onClick={redirectHandler}>BUY NOW</button>
                        </div>
                    </div>
                </div>

                <hr />

                <h5>What you'll learn</h5>

                <div className="ProductAdditionalButton">
                    <div>
                        <button className="GlobalButton">Add to Wishlist <i className="bi bi-heart"></i></button>
                        <button className="GlobalButton">Share <i className="bi bi-share"></i></button>
                    </div>
                    <div>
                        <button className="GlobalButton">Gift this Course<i className="bi bi-gift"></i></button>
                        <button className="GlobalButton">Apply Coupon</button>
                    </div>
                </div >

                <h5>Reviews</h5>

                <div>
                    <img />
                    <h5>Reviewer's Name</h5>
                    <p>This course is a very good course</p>
                </div>

                <div>
                    <div>
                    </div>
                    <div>
                    </div>
                </div>


                <h5>OTHER COURSES YOU MAY BE INTERESTED IN</h5>

                <div className="upsellcourses">
                    <ul>
                        <li>
                            <div className="course-widget">
                                <div>
                                    <img src="https://storage.googleapis.com/fe-storage/2020/11/242aaa44-the-modeler-online-course.png" alt="Paris" />
                                </div>

                                <h4>THE ASSET MANAGER</h4>
                                <p className="course-widget-details">Learn asset management from the firm hired by the top 4 investment banks to teach their new analysts.</p>

                                <hr />

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
                                    <img src="https://storage.googleapis.com/fe-storage/2020/11/242aaa44-the-modeler-online-course.png" alt="Paris" />
                                </div>

                                <h4>THE ASSET MANAGER</h4>
                                <p className="course-widget-details">Learn asset management from the firm hired by the top 4 investment banks to teach their new analysts.</p>

                                <hr />

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
                                    <img src="https://storage.googleapis.com/fe-storage/2020/11/242aaa44-the-modeler-online-course.png" alt="Paris" />
                                </div>

                                <h4>THE ASSET MANAGER</h4>
                                <p className="course-widget-details">Learn asset management from the firm hired by the top 4 investment banks to teach their new analysts.</p>

                                <hr />

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
                                    <img src="https://storage.googleapis.com/fe-storage/2020/11/242aaa44-the-modeler-online-course.png" alt="Paris" />
                                </div>

                                <h4>THE ASSET MANAGER</h4>
                                <p className="course-widget-details">Learn asset management from the firm hired by the top 4 investment banks to teach their new analysts.</p>

                                <hr />

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
    );
}