import React from 'react';
import './footer.css';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="social">
                <Link href="/#">
                    <i className="fa fa-facebook-square"> Facebook </i>
                </Link>
                <Link href="/#">
                    <i className="fa fa-youtube-play"> Youtube </i>
                </Link>
            </div>

            <div className="footer-links">
                <ul>
                    <li className="footer-link">
                        <Link>Support</Link>
                    </li>
                    <li className="footer-link">
                        <Link>Server Rules</Link>
                    </li>
                    <li className="footer-link">
                        <Link>Privacy Policy</Link>
                    </li>
                </ul>
            </div>

            <div className="credits">
                <p>Site Developed by Echo</p>
            </div>

        </footer>
    );
};

export default Footer;
