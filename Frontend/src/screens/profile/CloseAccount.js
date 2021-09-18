import React from 'react';
import { Link } from 'react-router-dom';

export default function CloseAccount() {
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
                    <h5>Close Account</h5>
                    <hr/>
                    <p>
                    Warning: If you close your account, you will be unsubscribed from all your courses, and will lose access forever.
                    </p>
                    <button>Close your account permanently.</button>
                </div>
            </section>
        </div>
    );
}