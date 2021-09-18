import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <footer class="footer-container">
            <div>
                <ul>
                    <li><h6 class="footer-header">PAGE LINKS</h6></li>
                    <hr class="footer-hr" />
                    <li><Link to="#">Terms of service</Link></li>
                    <li><Link to="#">Privacy Policy</Link></li>
                    <li><p>Blog (Coming Soon)</p></li>
                    <li><p>Get our App (Coming Soon)</p></li>
                    <li><Link to="#">About us</Link></li>
                </ul>

                <ul>
                    <li><h6 class="footer-header">SOCIAL LINKS</h6></li>
                    <hr class="footer-hr" />
                    <li><Link to="#">Facebook</Link></li>
                    <li><Link to="#">Instagram</Link></li>
                    <li><Link to="#">Twitter</Link></li>
                    <li><Link to="#">Contact Us</Link></li>
                </ul>
            </div>
            <div><p>All Rights Reserved</p></div>
        </footer>
    );
}