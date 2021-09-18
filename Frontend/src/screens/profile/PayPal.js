import React from 'react';
import { Link } from 'react-router-dom';

export default function PayPal() {
    return (
        <div className="profile-sidenav">
            <section className="profile-section">
                <a href="#">User Profile</a>
                <a href="#">Social Links</a>
                <a href="#">PayPal</a>
                <a href="#">Notification</a>
                <a href="#">Close Account</a>
            </section>

            <section className="profile-section1">
                <div className="signup-container edit-profile-container">
                    <h5>PayPal</h5>
                    <div className="inputWithIcon">
                        <input type="text" id="paypal_client_id" placeholder="PAYPAL CLIENT ID" required/>
                        <i className="bi bi-lock"></i>
                    </div>

                    <div className="inputWithIcon">
                        <input type="text" id="paypal_email" placeholder="PAYPAL EMAIL"/>
                        <i className="bi bi-lock"></i>
                    </div>

                    <br/>       
                    <button>UPDATE</button>
                </div>
            </section>

        </div>
    );
}