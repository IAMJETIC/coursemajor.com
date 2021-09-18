import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsUser } from '../redux/actions/userActions';
import { paypalPayout } from '../redux/actions/paypalActions';

export default function CourseSold() {
    const dispatch = useDispatch();

    const userDetail = useSelector(state => state.userDetails);
    const paypalPayedout = useSelector(state => state.paypalPayout);

    const [mode, setMode] = useState('EMAIL');
    
    console.log(userDetail);

    useEffect(() => {
        dispatch(detailsUser());
    }, [dispatch]); 

    const withdrawHandler = async (e) => {
        e.preventDefault();
        dispatch(paypalPayout());
    }

    return (
        <div>
            <div className="CourseSoldContainer">
            
            {userDetail.loading ? (
                <h1>Loading...</h1>
            ) : userDetail.error ? (
                <h1>{userDetail.error}</h1>
            ) : userDetail.success ? (  
                <> 
                    <h5>Course Sold</h5>
                    <p>{`All time balance: $${userDetail.user.balance.allTimeBalance}`}</p>
                    <p>{`Available balance: $${userDetail.user.balance.currentBalance}`}</p>
                    
                    {userDetail.user.balance.currentBalance ==0 ? console.log("Error")
                        : <button className="GlobalButton" onClick={withdrawHandler}>WITHDRAW FUNDS</button>
                    }
                </>
            ) : (<></>)}

                    {paypalPayedout.loading ? (
                        <p>Loading...</p>
                        ) : paypalPayedout.error ? (
                            <h1>{paypalPayedout.error}</h1>
                        ) : paypalPayedout.success ? ( 
                        <div>Payment Made Successfully</div>
                        ) : (
                        <></>
                        )}
            
                    <hr />
                    <div className="GlobalScrollableTable">
                        <table>
                            <tr>
                                <th>PAYPAL ID</th>
                                <th>BUYER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                            </tr>
                            <tr>
                                <td><Link to="#"></Link></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </div>
        </div>

    );
}