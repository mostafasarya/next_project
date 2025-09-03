'use client';

import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Free Shipping Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Free Shipping</h3>
          <p className="footer-description">
            Kirrin Finch is proud to offer free shipping in the US on all orders of $200 and above. 
            We also offer low rates to international destinations.
          </p>
          <div className="social-media-icons">
            <a href="#" className="social-icon facebook">
              <span>f</span>
            </a>
            <a href="#" className="social-icon instagram">
              <span>📷</span>
            </a>
            <a href="#" className="social-icon pinterest">
              <span>P</span>
            </a>
            <a href="#" className="social-icon twitter">
              <span>🐦</span>
            </a>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="footer-divider"></div>

        {/* About Section */}
        <div className="footer-section">
          <h3 className="footer-heading">About</h3>
          <ul className="footer-links">
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Press & Media</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Social Giveback</a></li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Resources</h3>
          <ul className="footer-links">
            <li><a href="#">Blog</a></li>
            <li><a href="#">Dapper Scouts</a></li>
            <li><a href="#">Garment Care</a></li>
            <li><a href="#">Fit & Size Guide</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Support</h3>
          <ul className="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Start A Return or Exchange</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
