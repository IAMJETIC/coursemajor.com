import React from 'react';
import { Link } from 'react-router-dom';

export default function UserProfile() {
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="8em" height="8em" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                    </svg>

                    <h5>Edit your User Profile</h5>
                    
                    <hr/>
                    
                    <div className="signupfirstandlname">
                        <div className="inputWithIcon">
                            <input type="text" id="first-name" placeholder="FIRST NAME"/>
                            <i className="bi bi-person"></i>
                        </div>
                        <div className="inputWithIcon">
                            <input type="text" id="last-name" placeholder="LAST NAME"/>
                            <i className="bi bi-person"></i>
                        </div>   
                    </div>
                    
                    <div className="inputWithIcon">
                        <input type="text" id="email-address" placeholder="EMAIL ADDRESS"/>
                        <i className="bi bi-envelope"></i>
                    </div>

                    <div className="inputWithIcon">
                        <input type="password" id="password" placeholder="CURRENT PASSWORD"/>
                        <i className="bi bi-lock"></i>
                    </div>
                    <div className="inputWithIcon">
                        <input type="password" id="password" placeholder="PASSWORD"/>
                        <i className="bi bi-lock"></i>
                    </div>
                    <div className="inputWithIcon">
                        <input type="password" id="password" placeholder="CONFIRM PASSWORD"/>
                        <i className="bi bi-lock"></i>
                    </div>
                    
                    <br/>
                    
                    <button>UPDATE</button>
                </div>

            </section>
        </div>
    );
}