import React from 'react';
import { Link } from 'react-router-dom';

export default function Course() {
    return (
        <div class="signup-container">

            <h5>Login and Start Learning!</h5>
            <hr />

            <div class="inputWithIcon">
                <input type="text" id="email-address" placeholder="EMAIL ADDRESS" />
                <i class="bi bi-envelope"></i>
            </div>

            <div class="inputWithIcon">
                <input type="password" id="password" placeholder="PASSWORD" />
                <i class="bi bi-lock"></i>
            </div>

            <br />

            <button>LOGIN</button>

            <div class="end-text">
                <p class="fine-print">
                    <Link to="#">Forgot Password?</Link>
                </p>

                <hr />

                <p>
                    Don't have an account? <Link to="#">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}