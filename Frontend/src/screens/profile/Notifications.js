import React from 'react';
import { Link } from 'react-router-dom';

export default function Notifications() {
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
                    <hr/>
                    <h5>Notifications</h5>
                    <p>Turn promotional email notifications from Udemy on or off</p>
                    <p>I want to receive:</p>
                    <div className="settingscheckbox">
                            <input type="checkbox"/>
                            All Notifications from CourseMajor
                    </div>
                    <hr/>
                </div>
            </section>

        </div>
    );
}