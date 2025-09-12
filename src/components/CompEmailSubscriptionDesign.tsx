'use client';

import React, { useState } from 'react';
import './CompEmailSubscriptionDesign.css';

interface CompEmailSubscriptionDesignProps {
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  placeholderText?: string;
}

const CompEmailSubscriptionDesign: React.FC<CompEmailSubscriptionDesignProps> = ({
  title = "Subscribe to our emails",
  subtitle = "Be the first to know about new collections, exclusive offers, and special promotions.",
  backgroundColor = "#ffffff",
  textColor = "#333333",
  buttonColor = "#3b82f6",
  placeholderText = "Enter your email address"
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      setIsSubscribed(true);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }, 1000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <div 
      className="comp-email-subscription-design"
      style={{ 
        backgroundColor,
        color: textColor,
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        margin: '20px 0',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Header Section */}
      <div className="email-subscription-header">
        <h2 className="email-subscription-title" style={{ color: textColor }}>
          {title}
        </h2>
        <p className="email-subscription-subtitle" style={{ color: `${textColor}CC` }}>
          {subtitle}
        </p>
      </div>

      {/* Subscription Form */}
      <div className="email-subscription-container">
        {isSubscribed ? (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h3>Thank you for subscribing!</h3>
            <p>You're all set! Check your inbox for a welcome email.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="email-subscription-form">
            <div className="form-input-container">
              <div className="email-input-group">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder={placeholderText}
                  className={`email-input ${error ? 'error' : ''}`}
                  disabled={isSubscribing}
                />
                <button 
                  type="submit" 
                  className="subscribe-button"
                  style={{ backgroundColor: buttonColor }}
                  disabled={isSubscribing || !email.trim()}
                  onMouseEnter={(e) => {
                    if (!isSubscribing && email.trim()) {
                      e.currentTarget.style.opacity = '0.9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  {isSubscribing ? (
                    <>
                      <span className="spinner"></span>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <span>→</span>
                      Subscribe
                    </>
                  )}
                </button>
              </div>
              
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
            </div>

            {/* Privacy Notice */}
            <div className="privacy-notice">
              <p>
                🔒 We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};

export default CompEmailSubscriptionDesign;
