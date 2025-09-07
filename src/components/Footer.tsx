'use client';

import React from 'react';
import './Footer.css';

interface FooterProps {
  currentLanguage: string;
  translations: any;
  t: (key: string) => string;
}

const Footer: React.FC<FooterProps> = ({ currentLanguage, translations, t }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Free Shipping Section */}
        <div className="footer-section">
          <h3 className="footer-heading">{t('free_shipping')}</h3>
          <p className="footer-description">
            {t('free_shipping_description')}
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
          <h3 className="footer-heading">{t('about')}</h3>
          <ul className="footer-links">
            <li><a href="#">{t('our_story')}</a></li>
            <li><a href="#">{t('press_media')}</a></li>
            <li><a href="#">{t('careers')}</a></li>
            <li><a href="#">{t('sustainability')}</a></li>
            <li><a href="#">{t('social_giveback')}</a></li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="footer-section">
          <h3 className="footer-heading">{t('resources')}</h3>
          <ul className="footer-links">
            <li><a href="#">{t('blog')}</a></li>
            <li><a href="#">{t('dapper_scouts')}</a></li>
            <li><a href="#">{t('garment_care')}</a></li>
            <li><a href="#">{t('fit_size_guide')}</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-section">
          <h3 className="footer-heading">{t('support')}</h3>
          <ul className="footer-links">
            <li><a href="#">{t('help_center')}</a></li>
            <li><a href="#">{t('contact_us')}</a></li>
            <li><a href="#">{t('shipping_returns')}</a></li>
            <li><a href="#">{t('start_return_exchange')}</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
