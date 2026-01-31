import React from 'react';
import '../styles/components/Footer.css';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer__container">
                <div className="footer__col">
                    <div className="footer__logo">MERGEN</div>
                    <p className="footer__desc">
                        Unlock the wisdom in data with AI-powered surveys.
                    </p>
                </div>

                <div className="footer__col">
                    <h4>Platform</h4>
                    <a href="#">For Clients</a>
                    <a href="#">For Community</a>
                    <a href="#">Pricing</a>
                </div>

                <div className="footer__col">
                    <h4>Company</h4>
                    <a href="#">About Us</a>
                    <a href="#">Careers</a>
                    <a href="#">Contact</a>
                </div>

                <div className="footer__col">
                    <h4>Connect</h4>
                    <div className="social-links">
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaLinkedin /></a>
                        <a href="#"><FaInstagram /></a>
                    </div>
                </div>
            </div>
            <div className="footer__bottom">
                &copy; {new Date().getFullYear()} Mergen Inc. All rights reserved.
            </div>
        </footer>
    );
};
