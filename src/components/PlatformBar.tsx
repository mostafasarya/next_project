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
          {title ? (
            <h1>{title}</h1>
          ) : (
            <img src="/logo.png" alt="Logo" className="app-logo" />
          )}
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
