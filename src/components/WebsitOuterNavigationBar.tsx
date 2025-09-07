'use client';

import React, { useState, useEffect } from 'react';
import { HiGlobeAlt } from 'react-icons/hi';
import './WebsitOuterNavigationBar.css';

const WebsitOuterNavigationBar: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
  ];

  // Load saved language on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('websiteLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
    
    // Save to localStorage for persistence
    localStorage.setItem('websiteLanguage', language);
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language } 
    }));
  };

  const currentLanguage = languages.find(lang => lang.name === selectedLanguage) || languages[0];

  return (
    <div className="website-outer-navigation-bar">
      <div className="nav-container">
        {/* Logo/Brand */}
        <div className="nav-brand">
          <h2 className="brand-title">Online Store</h2>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* Language Selector and Action Buttons */}
        <div className="nav-actions">
          {/* Language Selector */}
          <div className="language-selector">
            <button 
              className="language-btn"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <HiGlobeAlt className="language-icon" />
              <span className="language-text">{currentLanguage.flag} {currentLanguage.name}</span>
            </button>
            
            {showLanguageDropdown && (
              <div className="language-dropdown">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    className={`language-option ${selectedLanguage === language.name ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(language.name)}
                  >
                    <span className="language-flag">{language.flag}</span>
                    <span className="language-name">{language.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="nav-btn secondary">Sign In</button>
          <button className="nav-btn primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default WebsitOuterNavigationBar;
