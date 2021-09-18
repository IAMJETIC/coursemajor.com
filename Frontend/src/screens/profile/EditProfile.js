import React from 'react';

export default function EditProfile() {
    return (
        <div>
            <div className="signup-container edit-profile-container">

                <svg xmlns="http://www.w3.org/2000/svg" width="8em" height="8em" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                </svg>

                <h5>Edit your User Profile</h5>

                <hr />

                <div className="signupfirstandlname">

                    <div className="inputWithIcon">
                        <input type="text" id="first-name" placeholder="FIRST NAME" />
                        <i className="bi bi-person"></i>
                    </div>
                    <div className="inputWithIcon">
                        <input type="text" id="last-name" placeholder="LAST NAME" />
                        <i className="bi bi-person"></i>
                    </div>

                </div>

                <div className="inputWithIcon">
                    <input type="text" id="email-address" placeholder="EMAIL ADDRESS" />
                    <i className="bi bi-envelope"></i>
                </div>

                <div className="inputWithIcon">
                    <input type="password" id="password" placeholder="CURRENT PASSWORD" />
                    <i className="bi bi-lock"></i>
                </div>
                <div className="inputWithIcon">
                    <input type="password" id="password" placeholder="PASSWORD" />
                    <i className="bi bi-lock"></i>
                </div>
                <div className="inputWithIcon">
                    <input type="password" id="password" placeholder="CONFIRM PASSWORD" />
                    <i className="bi bi-lock"></i>
                </div>

                <br />

                <button>UPDATE</button>
            </div>

            <div className="signup-container edit-profile-container">
                <hr />
                <h5>Add your Social Links</h5>

                <div className="inputWithIcon">
                    <input type="password" id="password" placeholder="Website (http(s)://..)" />
                    <i className="bi bi-lock"></i>
                </div>
                <div className="inputWithIcon">
                    <input type="password" id="password" placeholder="Twitter
            http://twitter.com/johnsmith"/>
                    <i className="bi bi-lock"></i>
                </div>
                <div className="inputWithIcon">
                    <input type="password" id="password" placeholder="Facebook: http://www.facebook.com/johnsmith" />
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

                <br />

                <button>UPDATE</button>
            </div>

            <div className="signup-container edit-profile-container">
                <hr />
                <h5>Notifications</h5>
                <p>Turn promotional email notifications from Udemy on or off</p>
                <p>I want to receive:</p>
                <div className="settingscheckbox">
                    <input type="checkbox" />
                    All Notifications from CourseMajor
                </div>
                <hr />
            </div>

            <div className="signup-container edit-profile-container">
                <h5>Close Account</h5>
                <hr />
                <p>
                    Warning: If you close your account, you will be unsubscribed from all your courses, and will lose access forever.
                </p>
                <button>Close your account permanently.</button>
            </div>
        </div>
    );
}