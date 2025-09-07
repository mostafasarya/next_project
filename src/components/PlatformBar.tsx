'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import './PlatformBar.css';

interface PlatformBarProps {
  onBackClick?: () => void;
  backUrl?: string;
  title?: string;
  showBackButton?: boolean;
  showNotifications?: boolean;
  showProfile?: boolean;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

const PlatformBar: React.FC<PlatformBarProps> = ({
  onBackClick,
  backUrl = '/profile',
  title,
  showBackButton = true,
  showNotifications = true,
  showProfile = true,
  onNotificationClick,
  onProfileClick
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.push(backUrl);
    }
  };

  const handleNotificationClick = () => {
    if (onNotificationClick) {
      onNotificationClick();
    }
  };

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    }
  };

  return (
    <div className="app-bar">
      <div className="app-bar-content">
        {showBackButton && (
          <button className="back-btn" onClick={handleBackClick}>
            <span className="back-icon">←</span>
          </button>
        )}
        <div className="app-title">
          <div className="brand-container">
            <svg className="dragon-logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Cute Dragon Body Gradient */}
                  <linearGradient id="cuteDragonBody" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:"#ff6b6b"}} />
                    <stop offset="50%" style={{stopColor:"#ff8e8e"}} />
                    <stop offset="100%" style={{stopColor:"#ffa8a8"}} />
                  </linearGradient>
                  
                  {/* Cute Fire Gradient */}
                  <radialGradient id="cuteFireGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style={{stopColor:"#ffeb3b", stopOpacity:0.8}} />
                    <stop offset="50%" style={{stopColor:"#ff9800", stopOpacity:0.6}} />
                    <stop offset="100%" style={{stopColor:"#ff5722", stopOpacity:0.4}} />
                  </radialGradient>
                  
                  {/* Cute Scale Pattern */}
                  <pattern id="cuteScales" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                    <circle cx="3" cy="3" r="1.5" fill="#ff8e8e" opacity="0.4"/>
                  </pattern>
                </defs>
                
                {/* Cute Dragon Head - Round and Friendly */}
                <circle cx="50" cy="50" r="25" fill="url(#cuteDragonBody)" stroke="#ff6b6b" strokeWidth="2"/>
                
                {/* Cute Dragon Snout */}
                <ellipse cx="50" cy="60" rx="8" ry="6" fill="url(#cuteDragonBody)" stroke="#ff6b6b" strokeWidth="1"/>
                
                {/* Cute Dragon Eyes - Big and Round */}
                <circle cx="42" cy="45" r="6" fill="#ffffff"/>
                <circle cx="58" cy="45" r="6" fill="#ffffff"/>
                <circle cx="42" cy="45" r="4" fill="#4fc3f7"/>
                <circle cx="58" cy="45" r="4" fill="#4fc3f7"/>
                <circle cx="42" cy="45" r="2" fill="#000000"/>
                <circle cx="58" cy="45" r="2" fill="#000000"/>
                
                {/* Cute Eye Highlights */}
                <circle cx="43" cy="44" r="1" fill="#ffffff"/>
                <circle cx="59" cy="44" r="1" fill="#ffffff"/>
                
                {/* Cute Nostrils */}
                <circle cx="47" cy="58" r="1.5" fill="#ff6b6b"/>
                <circle cx="53" cy="58" r="1.5" fill="#ff6b6b"/>
                
                {/* Cute Smile */}
                <path d="M45 65 Q50 70 55 65" stroke="#ff6b6b" strokeWidth="2" fill="none"/>
                
                {/* Cute Little Horns */}
                <path d="M35 30 Q30 20 35 25" stroke="#ff6b6b" strokeWidth="3" fill="none"/>
                <path d="M65 30 Q70 20 65 25" stroke="#ff6b6b" strokeWidth="3" fill="none"/>
                <path d="M35 30 Q30 20 35 25" stroke="#ff8e8e" strokeWidth="1.5" fill="none"/>
                <path d="M65 30 Q70 20 65 25" stroke="#ff8e8e" strokeWidth="1.5" fill="none"/>
                
                {/* Cute Little Wings */}
                <ellipse cx="25" cy="55" rx="8" ry="12" fill="url(#cuteDragonBody)" stroke="#ff6b6b" strokeWidth="1" opacity="0.8"/>
                <ellipse cx="75" cy="55" rx="8" ry="12" fill="url(#cuteDragonBody)" stroke="#ff6b6b" strokeWidth="1" opacity="0.8"/>
                
                {/* Cute Scale Details */}
                <circle cx="40" cy="35" r="1" fill="#ff8e8e"/>
                <circle cx="60" cy="35" r="1" fill="#ff8e8e"/>
                <circle cx="35" cy="50" r="1" fill="#ff8e8e"/>
                <circle cx="65" cy="50" r="1" fill="#ff8e8e"/>
                
                {/* Cute Little Fire Breath */}
                <path d="M47 70 Q45 80 43 75" fill="url(#cuteFireGradient)" opacity="0.7"/>
                <path d="M53 70 Q55 80 57 75" fill="url(#cuteFireGradient)" opacity="0.7"/>
                <path d="M50 70 Q48 85 46 80" fill="url(#cuteFireGradient)" opacity="0.5"/>
                <path d="M50 70 Q52 85 54 80" fill="url(#cuteFireGradient)" opacity="0.5"/>
                
                {/* Cute Fire Sparkles */}
                <circle cx="45" cy="75" r="1" fill="#ffeb3b"/>
                <circle cx="55" cy="75" r="1" fill="#ffeb3b"/>
                <circle cx="48" cy="80" r="0.8" fill="#ffeb3b"/>
                <circle cx="52" cy="80" r="0.8" fill="#ffeb3b"/>
              </svg>
              <h1 className="brand-text">Dragonists</h1>
            </div>
        </div>
        <div className="app-bar-actions">
          {showNotifications && (
            <button className="notification-btn" onClick={handleNotificationClick}>
              🔔
            </button>
          )}
          {showProfile && (
            <button className="profile-menu-btn" onClick={handleProfileClick}>
              👤
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlatformBar;
