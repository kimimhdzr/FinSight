import React from 'react';
import { Instagram, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Column */}
          <div className="footer-brand">
            <h2 className="brand-title">FinSight</h2>
          </div>

          {/* Site Links */}
          <div className="footer-column">
            <h3 className="column-title">Site</h3>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Project</a></li>
              <li><a href="#">Blogs</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-column">
            <h3 className="column-title">Company</h3>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Team</a></li>
              <li><a href="#">Style guide</a></li>
            </ul>
          </div>

          {/* Projects and Legal Combined */}
          <div className="footer-double-column">
            <div className="footer-sub-column">
              <h3 className="column-title">Potential Career</h3>
              <ul className="footer-links">
                <li><a href="#">Kuala Lumpur</a></li>
                <li><a href="#">Kedah</a></li>
                <li><a href="#">Selangor</a></li>
                <li><a href="#">Completed Projectes</a></li>
              </ul>
            </div>
            
            <div className="footer-sub-column">
              <h3 className="column-title">Legal</h3>
              <ul className="footer-links">
                <li><a href="#">Privacy policy</a></li>
                <li><a href="#">Terms of services</a></li>
              </ul>
              
              <h3 className="column-title social-title">Socials</h3>
              <div className="social-icons">
                <a href="#"><Instagram size={20} /></a>
                <a href="#"><Twitter size={20} /></a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="copyright">
          FinSight Inc 2025 - All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;