import React from 'react';
import { Link } from 'react-router-dom';

export default function SocialProfile() {
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
                    <h5>Add your Social Links</h5>
                    
                    <div className="inputWithIcon">
                        <input type="password" id="password" placeholder="Website (http(s)://..)"/>
                        <i className="bi bi-lock"></i>
                    </div>
                    <div className="inputWithIcon">
                        <input type="password" id="password" placeholder="Twitter
                http://twitter.com/johnsmith"/>
                        <i className="bi bi-lock"></i>
                    </div>
                    <div className="inputWithIcon">
                        <input type="password" id="password" placeholder="Facebook: http://www.facebook.com/johnsmith"/>
                        <i className="bi bi-lock"></i>
                    </div>
                    <div className="inputWithIcon">
                        <input type="password" id="password" placeholder="LinkedIn: 
                http://www.linkedin.com/in/johnsmith"/>
                        <i className="bi bi-lock"></i>
                    </div>
                    <div className="inputWithIcon">
                        <input type="password" id="password" placeholder="Youtube: 
                http://www.youtube.com/johnsmith"/>
                        <i className="bi bi-lock"></i>
                    </div>

                    <br/>
                    
                        <button>UPDATE</button>
                </div>


            </section>
        </div>
    );
}