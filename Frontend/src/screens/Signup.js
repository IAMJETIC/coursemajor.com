import React from 'react';
import { Link } from 'react-router-dom';

export default function Course() {
    return (
        <div class="signup-container">

            <h5>Sign Up and Start Learning!</h5>
            <hr />

            <div class="signupfirstandlname">

                <div class="inputWithIcon">
                    <input type="text" id="first-name" placeholder="FIRST NAME" />
                    <i class="bi bi-person"></i>
                </div>
                <div class="inputWithIcon">
                    <input type="text" id="last-name" placeholder="LAST NAME" />
                    <i class="bi bi-person"></i>
                </div>

            </div>

            <div class="inputWithIcon">
                <input type="text" id="email-address" placeholder="EMAIL ADDRESS" />
                <i class="bi bi-envelope"></i>
            </div>

            <div class="inputWithIcon">
                <input type="password" id="password" placeholder="PASSWORD" />
                <i class="bi bi-lock"></i>
            </div>

            <br />

            <button>SIGN UP</button>

            <div class="end-text">
                <p class="fine-print">
                    By signing up, you agree to our <Link to="#">Terms of Use</Link> and <Link to="#">Privacy Policy</Link>
                </p>

                <hr />

                <p>
                    Already have an account? <Link to="#">Log In</Link>
                </p>
            </div>
        </div>
    );
}