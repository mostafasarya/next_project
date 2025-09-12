'use client';

import React, { useState } from 'react';
import './CompContactFormDesign.css';

interface CompContactFormDesignProps {
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  textColor?: string;
}

const CompContactFormDesign: React.FC<CompContactFormDesignProps> = ({
  title = "Get In Touch",
  subtitle = "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  backgroundColor = "#ffffff",
  textColor = "#333333"
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div 
      className="contact-form-design-comp"
      style={{ 
        backgroundColor,
        color: textColor,
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        margin: '20px 0',
        overflow: 'hidden'
      }}
    >
      <div className="contact-form-header">
        <h2 className="contact-form-title" style={{ color: textColor }}>
          {title}
        </h2>
        <p className="contact-form-subtitle" style={{ color: `${textColor}CC` }}>
          {subtitle}
        </p>
      </div>

      <div className="contact-form-container">
        {isSubmitted ? (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h3>Thank you for your message!</h3>
            <p>We'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What is this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        )}
      </div>

      <div className="contact-form-footer">
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <span>support@yourstore.com</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <span>123 Business St, City, State 12345</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompContactFormDesign;
